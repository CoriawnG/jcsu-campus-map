# JCSU Campus Navigation

An interactive mobile-first campus map and walking navigation web app for Johnson C. Smith University. The app uses campus location data, sidewalk path data, Leaflet, Esri World Imagery satellite tiles, and Dijkstra-based routing to help students search for places, get walking directions, save personal shortcuts, and report route issues.

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
- Satellite/Streets basemap picker using Esri World Imagery tiles
- Custom campus building labels that fade in as you zoom closer
- Building hours and College of STEM faculty office hours with open-now status and weekly schedules
- PWA install support for iPhone and Android home screen use

## Tech Stack

- HTML
- CSS
- JavaScript
- Leaflet
- Esri World Imagery tiles (Satellite) with a Streets option
- Google My Maps / KML / KMZ data workflow
- Browser Geolocation API
- Web App Manifest
- Service Worker caching
- Azure Static Web Apps + Microsoft (Entra ID) login for the gated faculty hours API (in progress)


## Main Files

- `index.html` - main app page and UI structure
- `style.css` - layout, mobile bottom sheet, map UI, modals, and responsive styling
- `locations.js` - campus building and location data
- `data/faculty-hours.json` - faculty office hours (fetched at runtime so an API can gate it behind JCSU login later)
- `staticwebapp.config.json` - Azure Static Web Apps routes: `/api/*` requires sign-in, the map stays public (GitHub Pages ignores this file)
- `api/faculty-hours/` - Azure Function that serves office hours only to signed-in JCSU emails, plus its data copy and tests

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

## Microsoft login (3-tier access)

Faculty office hours are moving to a three-tier access model:

1. **Guest** - public map, search, directions, and dining; faculty office hours stay locked with a sign-in prompt.
2. **JCSU student/staff** - signs in with a Microsoft (Entra ID) account and sees faculty office hours.
3. **Admin** - future phase: edit office hours in the app (stored in Azure Table Storage).

How it works:

- Login is handled by Azure Static Web Apps (Microsoft/Entra ID identity provider); no passwords are stored in this project.
- `staticwebapp.config.json` requires authentication for `/api/*` only. The public map stays anonymous. GitHub Pages ignores this file, so nothing changes on the current host.
- The `api/faculty-hours` Azure Function checks that the signed-in account's email ends in `@jcsu.edu` or `@mymail.jcsu.edu` (update `api/faculty-hours/auth.js` once IT confirms the exact domains) and returns `401` otherwise, with `Cache-Control: no-store`.
- Until the Azure cutover, the app fetches the public `data/faculty-hours.json` exactly as before. At cutover: point `FACULTY_HOURS_ENDPOINT` in `script.js` to `/api/faculty-hours`, remove the public JSON, and enable the Microsoft identity provider with the tenant ID/app registration from JCSU IT.
- Admin access will use the Entra app role `admin` (assigned to the `JCSU-Map-Admins` group); the function already honors it through the principal's `userRoles`.
- Tests: `node api/faculty-hours/index.test.js`. Preview the locked guest state any time with `?lockFaculty=1`.

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
