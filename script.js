const mapId = "1DIEHzvOP7u9UehtaCniXFbs5FMT0C3w";
const defaultMapUrl = `https://www.google.com/maps/d/embed?mid=${mapId}`;
const searchInput = document.querySelector("#locationSearch");
const resultsContainer = document.querySelector("#locationResults");
const personalLocationsContainer = document.querySelector("#personalLocations");
const favoriteLocationsContainer = document.querySelector("#favoriteLocations");
const recentLocationsContainer = document.querySelector("#recentLocations");
const resultCount = document.querySelector("#resultCount");
const selectedLocation = document.querySelector("#selectedLocation");
const filterButtons = document.querySelectorAll(".filter-button");
const fromLocationSelect = document.querySelector("#fromLocation");
const toLocationSelect = document.querySelector("#toLocation");
const routePreferenceSelect = document.querySelector("#routePreference");
const useMyLocationButton = document.querySelector("#useMyLocation");
const useMyLocationMapButton = document.querySelector("#useMyLocationMap");
const toggleLiveTrackingButton = document.querySelector("#toggleLiveTracking");
const toggleLiveTrackingMapButton = document.querySelector("#toggleLiveTrackingMap");
const recenterLocationMapButton = document.querySelector("#recenterLocationMap");
const openDirectionsPanelButton = document.querySelector("#openDirectionsPanel");
const getDirectionsButton = document.querySelector("#getDirections");
const clearRouteButton = document.querySelector("#clearRoute");
const directionsOutput = document.querySelector("#directionsOutput");
const mapLocationStatus = document.querySelector("#mapLocationStatus");
const routeSegmentCount = Array.isArray(window.pathSegments) ? window.pathSegments.length : 0;
const mapTabs = document.querySelectorAll(".map-tab");
const mapViews = document.querySelectorAll(".map-view");
const sidebar = document.querySelector(".sidebar");
const mobilePanelToggle = document.querySelector("#mobilePanelToggle");
const feedbackButton = document.querySelector("#feedbackButton");
const feedbackModal = document.querySelector("#feedbackModal");
const closeFeedbackButton = document.querySelector("#closeFeedback");
const feedbackForm = document.querySelector("#feedbackForm");
const feedbackType = document.querySelector("#feedbackType");
const feedbackMessage = document.querySelector("#feedbackMessage");
const feedbackLocation = document.querySelector("#feedbackLocation");
const feedbackRouteStart = document.querySelector("#feedbackRouteStart");
const feedbackRouteDestination = document.querySelector("#feedbackRouteDestination");
const feedbackContact = document.querySelector("#feedbackContact");
const feedbackStatus = document.querySelector("#feedbackStatus");
const copyFeedbackButton = document.querySelector("#copyFeedback");
const googleFeedbackFormBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfzX_fnWqgj1gF3L_-DniH_02m-dfLPXlBVjRzVEhaVTvSWyQ/viewform";
const googleFeedbackEntries = {
  type: "entry.1854494049",
  message: "entry.1731304365",
  location: "entry.816222739",
  routeStart: "entry.442614904",
  routeDestination: "entry.975708749",
  contact: "entry.932342083"
};
const jcsuCenter = [35.2435, -80.8565];
const layerIconNames = {
  "Academic Buildings": "school",
  "Campus Services": "business_center",
  "Dining and Student Life": "restaurant",
  "Housing": "home",
  "Former / Inactive Housing": "domain_disabled",
  "Athletics": "sports_basketball",
  "Parking and Transportation": "local_parking",
  "Landmarks": "account_balance"
};

const personalPlacesStorageKey = "jcsu-personal-places";
const favoriteLocationsStorageKey = "jcsu-favorite-locations";
const recentLocationsStorageKey = "jcsu-recent-locations";
const maxRecentLocations = 8;

const routePreferenceLabels = {
  fastest: "Fastest route",
  accessible: "Accessible route",
  "avoid-roads": "Avoid roads",
  "main-sidewalks": "Main sidewalks"
};
const layerStyles = {
  "Academic Buildings": { label: "Academic", color: "#1c4f9c" },
  "Campus Services": { label: "Services", color: "#a93636" },
  "Dining and Student Life": { label: "Dining", color: "#d5a11e" },
  "Housing": { label: "Housing", color: "#24745b" },
  "Former / Inactive Housing": { label: "Former Housing", color: "#7a8393" },
  "Athletics": { label: "Athletics", color: "#6f4bb4" },
  "Parking and Transportation": { label: "Parking", color: "#3d4656" },
  "Landmarks": { label: "Landmarks", color: "#7f4b24" }
};

const mobilePanelStates = ["collapsed", "half", "full"];
const mobilePanelLabels = {
  collapsed: "Search and Directions",
  half: "Search and Directions - Half",
  full: "Search and Directions - Full"
};
let activeLocationName = "";
let activeLocationIndex = -1;
let activeLayer = "All";
let currentPosition = null;
let liveTrackingWatchId = null;
let isLiveTracking = false;
let hasLiveTrackingCentered = false;
let navigationMap = null;
let navigationMarkerLayer = null;
let navigationRouteLayer = null;
let currentLocationLayer = null;
let isPanelDragging = false;
let panelDragStartY = 0;
let panelDragStartTranslate = 0;
let panelDragLatestTranslate = 0;
let panelDragMoved = false;
let lastRouteSignature = "";
let shouldFitRouteToMap = true;


function openFeedbackModal(options = {}) {
  const selectedLocationName = activeLocationName || "";
  const start = getLocationBySelectValue(fromLocationSelect.value)?.name || "";
  const end = getLocationBySelectValue(toLocationSelect.value)?.name || "";

  feedbackType.value = options.type || "Suggestion";
  feedbackLocation.value = options.location ?? selectedLocationName;
  feedbackRouteStart.value = options.routeStart ?? start;
  feedbackRouteDestination.value = options.routeDestination ?? end;
  feedbackMessage.value = options.message || "";
  feedbackStatus.textContent = options.status || "Submitting opens the Google feedback form.";
  feedbackModal.hidden = false;
  document.body.classList.add("modal-open");
  feedbackMessage.focus();
}

function openRouteIssueReporter(route, routePreferenceLabel) {
  const start = getLocationBySelectValue(fromLocationSelect.value);
  const end = getLocationBySelectValue(toLocationSelect.value);
  const selectedLocationName = activeLocationName || end?.name || "";
  const routeSummary = route
    ? `${routePreferenceLabel}; ${route.distanceText}; about ${route.minutes} minute${route.minutes === 1 ? "" : "s"}`
    : routePreferenceLabel;

  openFeedbackModal({
    type: "Route issue",
    location: selectedLocationName,
    routeStart: start?.name || "",
    routeDestination: end?.name || "",
    status: "Route details added. Describe what needs fixing, then submit.",
    message: [
      `Route preference: ${routeSummary}`,
      "Issue type: ",
      "What should be fixed: "
    ].join("\n")
  });
}

function closeFeedbackModal() {
  feedbackModal.hidden = true;
  document.body.classList.remove("modal-open");
  feedbackStatus.textContent = "Submitting opens the Google feedback form.";
  feedbackButton.focus();
}

function getFeedbackBody() {
  const selectedLocationName = feedbackLocation.value.trim() || "Not provided";
  const start = feedbackRouteStart.value.trim() || "Not selected";
  const end = feedbackRouteDestination.value.trim() || "Not selected";
  const contact = feedbackContact.value.trim() || "Not provided";

  return [
    `Type: ${feedbackType.value}`,
    `Selected location: ${selectedLocationName}`,
    `Route start: ${start}`,
    `Route destination: ${end}`,
    `Contact: ${contact}`,
    "",
    "Feedback:",
    feedbackMessage.value.trim()
  ].join("\n");
}

function getGoogleFeedbackUrl() {
  const selectedLocationName = feedbackLocation.value.trim() || "Not provided";
  const start = feedbackRouteStart.value.trim() || "Not selected";
  const end = feedbackRouteDestination.value.trim() || "Not selected";
  const contact = feedbackContact.value.trim();
  const message = contact && !googleFeedbackEntries.contact
    ? `${feedbackMessage.value.trim()}\n\nContact: ${contact}`
    : feedbackMessage.value.trim();
  const params = new URLSearchParams({
    usp: "pp_url",
    [googleFeedbackEntries.type]: feedbackType.value,
    [googleFeedbackEntries.message]: message,
    [googleFeedbackEntries.location]: selectedLocationName,
    [googleFeedbackEntries.routeStart]: start,
    [googleFeedbackEntries.routeDestination]: end
  });

  if (googleFeedbackEntries.contact && contact) {
    params.set(googleFeedbackEntries.contact, contact);
  }

  return `${googleFeedbackFormBaseUrl}?${params.toString()}`;
}

async function copyFeedbackText() {
  const body = getFeedbackBody();

  try {
    await navigator.clipboard.writeText(body);
    feedbackStatus.textContent = "Feedback copied. You can paste it into an email or message.";
  } catch {
    feedbackStatus.textContent = "Copy failed. Select the text and copy it manually.";
  }
}

function submitFeedback(event) {
  event.preventDefault();

  if (!feedbackMessage.value.trim()) {
    feedbackStatus.textContent = "Write a critique or suggestion before submitting.";
    feedbackMessage.focus();
    return;
  }

  const formUrl = getGoogleFeedbackUrl();
  window.open(formUrl, "_blank", "noreferrer");
  feedbackStatus.textContent = "Opening the Google feedback form in a new tab.";
}

function setLocationStatus(message, options = {}) {
  directionsOutput.innerHTML = message;

  if (!mapLocationStatus) {
    return;
  }

  mapLocationStatus.innerHTML = message;
  mapLocationStatus.hidden = false;
  mapLocationStatus.classList.toggle("is-error", Boolean(options.isError));
}

function hideLocationStatus() {
  if (mapLocationStatus) {
    mapLocationStatus.hidden = true;
    mapLocationStatus.classList.remove("is-error");
  }
}
function getLocationIcon(location) {
  return layerIconNames[location.layer] || "place";
}

function getPersonalPlaceIndexes() {
  try {
    const savedPlaces = JSON.parse(localStorage.getItem(personalPlacesStorageKey) || "{}");

    return {
      homeDorm: Number.isInteger(savedPlaces.homeDorm) && locations[savedPlaces.homeDorm] ? savedPlaces.homeDorm : null,
      mainClass: Number.isInteger(savedPlaces.mainClass) && locations[savedPlaces.mainClass] ? savedPlaces.mainClass : null
    };
  } catch (error) {
    return { homeDorm: null, mainClass: null };
  }
}

function savePersonalPlace(type, location) {
  try {
    const savedPlaces = getPersonalPlaceIndexes();
    savedPlaces[type] = location.index;
    localStorage.setItem(personalPlacesStorageKey, JSON.stringify(savedPlaces));
  } catch (error) {
    // Personal shortcuts are local conveniences; routing still works if storage is blocked.
  }
}

function renderPersonalLocations() {
  if (!personalLocationsContainer) {
    return;
  }

  const savedPlaces = getPersonalPlaceIndexes();
  const personalPlaces = [
    savedPlaces.homeDorm !== null
      ? { label: "Home Dorm", icon: "home", location: locations[savedPlaces.homeDorm] }
      : null,
    savedPlaces.mainClass !== null
      ? { label: "Main Class Building", icon: "school", location: locations[savedPlaces.mainClass] }
      : null
  ].filter(Boolean);

  if (personalPlaces.length === 0) {
    personalLocationsContainer.hidden = true;
    personalLocationsContainer.innerHTML = "";
    return;
  }

  personalLocationsContainer.hidden = false;
  personalLocationsContainer.innerHTML = `
    <div class="rail-heading">
      <h3>My Places</h3>
    </div>
    <div class="recent-location-rail" aria-label="Saved personal places"></div>
  `;

  const rail = personalLocationsContainer.querySelector(".recent-location-rail");

  personalPlaces.forEach((place) => {
    const button = document.createElement("button");
    button.className = "recent-location-button personal-location-button";
    button.type = "button";
    button.innerHTML = `
      <span class="material-symbols-outlined location-icon" aria-hidden="true">${place.icon}</span>
      <strong>${place.location.name}</strong>
      <span>${place.label}</span>
    `;

    button.addEventListener("click", () => selectLocation(place.location));

    rail.appendChild(button);
  });
}
function getRecentLocationIndexes() {
  try {
    const savedIndexes = JSON.parse(localStorage.getItem(recentLocationsStorageKey) || "[]");
    return savedIndexes.filter((index) => Number.isInteger(index) && locations[index]);
  } catch (error) {
    return [];
  }
}

function saveRecentLocation(location) {
  try {
    const recentIndexes = getRecentLocationIndexes().filter((index) => index !== location.index);
    recentIndexes.unshift(location.index);
    localStorage.setItem(recentLocationsStorageKey, JSON.stringify(recentIndexes.slice(0, maxRecentLocations)));
  } catch (error) {
    // Recent locations are helpful, but navigation should still work without browser storage.
  }
}

function getFavoriteLocationIndexes() {
  try {
    const savedIndexes = JSON.parse(localStorage.getItem(favoriteLocationsStorageKey) || "[]");
    return savedIndexes.filter((index) => Number.isInteger(index) && locations[index]);
  } catch (error) {
    return [];
  }
}

function isFavoriteLocation(location) {
  return getFavoriteLocationIndexes().includes(location.index);
}

function toggleFavoriteLocation(location) {
  try {
    const favoriteIndexes = getFavoriteLocationIndexes();
    const nextIndexes = favoriteIndexes.includes(location.index)
      ? favoriteIndexes.filter((index) => index !== location.index)
      : [location.index, ...favoriteIndexes];

    localStorage.setItem(favoriteLocationsStorageKey, JSON.stringify(nextIndexes));
  } catch (error) {
    // Favorites are saved locally when possible, but the map still works without storage.
  }
}

function selectLocation(location) {
  activeLocationName = location.name;
  activeLocationIndex = location.index;
  saveRecentLocation(location);
  renderSelectedLocation(location);
  focusMapOnLocation(location);
  renderLocations(getFilteredLocations());
  renderNavigationMarkers(getFilteredLocations());
  expandMobilePanel();
}

function renderLocationRail(container, title, railLabel, list) {
  if (!container) {
    return;
  }

  if (list.length === 0) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }

  container.hidden = false;
  container.innerHTML = `
    <div class="rail-heading">
      <h3>${title}</h3>
    </div>
    <div class="recent-location-rail" aria-label="${railLabel}"></div>
  `;

  const rail = container.querySelector(".recent-location-rail");

  list.forEach((location) => {
    const button = document.createElement("button");
    button.className = "recent-location-button";
    button.type = "button";
    button.innerHTML = `
      <span class="material-symbols-outlined location-icon" aria-hidden="true">${getLocationIcon(location)}</span>
      <strong>${location.name}</strong>
      <span>${location.category}</span>
    `;

    button.addEventListener("click", () => selectLocation(location));

    rail.appendChild(button);
  });
}

function renderFavoriteLocations() {
  renderLocationRail(
    favoriteLocationsContainer,
    "Favorites",
    "Favorite locations",
    getFavoriteLocationIndexes().map((index) => locations[index])
  );
}
function renderRecentLocations() {
  if (!recentLocationsContainer) {
    return;
  }

  const recentLocations = getRecentLocationIndexes().map((index) => locations[index]);
  renderLocationRail(recentLocationsContainer, "Recently Viewed", "Recently viewed locations", recentLocations);
}

function getSearchText(location) {
  return [
    location.name,
    location.layer,
    location.category,
    location.description,
    ...location.keywords
  ].join(" ").toLowerCase();
}

function renderLocations(list) {
  resultsContainer.innerHTML = "";
  resultCount.textContent = list.length;
  renderPersonalLocations();
  renderFavoriteLocations();
  renderRecentLocations();

  if (list.length === 0) {
    resultsContainer.innerHTML = '<p class="empty-state">No locations found. Try a building name, office, food spot, or dorm.</p>';
    return;
  }

  list.forEach((location) => {
    const button = document.createElement("button");
    button.className = "location-button";
    button.type = "button";
    button.innerHTML = `
      <span class="material-symbols-outlined location-icon" aria-hidden="true">${getLocationIcon(location)}</span>
      <strong>${location.name}</strong>
      <span>${location.category}</span>
    `;

    if (location.index === activeLocationIndex) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => selectLocation(location));

    resultsContainer.appendChild(button);
  });
}

function setMobilePanelState(state) {
  const nextState = mobilePanelStates.includes(state) ? state : "half";

  document.body.classList.toggle("directions-panel-open", nextState !== "collapsed");
  sidebar.classList.remove("sheet-collapsed", "sheet-half", "sheet-full");
  sidebar.classList.add(`sheet-${nextState}`);
  sidebar.dataset.panelState = nextState;
  mobilePanelToggle.textContent = mobilePanelLabels[nextState];
  mobilePanelToggle.setAttribute("aria-expanded", String(nextState !== "collapsed"));

  if (navigationMap) {
    setTimeout(() => navigationMap.invalidateSize(), 230);
  }
}

function setMobilePanelExpanded(isExpanded) {
  setMobilePanelState(isExpanded ? "full" : "collapsed");
}

function expandMobilePanel() {
  if (window.matchMedia("(max-width: 860px)").matches) {
    setMobilePanelState("full");
  }
}

function halfOpenMobilePanel() {
  if (window.matchMedia("(max-width: 860px)").matches) {
    setMobilePanelState("half");
  }
}

function collapseMobilePanel() {
  if (window.matchMedia("(max-width: 860px)").matches) {
    setMobilePanelState("collapsed");
  }
}

function openDirectionsPanel() {
  if (window.matchMedia("(max-width: 860px)").matches) {
    setMobilePanelState("half");
  } else {
    setMobilePanelState("full");
  }
}
function isMobilePanelEnabled() {
  return window.matchMedia("(max-width: 860px)").matches;
}

function getPanelStateTranslate(state) {
  const panelHeight = sidebar.offsetHeight;

  if (state === "full") {
    return 0;
  }

  if (state === "half") {
    return Math.min(window.innerHeight * 0.38, panelHeight - 54);
  }

  return panelHeight - 54;
}

function getCurrentPanelTranslate() {
  return getPanelStateTranslate(sidebar.dataset.panelState || "full");
}

function getNearestPanelState(translateY) {
  return mobilePanelStates.reduce((nearestState, state) => {
    const currentDistance = Math.abs(translateY - getPanelStateTranslate(state));
    const nearestDistance = Math.abs(translateY - getPanelStateTranslate(nearestState));
    return currentDistance < nearestDistance ? state : nearestState;
  }, "half");
}

function startPanelDrag(event) {
  if (!isMobilePanelEnabled()) {
    return;
  }

  isPanelDragging = true;
  panelDragMoved = false;
  panelDragStartY = event.clientY;
  panelDragStartTranslate = getCurrentPanelTranslate();
  panelDragLatestTranslate = panelDragStartTranslate;
  sidebar.classList.add("is-dragging");
  mobilePanelToggle.setPointerCapture(event.pointerId);
}

function updatePanelDrag(event) {
  if (!isPanelDragging) {
    return;
  }

  const deltaY = event.clientY - panelDragStartY;
  const maxTranslate = getPanelStateTranslate("collapsed");
  const nextTranslate = Math.max(0, Math.min(maxTranslate, panelDragStartTranslate + deltaY));

  if (Math.abs(deltaY) > 8) {
    panelDragMoved = true;
  }

  panelDragLatestTranslate = nextTranslate;
  sidebar.style.transform = `translateY(${nextTranslate}px)`;
}

function endPanelDrag(event) {
  if (!isPanelDragging) {
    return;
  }

  isPanelDragging = false;
  sidebar.classList.remove("is-dragging");
  sidebar.style.transform = "";

  if (mobilePanelToggle.hasPointerCapture(event.pointerId)) {
    mobilePanelToggle.releasePointerCapture(event.pointerId);
  }

  setMobilePanelState(getNearestPanelState(panelDragLatestTranslate));

  setTimeout(() => {
    panelDragMoved = false;
  }, 0);
}

function focusMapOnLocation(location) {
  focusNavigationMapOnLocation(location);
}

function showSearchPanel() {
  sidebar.classList.remove("location-detail-active");
  activeLocationName = "";
  activeLocationIndex = -1;
  renderLocations(getFilteredLocations());
  renderNavigationMarkers(getFilteredLocations());
}

function renderSelectedLocation(location) {
  const isFavorite = isFavoriteLocation(location);
  const savedPersonalPlaces = getPersonalPlaceIndexes();
  const isHomeDorm = savedPersonalPlaces.homeDorm === location.index;
  const isMainClass = savedPersonalPlaces.mainClass === location.index;

  sidebar.classList.add("location-detail-active");
  selectedLocation.innerHTML = `
    <div class="details-heading-row">
      <div>
        <p class="eyebrow">Selected Location</p>
        <h2>${location.name}</h2>
      </div>
      <button id="closeLocationDetails" class="icon-button" type="button" aria-label="Back to search">x</button>
    </div>
    <p>${location.description}</p>
    <div class="detail-meta">
      <span class="tag">${location.layer}</span>
      <span class="tag">${location.category}</span>
    </div>
    <div class="detail-quick-info">
      <div>
        <span class="material-symbols-outlined" aria-hidden="true">${getLocationIcon(location)}</span>
        <span>${location.category}</span>
      </div>
      <div>
        <span class="material-symbols-outlined" aria-hidden="true">pin_drop</span>
        <span>${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}</span>
      </div>
    </div>
    <div class="location-actions">
      <button class="secondary-button" type="button" data-route-action="start">Set as Start</button>
      <button class="primary-button" type="button" data-route-action="destination">Set as Destination</button>
      <button class="secondary-button" type="button" data-personal-action="homeDorm">
        <span class="material-symbols-outlined" aria-hidden="true">home</span>
        ${isHomeDorm ? "Home Dorm Saved" : "Set Home Dorm"}
      </button>
      <button class="secondary-button" type="button" data-personal-action="mainClass">
        <span class="material-symbols-outlined" aria-hidden="true">school</span>
        ${isMainClass ? "Main Class Saved" : "Set Main Class"}
      </button>
      <button class="secondary-button wide-action" type="button" data-favorite-action>
        <span class="material-symbols-outlined" aria-hidden="true">${isFavorite ? "star" : "star_border"}</span>
        ${isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  `;

  selectedLocation.querySelector("#closeLocationDetails").addEventListener("click", showSearchPanel);

  selectedLocation.querySelector('[data-route-action="start"]').addEventListener("click", () => {
    setRouteEndpoint("start", location);
  });

  selectedLocation.querySelector('[data-route-action="destination"]').addEventListener("click", () => {
    setRouteEndpoint("destination", location);
  });

  selectedLocation.querySelectorAll("[data-personal-action]").forEach((button) => {
    button.addEventListener("click", () => {
      savePersonalPlace(button.dataset.personalAction, location);
      renderSelectedLocation(location);
      renderLocations(getFilteredLocations());
    });
  });

  selectedLocation.querySelector("[data-favorite-action]").addEventListener("click", () => {
    toggleFavoriteLocation(location);
    renderSelectedLocation(location);
    renderLocations(getFilteredLocations());
  });
}

function getFilteredLocations() {
  const query = searchInput.value.trim().toLowerCase();
  const layerMatches = (location) => activeLayer === "All" || location.layer === activeLayer;
  const queryMatches = (location) => !query || getSearchText(location).includes(query);

  return locations.filter((location) => layerMatches(location) && queryMatches(location));
}

function renderLocationOptions() {
  const sortedLocations = [...locations].sort((a, b) => a.name.localeCompare(b.name));

  sortedLocations.forEach((location) => {
    const fromOption = document.createElement("option");
    fromOption.value = String(location.index);
    fromOption.textContent = location.name;
    fromLocationSelect.appendChild(fromOption);

    const toOption = document.createElement("option");
    toOption.value = String(location.index);
    toOption.textContent = location.name;
    toLocationSelect.appendChild(toOption);
  });
}

function getLocationBySelectValue(value) {
  if (value === "current-location") {
    return {
      name: "Current Location",
      lat: currentPosition?.lat,
      lng: currentPosition?.lng
    };
  }

  return locations.find((location) => location.index === Number(value));
}

function estimateWalkingMinutes(start, end) {
  if (!start?.lat || !start?.lng || !end?.lat || !end?.lng) {
    return null;
  }

  const milesPerDegreeLat = 69;
  const milesPerDegreeLng = 69 * Math.cos((start.lat * Math.PI) / 180);
  const latMiles = (end.lat - start.lat) * milesPerDegreeLat;
  const lngMiles = (end.lng - start.lng) * milesPerDegreeLng;
  const straightLineMiles = Math.sqrt(latMiles ** 2 + lngMiles ** 2);
  const campusPathEstimate = straightLineMiles * 1.25;

  return Math.max(1, Math.round((campusPathEstimate / 3) * 60));
}

function getRouteSignature(start, end) {
  const startKey = start.name === "Current Location"
    ? "Current Location"
    : `${start.name}:${Number(start.lat).toFixed(5)},${Number(start.lng).toFixed(5)}`;
  const endKey = `${end.name}:${Number(end.lat).toFixed(5)},${Number(end.lng).toFixed(5)}`;
  return `${startKey}->${endKey}`;
}

function renderDirectionsPreview() {
  const start = getLocationBySelectValue(fromLocationSelect.value);
  const end = getLocationBySelectValue(toLocationSelect.value);
  const isCurrentLocationStart = fromLocationSelect.value === "current-location";
  const routePreference = routePreferenceSelect?.value || "fastest";
  const routePreferenceLabel = routePreferenceLabels[routePreference] || "Fastest route";

  if (!start || !end) {
    directionsOutput.textContent = "Choose a starting point and destination.";
    hideLocationStatus();
    return;
  }

  if (start.name === end.name) {
    directionsOutput.textContent = "Your starting point and destination are the same.";
    return;
  }

  if (!window.CampusNavigation) {
    const walkingMinutes = estimateWalkingMinutes(start, end);
    const estimateText = walkingMinutes
      ? ` Estimated walking time: about ${walkingMinutes} minute${walkingMinutes === 1 ? "" : "s"}.`
      : "";

    directionsOutput.innerHTML = `
      <strong>${start.name} to ${end.name}</strong>${estimateText}
      <br>
      Navigation data is not loaded yet.
    `;

    if (isCurrentLocationStart) {
      showCurrentLocationMarker({ centerMap: !isLiveTracking });
    } else {
      focusMapOnLocation(end);
    }
    return;
  }

  const route = window.CampusNavigation.findRoute(start, end, { preference: routePreference });

  if (!route.ok) {
    directionsOutput.innerHTML = `
      <strong>Route unavailable:</strong> ${route.message}
      <br>
      Choose another nearby starting point or destination.
    `;
    if (isCurrentLocationStart) {
      showCurrentLocationMarker({ centerMap: !isLiveTracking });
    } else {
      focusMapOnLocation(end);
    }
    return;
  }

  const routeSignature = getRouteSignature(start, end);
  const shouldFitThisRoute = shouldFitRouteToMap || routeSignature !== lastRouteSignature;
  lastRouteSignature = routeSignature;
  shouldFitRouteToMap = false;

  const directionSteps = buildDirectionSteps(route.steps);
  const visibleSteps = directionSteps.slice(0, 8);
  const extraStepCount = Math.max(0, directionSteps.length - visibleSteps.length);
  const stepsMarkup = visibleSteps
    .map((step, index) => `<li>${index + 1}. ${step.instruction} for ${formatRouteDistance(step.distance)}.</li>`)
    .join("");
  const extraMarkup = extraStepCount
    ? `<li>Continue through ${extraStepCount} more short campus path${extraStepCount === 1 ? "" : "s"}.</li>`
    : "";

  directionsOutput.innerHTML = `
    <strong>${start.name} to ${end.name}</strong>
    <div class="route-summary">${routePreferenceLabel}</div>
    <div class="route-metrics" aria-label="Route estimate">
      <span><strong>${route.minutes}</strong> min walk</span>
      <span>${route.distanceText}</span>
      <span>${route.graphEdgeCount} path segment${route.graphEdgeCount === 1 ? "" : "s"}</span>
      <span>${route.preferenceNote}</span>
    </div>
    <ol class="route-steps">
      <li>Start at ${start.name}.</li>
      ${stepsMarkup}
      ${extraMarkup}
      <li>Arrive at ${end.name}.</li>
    </ol>
    <button id="reportRouteIssue" class="secondary-button route-report-button" type="button">Report Route Issue</button>
  `;

  directionsOutput.querySelector("#reportRouteIssue").addEventListener("click", () => {
    openRouteIssueReporter(route, routePreferenceLabel);
  });

  drawNavigationRoute(route, start, end, { fitBounds: shouldFitThisRoute });
  switchMapView("navigationMapView");

  if (isCurrentLocationStart) {
    showCurrentLocationMarker({ centerMap: !isLiveTracking });
    collapseMobilePanel();
  } else {
    halfOpenMobilePanel();
    focusMapOnLocation(end);
  }
}

function formatRouteDistance(meters) {
  const feet = meters * 3.28084;

  if (feet < 1000) {
    return `${Math.round(feet)} ft`;
  }

  return `${(feet / 5280).toFixed(2)} mi`;
}

function buildDirectionSteps(rawSteps) {
  const groupedSteps = [];

  rawSteps.forEach((step) => {
    const instruction = getFriendlyInstruction(step.name);
    const lastStep = groupedSteps[groupedSteps.length - 1];

    if (lastStep && lastStep.instruction === instruction) {
      lastStep.distance += step.distance;
    } else {
      groupedSteps.push({
        instruction,
        distance: step.distance
      });
    }
  });

  return groupedSteps.filter((step) => step.distance > 1);
}

function getFriendlyInstruction(pathName) {
  const cleanName = cleanPathName(pathName);
  const lowerName = cleanName.toLowerCase();

  if (lowerName.includes("cross street") || lowerName.includes("cross the street") || lowerName.includes("street crossing")) {
    return "Cross the street";
  }

  if (lowerName.includes("stairs")) {
    return "Take the stairs";
  }

  if (lowerName === "sidewalk" || lowerName === "sidwalk" || lowerName === "main sidewalk" || lowerName === "main walkway") {
    return "Continue on the main sidewalk";
  }

  if (lowerName.includes("parking lot") || lowerName.includes("parking area")) {
    return "Continue through the parking area";
  }

  if (lowerName.includes("intersection")) {
    return "Continue to the next walkway intersection";
  }

  if (lowerName.includes("entrance")) {
    return `Continue toward ${cleanName}`;
  }

  if (lowerName.includes("sidewalk") || lowerName.includes("walkway")) {
    return `Follow ${cleanName}`;
  }

  return `Continue toward ${cleanName}`;
}

function cleanPathName(pathName) {
  return String(pathName || "campus path")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/Sidwalk/gi, "Sidewalk")
    .replace(/Canergie/gi, "Carnegie")
    .replace(/McCorey/gi, "McCrorey")
    .replace(/^To\s+/i, "")
    .trim();
}

function setRouteEndpoint(type, location) {
  const value = String(location.index);

  if (type === "start") {
    fromLocationSelect.value = value;
    directionsOutput.innerHTML = `<strong>Starting point set:</strong> ${location.name}. Choose a destination next.`;
  } else {
    toLocationSelect.value = value;
    directionsOutput.innerHTML = `<strong>Destination set:</strong> ${location.name}. Choose a starting point next.`;
  }

  if (fromLocationSelect.value && toLocationSelect.value) {
    renderDirectionsPreview();
  } else {
    expandMobilePanel();
  }
}

function initializeNavigationMap() {
  if (navigationMap || !window.L) {
    return;
  }

  navigationMap = L.map("navigationMap").setView(jcsuCenter, 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(navigationMap);

  navigationMarkerLayer = L.layerGroup().addTo(navigationMap);
  navigationRouteLayer = L.layerGroup().addTo(navigationMap);
  currentLocationLayer = L.layerGroup().addTo(navigationMap);
  addNavigationLegend();
  renderNavigationMarkers(getFilteredLocations());
}

function getLayerStyle(layer) {
  return layerStyles[layer] || { label: layer, color: "#1c4f9c" };
}

function addNavigationLegend() {
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = () => {
    const container = L.DomUtil.create("div", "map-legend");
    const legendItems = Object.values(layerStyles)
      .map((style) => `
        <div class="legend-item">
          <span class="legend-swatch" style="background:${style.color}"></span>
          <span>${style.label}</span>
        </div>
      `)
      .join("");

    container.innerHTML = `
      <strong>Legend</strong>
      ${legendItems}
    `;

    return container;
  };

  legend.addTo(navigationMap);
}

function renderNavigationMarkers(list) {
  if (!navigationMarkerLayer || !window.L) {
    return;
  }

  navigationMarkerLayer.clearLayers();

  list.forEach((location) => {
    if (!location.lat || !location.lng) {
      return;
    }

    const style = getLayerStyle(location.layer);
    const isSelected = location.index === activeLocationIndex;
    const marker = L.circleMarker([location.lat, location.lng], {
      radius: isSelected ? 9 : 6,
      color: isSelected ? "#111827" : style.color,
      weight: isSelected ? 4 : 2,
      fillColor: style.color,
      fillOpacity: 0.95
    });

    marker.bindPopup(`
      <strong>${location.name}</strong>
      ${location.category}<br>
      ${location.layer}
    `);

    marker.on("click", () => selectLocation(location));

    marker.addTo(navigationMarkerLayer);
  });
}

function focusNavigationMapOnLocation(location) {
  if (!navigationMap || !location.lat || !location.lng) {
    return;
  }

  navigationMap.setView([location.lat, location.lng], 19);
}

function showCurrentLocationMarker(options = {}) {
  initializeNavigationMap();

  if (!currentLocationLayer || !currentPosition || !window.L) {
    return;
  }

  currentLocationLayer.clearLayers();

  const accuracyRadius = Math.max(18, Math.min(currentPosition.accuracy || 30, 120));
  const accuracyText = currentPosition.accuracy
    ? `<br>Accuracy: about ${Math.round(currentPosition.accuracy)} meters`
    : "";

  L.circle([currentPosition.lat, currentPosition.lng], {
    radius: accuracyRadius,
    color: "#1c4f9c",
    weight: 2,
    fillColor: "#1c4f9c",
    fillOpacity: 0.18
  }).addTo(currentLocationLayer);

  L.circleMarker([currentPosition.lat, currentPosition.lng], {
    radius: 12,
    color: "#ffffff",
    weight: 4,
    fillColor: "#1c4f9c",
    fillOpacity: 1
  }).bindPopup(`<strong>You are here</strong>${accuracyText}`).addTo(currentLocationLayer);

  if (options.centerMap !== false) {
    navigationMap.setView([currentPosition.lat, currentPosition.lng], 19);
  }
}

function drawNavigationRoute(route, start, end, options = {}) {
  initializeNavigationMap();

  if (!navigationRouteLayer || !window.L || !route?.path?.length) {
    return;
  }

  navigationRouteLayer.clearLayers();

  const routeCoordinates = [
    [start.lat, start.lng],
    ...route.path.map((point) => [point.lat, point.lng]),
    [end.lat, end.lng]
  ];

  const routeLine = L.polyline(routeCoordinates, {
    color: "#a93636",
    weight: 5,
    opacity: 0.9
  }).addTo(navigationRouteLayer);

  L.circleMarker([start.lat, start.lng], {
    radius: 7,
    color: "#24745b",
    weight: 3,
    fillColor: "#ffffff",
    fillOpacity: 1
  }).bindPopup(`<strong>Start</strong>${start.name}`).addTo(navigationRouteLayer);

  L.circleMarker([end.lat, end.lng], {
    radius: 7,
    color: "#a93636",
    weight: 3,
    fillColor: "#ffffff",
    fillOpacity: 1
  }).bindPopup(`<strong>Destination</strong>${end.name}`).addTo(navigationRouteLayer);

  if (options.fitBounds !== false) {
    navigationMap.fitBounds(routeLine.getBounds(), { padding: [32, 32] });
  }
}

function clearRoute() {
  stopLiveTracking();
  fromLocationSelect.value = "";
  toLocationSelect.value = "";
  directionsOutput.textContent = "Choose a starting point and destination.";
  lastRouteSignature = "";
  shouldFitRouteToMap = true;
  hideLocationStatus();

  if (navigationRouteLayer) {
    navigationRouteLayer.clearLayers();
  }
}

function switchMapView(targetId) {
  const isNavigationMapActive = true;
  targetId = "navigationMapView";

  document.body.classList.toggle("navigation-map-active", isNavigationMapActive);
  if (!isNavigationMapActive) {
    document.body.classList.remove("directions-panel-open");
  }

  mapTabs.forEach((item) => {
    const isActive = item.dataset.mapView === targetId;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  mapViews.forEach((view) => {
    const isActive = view.id === targetId;
    view.classList.toggle("is-active", isActive);
    view.hidden = !isActive;
  });

  if (targetId === "navigationMapView") {
    initializeNavigationMap();
    setTimeout(() => {
      navigationMap.invalidateSize();
    }, 0);
  }
}

searchInput.addEventListener("input", () => {
  const filteredLocations = getFilteredLocations();
  renderLocations(filteredLocations);
  renderNavigationMarkers(filteredLocations);
  expandMobilePanel();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeLayer = button.dataset.layer;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    const filteredLocations = getFilteredLocations();
    renderLocations(filteredLocations);
    renderNavigationMarkers(filteredLocations);
  });
});

function getLocationErrorMessage(error) {
  if (error?.code === 1) {
    return "Location permission was blocked. In your browser settings, allow location access for this site, then try again.";
  }

  if (error?.code === 2) {
    return "Your device could not find your location. Turn on Location Services/GPS and try again outdoors or near a window.";
  }

  if (error?.code === 3) {
    return "Location lookup timed out. Try again, or choose a starting point from the list.";
  }

  return "Location is unavailable right now. Choose a starting point from the list instead.";
}

function setLocationButtonsLoading(isLoading) {
  useMyLocationButton.disabled = isLoading;
  useMyLocationButton.textContent = isLoading ? "Setting location..." : "Set My Location";

  if (useMyLocationMapButton) {
    useMyLocationMapButton.disabled = isLoading;
    useMyLocationMapButton.textContent = isLoading ? "Setting location..." : "Set My Location";
  }
}

function setLiveTrackingButtons() {
  const label = isLiveTracking ? "Stop Live Tracking" : "Start Live Tracking";

  if (toggleLiveTrackingButton) {
    toggleLiveTrackingButton.textContent = label;
  }

  if (toggleLiveTrackingMapButton) {
    toggleLiveTrackingMapButton.textContent = label;
    toggleLiveTrackingMapButton.classList.toggle("primary-map-action", isLiveTracking);
  }
}

function canUseCurrentLocation() {
  if (!navigator.geolocation) {
    setLocationStatus("This browser does not support current-location access.", { isError: true });
    return false;
  }

  if (!window.isSecureContext) {
    setLocationStatus("<strong>Current location needs HTTPS.</strong><br>Open the GitHub Pages version of the site, or use localhost while testing.", { isError: true });
    expandMobilePanel();
    return false;
  }

  return true;
}

function saveCurrentPosition(position) {
  currentPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    accuracy: position.coords.accuracy
  };

  if (!fromLocationSelect.querySelector('option[value="current-location"]')) {
    const option = document.createElement("option");
    option.value = "current-location";
    option.textContent = "Current Location";
    fromLocationSelect.prepend(option);
  }

  fromLocationSelect.value = "current-location";
}

function updateCurrentLocation(position, mode) {
  saveCurrentPosition(position);

  const accuracy = Math.round(currentPosition.accuracy || 0);
  const message = mode === "live"
    ? `<strong>Live tracking on.</strong><br>Your pin updates as you move. Accuracy: about ${accuracy} meters.`
    : `<strong>Starting location saved.</strong><br>This pin stays fixed until you tap Set My Location again. Accuracy: about ${accuracy} meters.`;

  setLocationStatus(message);
  const shouldCenterMap = mode !== "live" || !hasLiveTrackingCentered;

  showCurrentLocationMarker({ centerMap: shouldCenterMap });
  if (mode === "live") {
    hasLiveTrackingCentered = true;
  }
  switchMapView("navigationMapView");

  if (toLocationSelect.value) {
    renderDirectionsPreview();
  } else {
    collapseMobilePanel();
  }
}

function requestCurrentLocation() {
  if (isLiveTracking) {
    stopLiveTracking();
  }

  if (!canUseCurrentLocation()) {
    return;
  }

  setLocationButtonsLoading(true);
  setLocationStatus("<strong>Setting your starting location...</strong><br>Your browser may ask for permission.");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      updateCurrentLocation(position, "fixed");
      setLocationButtonsLoading(false);
    },
    (error) => {
      setLocationStatus(getLocationErrorMessage(error), { isError: true });
      expandMobilePanel();
      setLocationButtonsLoading(false);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}

function stopLiveTracking(options = {}) {
  if (liveTrackingWatchId !== null) {
    navigator.geolocation.clearWatch(liveTrackingWatchId);
    liveTrackingWatchId = null;
  }

  isLiveTracking = false;
  hasLiveTrackingCentered = false;
  setLiveTrackingButtons();

  if (options.showStatus !== false) {
    setLocationStatus("<strong>Live tracking stopped.</strong><br>Your last location pin stays on the map until you set or track your location again.");
  }
}

function recenterOnCurrentLocation() {
  if (!currentPosition) {
    setLocationStatus("Set or start tracking your location first.", { isError: true });
    return;
  }

  shouldFitRouteToMap = false;
  showCurrentLocationMarker({ centerMap: true });
  switchMapView("navigationMapView");
}
function toggleLiveTracking() {
  if (isLiveTracking) {
    stopLiveTracking();
    return;
  }

  if (!canUseCurrentLocation()) {
    return;
  }

  isLiveTracking = true;
  hasLiveTrackingCentered = false;
  setLiveTrackingButtons();
  setLocationStatus("<strong>Starting live tracking...</strong><br>Your browser may ask for permission.");

  liveTrackingWatchId = navigator.geolocation.watchPosition(
    (position) => {
      updateCurrentLocation(position, "live");
    },
    (error) => {
      setLocationStatus(getLocationErrorMessage(error), { isError: true });
      expandMobilePanel();
      stopLiveTracking({ showStatus: false });
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
  );
}
useMyLocationButton.addEventListener("click", requestCurrentLocation);

if (useMyLocationMapButton) {
  useMyLocationMapButton.addEventListener("click", requestCurrentLocation);
}

if (toggleLiveTrackingButton) {
  toggleLiveTrackingButton.addEventListener("click", toggleLiveTracking);
}

if (toggleLiveTrackingMapButton) {
  toggleLiveTrackingMapButton.addEventListener("click", toggleLiveTracking);
}

if (recenterLocationMapButton) {
  recenterLocationMapButton.addEventListener("click", recenterOnCurrentLocation);
}

if (openDirectionsPanelButton) {
  openDirectionsPanelButton.addEventListener("click", openDirectionsPanel);
}

feedbackButton.addEventListener("click", openFeedbackModal);
closeFeedbackButton.addEventListener("click", closeFeedbackModal);
copyFeedbackButton.addEventListener("click", copyFeedbackText);
feedbackForm.addEventListener("submit", submitFeedback);

feedbackModal.addEventListener("click", (event) => {
  if (event.target === feedbackModal) {
    closeFeedbackModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !feedbackModal.hidden) {
    closeFeedbackModal();
  }
});
getDirectionsButton.addEventListener("click", renderDirectionsPreview);
if (routePreferenceSelect) {
  routePreferenceSelect.addEventListener("change", () => {
    shouldFitRouteToMap = true;

    if (fromLocationSelect.value && toLocationSelect.value) {
      renderDirectionsPreview();
    }
  });
}
clearRouteButton.addEventListener("click", clearRoute);
mobilePanelToggle.addEventListener("pointerdown", startPanelDrag);
mobilePanelToggle.addEventListener("pointermove", updatePanelDrag);
mobilePanelToggle.addEventListener("pointerup", endPanelDrag);
mobilePanelToggle.addEventListener("pointercancel", endPanelDrag);

mobilePanelToggle.addEventListener("click", () => {
  if (panelDragMoved) {
    return;
  }

  const currentState = sidebar.dataset.panelState || "full";
  const nextState = currentState === "collapsed" ? "half" : currentState === "half" ? "full" : "collapsed";
  setMobilePanelState(nextState);
});

mapTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchMapView(tab.dataset.mapView);

    if (tab.dataset.mapView === "navigationMapView") {
      collapseMobilePanel();
    }
  });
});

locations.forEach((location, index) => {
  location.index = index;
});

renderLocationOptions();
renderLocations(locations);
initializeNavigationMap();
switchMapView("navigationMapView");
setMobilePanelState("full");
