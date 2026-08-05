# JCSU Campus Navigation

An interactive mobile-first campus map and walking navigation web app for Johnson C. Smith University. The app uses campus location data, sidewalk path data, Leaflet, OpenStreetMap tiles, and Dijkstra-based routing to help students search for places, get walking directions, save personal shortcuts, and report route issues.

## Live Website

https://coriawng.github.io/jcsu-campus-map/

## Key Features

- Custom Leaflet campus navigation map
- Searchable campus locations with nickname support, such as `SAAC` and `IBC`
- Category filters for academic buildings, housing, dining, services, athletics, parking, and landmarks
- Location detail cards with coordinates, route actions, favorites, and personal shortcuts
- Saved **My Places** shortcuts for Home Dorm and Main Class Building
- Favorites and Recently Viewed locations saved on the user's device
- Current-location support and live tracking with browser GPS permission
- Walking directions using campus sidewalk/navigation path data
- Route preferences: Fastest, Accessible, Avoid Roads, and Prefer Main Sidewalks
- Route issue reporter connected to the existing Google Forms feedback flow
- Emergency/Safety quick panel with call buttons and route shortcuts
- PWA install support for iPhone and Android home screen use

## Tech Stack

- HTML
- CSS
- JavaScript
- Leaflet
- OpenStreetMap tiles
- Google My Maps / KML / KMZ data workflow
- Browser Geolocation API
- Web App Manifest
- Service Worker caching

## Main Files

- `index.html` - main app page and UI structure
- `style.css` - layout, mobile bottom sheet, map UI, modals, and responsive styling
- `locations.js` - campus building and location data
- `paths.js` - exported sidewalk/navigation path data
- `navigation.js` - graph building and Dijkstra route logic
- `script.js` - search, filters, location details, GPS, routing, feedback, safety, and PWA registration
- `manifest.json` - PWA install metadata
- `service-worker.js` - local app shell caching
- `icons/` - PWA home screen icons
- `MOBILE_QA_CHECKLIST.md` - testing checklist for phone and desktop review

## Run Locally

From the project folder, start a local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500/index.html
```

Using `localhost` is better than opening the HTML file directly because browser location and service worker features are more reliable from a local server or HTTPS.

## Install as a Phone App

### iPhone

1. Open the live site in Safari.
2. Tap the Share button.
3. Tap **Add to Home Screen**.
4. Open **JCSU Map** from the new home screen icon.

### Android

1. Open the live site in Chrome.
2. Tap the browser menu.
3. Tap **Install app** or **Add to Home screen**.
4. Open **JCSU Map** from the app icon.

## Navigation System

The navigation system uses sidewalk paths exported from Google My Maps/KML. The app converts those paths into a graph:

- Path coordinates become graph nodes
- Connected path segments become graph edges
- Dijkstra's algorithm finds a campus walking route
- Route preferences adjust the cost of different segment types
- The result is shown as written directions and drawn on the Leaflet map

For best route preference behavior, path names should be clear and consistent, for example:

- `Main Sidewalk`
- `Accessible Walkway`
- `Street Crossing`
- `Stairs`
- `Parking Lot Path`
- `Ramp`
- `Shortcut`

## Testing Priorities

Use `MOBILE_QA_CHECKLIST.md` for structured testing. The most important workflows are:

- Search for a building
- Select a location and view details
- Save Home Dorm and Main Class Building
- Add/remove Favorites
- Set current location
- Get directions
- Try different route preferences
- Report a route issue
- Open Safety quick actions
- Install as a PWA on a phone

## Current Limitations

- Route quality depends on the accuracy and connection quality of the sidewalk path data.
- Location accuracy depends on the user's device, GPS signal, browser, and permission settings.
- Favorites, My Places, and recent locations are stored locally on each device and do not sync yet.
- Offline support caches the app shell, but map tiles from OpenStreetMap may still require network access unless already cached by the browser.

## Future Improvements

- Add more route test cases and tune path preference weights
- Add accessibility-specific path labels such as ramps and stairs
- Add screenshots or a short demo GIF to this README
- Add an admin-friendly data update workflow
- Add building floor/sub-location search
- Add a chatbot-style campus help feature
- Add cloud sync for saved places
