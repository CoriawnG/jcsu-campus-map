(function () {
  const FEET_PER_METER = 3.28084;
  const WALKING_FEET_PER_MINUTE = 264;
  const NODE_PRECISION = 6;

  function toRadians(value) {
    return (value * Math.PI) / 180;
  }

  function distanceMeters(a, b) {
    const earthRadiusMeters = 6371000;
    const lat1 = toRadians(a.lat);
    const lat2 = toRadians(b.lat);
    const deltaLat = toRadians(b.lat - a.lat);
    const deltaLng = toRadians(b.lng - a.lng);

    const h =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;

    return 2 * earthRadiusMeters * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function getNodeId(point) {
    return `${point.lat.toFixed(NODE_PRECISION)},${point.lng.toFixed(NODE_PRECISION)}`;
  }

  function createGraph(pathSegments) {
    const nodes = new Map();
    const adjacency = new Map();

    function addNode(point) {
      const id = getNodeId(point);

      if (!nodes.has(id)) {
        nodes.set(id, { id, lat: point.lat, lng: point.lng });
        adjacency.set(id, []);
      }

      return id;
    }

    function addEdge(fromId, toId, segmentName) {
      const from = nodes.get(fromId);
      const to = nodes.get(toId);
      const distance = distanceMeters(from, to);

      adjacency.get(fromId).push({ to: toId, distance, segmentName });
      adjacency.get(toId).push({ to: fromId, distance, segmentName });
    }

    pathSegments.forEach((segment) => {
      const coordinates = segment.coordinates || [];

      for (let index = 0; index < coordinates.length - 1; index += 1) {
        const fromId = addNode(coordinates[index]);
        const toId = addNode(coordinates[index + 1]);
        addEdge(fromId, toId, segment.name || "Sidewalk");
      }
    });

    return { nodes, adjacency };
  }

  function findNearestNode(graph, point) {
    let nearest = null;
    let nearestDistance = Infinity;

    graph.nodes.forEach((node) => {
      const distance = distanceMeters(point, node);

      if (distance < nearestDistance) {
        nearest = node;
        nearestDistance = distance;
      }
    });

    return { node: nearest, distance: nearestDistance };
  }

  function getRoutePreference(preference) {
    const preferences = {
      fastest: {
        label: "Fastest route",
        note: "Shortest available campus path",
        multipliers: {}
      },
      accessible: {
        label: "Accessible route",
        note: "Avoids stairs and rougher paths when possible",
        multipliers: {
          stairs: 12,
          crossing: 2.5,
          parking: 1.8
        }
      },
      "avoid-roads": {
        label: "Avoid roads",
        note: "Penalizes street crossings when possible",
        multipliers: {
          crossing: 8,
          parking: 1.5
        }
      },
      "main-sidewalks": {
        label: "Main sidewalks",
        note: "Prefers named sidewalks and campus walkways",
        multipliers: {
          shortcut: 1.6,
          parking: 2,
          crossing: 2
        }
      }
    };

    return preferences[preference] || preferences.fastest;
  }

  function classifySegment(segmentName) {
    const name = String(segmentName || "").toLowerCase();

    return {
      stairs: name.includes("stairs") || name.includes("steps"),
      crossing: name.includes("cross") || name.includes("street") || name.includes("road"),
      parking: name.includes("parking"),
      mainSidewalk: name.includes("main sidewalk") || name.includes("main walkway") || name.includes("walkway"),
      shortcut: name.includes("shortcut") || name.includes("through") || name.includes("cut")
    };
  }

  function getEdgeWeight(edge, preference) {
    const segment = classifySegment(edge.segmentName);
    let multiplier = 1;

    Object.entries(preference.multipliers).forEach(([type, value]) => {
      if (segment[type]) {
        multiplier = Math.max(multiplier, value);
      }
    });

    if (preference.label === "Main sidewalks" && segment.mainSidewalk) {
      multiplier *= 0.88;
    }

    return edge.distance * multiplier;
  }

  function dijkstra(graph, startId, endId, preference) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set(graph.nodes.keys());

    graph.nodes.forEach((_, id) => {
      distances.set(id, Infinity);
    });

    distances.set(startId, 0);

    while (unvisited.size > 0) {
      let currentId = null;
      let currentDistance = Infinity;

      unvisited.forEach((id) => {
        const distance = distances.get(id);

        if (distance < currentDistance) {
          currentDistance = distance;
          currentId = id;
        }
      });

      if (!currentId || currentDistance === Infinity) {
        break;
      }

      if (currentId === endId) {
        break;
      }

      unvisited.delete(currentId);

      graph.adjacency.get(currentId).forEach((edge) => {
        if (!unvisited.has(edge.to)) {
          return;
        }

        const nextDistance = currentDistance + getEdgeWeight(edge, preference);

        if (nextDistance < distances.get(edge.to)) {
          distances.set(edge.to, nextDistance);
          previous.set(edge.to, {
            from: currentId,
            segmentName: edge.segmentName,
            distance: edge.distance
          });
        }
      });
    }

    if (!previous.has(endId) && startId !== endId) {
      return null;
    }

    const nodeIds = [];
    const edgeSteps = [];
    let cursor = endId;

    nodeIds.unshift(cursor);

    while (cursor !== startId) {
      const step = previous.get(cursor);

      if (!step) {
        return null;
      }

      edgeSteps.unshift({
        from: step.from,
        to: cursor,
        segmentName: step.segmentName,
        distance: step.distance
      });

      cursor = step.from;
      nodeIds.unshift(cursor);
    }

    return {
      nodeIds,
      edgeSteps,
      distance: distances.get(endId)
    };
  }

  function summarizeSteps(edgeSteps) {
    const steps = [];

    edgeSteps.forEach((edge) => {
      const lastStep = steps[steps.length - 1];

      if (lastStep && lastStep.name === edge.segmentName) {
        lastStep.distance += edge.distance;
      } else {
        steps.push({
          name: edge.segmentName,
          distance: edge.distance
        });
      }
    });

    return steps;
  }

  function formatDistance(meters) {
    const feet = meters * FEET_PER_METER;

    if (feet < 1000) {
      return `${Math.round(feet)} ft`;
    }

    return `${(feet / 5280).toFixed(2)} mi`;
  }

  function estimateMinutes(meters) {
    const feet = meters * FEET_PER_METER;
    return Math.max(1, Math.round(feet / WALKING_FEET_PER_MINUTE));
  }

  function getRouteCandidates(location) {
    const accessPoints = Array.isArray(location?.routeAccessPoints) && location.routeAccessPoints.length
      ? location.routeAccessPoints
      : [location];

    return accessPoints.map((point) => ({
      ...point,
      originalName: location.name,
      displayName: point.name || location.name
    }));
  }

  function buildNavigation(pathSegments) {
    const graph = createGraph(pathSegments || []);

    function findSingleRoute(start, end, preference) {
      if (!start?.lat || !start?.lng || !end?.lat || !end?.lng) {
        return { ok: false, message: "Start or destination is missing coordinates." };
      }

      if (graph.nodes.size === 0) {
        return { ok: false, message: "No sidewalk path data is loaded." };
      }

      const startNearest = findNearestNode(graph, start);
      const endNearest = findNearestNode(graph, end);

      if (!startNearest.node || !endNearest.node) {
        return { ok: false, message: "Could not connect the start or destination to the sidewalk network." };
      }

      const route = dijkstra(graph, startNearest.node.id, endNearest.node.id, preference);

      if (!route) {
        return null;
      }

      const connectorDistance = startNearest.distance + endNearest.distance;
      const totalDistance = route.distance + connectorDistance;
      const path = route.nodeIds.map((id) => graph.nodes.get(id));

      return {
        ok: true,
        startNearest,
        endNearest,
        startAccessPoint: start,
        endAccessPoint: end,
        path,
        steps: summarizeSteps(route.edgeSteps),
        distanceMeters: totalDistance,
        pathDistanceMeters: route.distance,
        connectorDistanceMeters: connectorDistance,
        distanceText: formatDistance(totalDistance),
        minutes: estimateMinutes(totalDistance),
        graphNodeCount: graph.nodes.size,
        graphEdgeCount: route.edgeSteps.length,
        preferenceLabel: preference.label,
        preferenceNote: preference.note
      };
    }

    function findRoute(start, end, options = {}) {
      if (!start?.lat || !start?.lng || !end?.lat || !end?.lng) {
        return { ok: false, message: "Start or destination is missing coordinates." };
      }

      if (graph.nodes.size === 0) {
        return { ok: false, message: "No sidewalk path data is loaded." };
      }

      const preference = getRoutePreference(options.preference);
      const startCandidates = getRouteCandidates(start);
      const endCandidates = getRouteCandidates(end);
      let bestRoute = null;

      startCandidates.forEach((startCandidate) => {
        endCandidates.forEach((endCandidate) => {
          const candidateRoute = findSingleRoute(startCandidate, endCandidate, preference);

          if (candidateRoute && (!bestRoute || candidateRoute.distanceMeters < bestRoute.distanceMeters)) {
            bestRoute = candidateRoute;
          }
        });
      });

      if (!bestRoute) {
        return {
          ok: false,
          message: "No connected sidewalk route was found between those two locations."
        };
      }

      return bestRoute;
    }

    return {
      findRoute,
      graphNodeCount: graph.nodes.size
    };
  }

  window.CampusNavigation = buildNavigation(window.pathSegments || []);
})();
