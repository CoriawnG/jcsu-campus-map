# JCSU Interactive Campus Map

An interactive campus map and navigation prototype for Johnson C. Smith University. The project started with Google My Maps campus data and is being extended into a web app with search, filters, location details, GPS support, and campus walking directions.

## Website

https://coriawng.github.io/jcsu-campus-map/

## Features

- Embedded Google My Maps campus map
- Custom Leaflet navigation map
- Searchable campus locations
- Category filters for academics, housing, dining, services, athletics, parking, and landmarks
- Location detail cards
- Set selected locations as route start or destination
- Browser current-location support
- Shortest-path walking route calculation using campus sidewalk data
- Route line drawing on the navigation map
- Mobile-friendly bottom-sheet layout

## Tech Stack

- HTML
- CSS
- JavaScript
- Google My Maps
- Leaflet
- OpenStreetMap tiles

## Project Files

- `index.html` - main webpage
- `style.css` - layout, mobile design, and map styling
- `locations.js` - campus building and location data
- `paths.js` - exported sidewalk/navigation path data
- `navigation.js` - graph-building and Dijkstra shortest-path logic
- `script.js` - search, filters, map behavior, directions UI, and GPS interactions

## Run Locally

From the project folder, start a local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500/index.html
```

Using `localhost` is better than opening the HTML file directly because browser location features work more reliably from a local server.

## Mobile Testing

For Chrome mobile preview:

```text
Inspect → Toggle device toolbar
```

For real Android/iPhone testing, the site should be hosted with HTTPS. Good options include:

- GitHub Pages
- Netlify
- Vercel

## Navigation System

The navigation system uses sidewalk paths exported from Google My Maps. These paths are converted into graph data:

- Path coordinates become graph nodes
- Sidewalk segments become graph edges
- Dijkstra's algorithm finds the shortest walkable route
- The result is displayed as written directions and drawn on the Leaflet map

## Current Limitations

- The Google My Maps iframe cannot be directly filtered or controlled by JavaScript.
- The Leaflet map is the main custom map for route drawing and future GPS features.
- Current-location support requires browser permission and works best on HTTPS or localhost.
- Direction quality depends on how cleanly the sidewalk lines connect in the exported path data.

## Future Improvements

- Host the project online with HTTPS
- Improve turn-by-turn wording
- Add accessibility-friendly routes
- Add building floor/sub-location search
- Add voice search
- Add chatbot-style location help
- Add route recalculation from live GPS movement
