# Mobile QA Checklist

Use this checklist whenever you update the JCSU Campus Navigation app. Test on the live GitHub Pages site when possible because GPS, service workers, and PWA install behavior need HTTPS.

## Test Info

- Date:
- Tester:
- Device:
- Browser:
- App version / latest commit:
- Location tested from: on campus / off campus

## PWA Install

- [ ] iPhone Safari shows **Add to Home Screen**.
- [ ] Android Chrome shows **Install app** or **Add to Home screen**.
- [ ] Installed app opens without browser tabs around it.
- [ ] App icon appears correctly.
- [ ] App title appears as `JCSU Map` or `JCSU Campus Navigation`.
- [ ] App still loads after closing and reopening from the home screen.

## Basic App Layout

- [ ] Header buttons are visible: Safety and Feedback.
- [ ] Map loads and is not blank.
- [ ] Search and Directions panel is visible on mobile.
- [ ] Panel can collapse, half-open, and fully open.
- [ ] Panel can be dragged without blocking map movement.
- [ ] Desktop layout shows map and sidebar without overlapping content.

## Search And Locations

- [ ] Search finds `Biddle`.
- [ ] Search finds `SAAC`.
- [ ] Search finds `IBC`.
- [ ] Search finds `Student Union`.
- [ ] Filters work for Academic, Services, Dining, Housing, Athletics, and Parking.
- [ ] Tapping a location opens the detail card.
- [ ] Detail card shows description, category, coordinates, and action buttons.
- [ ] X button returns to search results.

## Favorites And My Places

- [ ] Add a location to Favorites.
- [ ] Favorite appears in the Favorites rail.
- [ ] Remove Favorite works.
- [ ] Set a dorm as Home Dorm.
- [ ] Home Dorm appears in My Places.
- [ ] Set a building as Main Class Building.
- [ ] Main Class Building appears in My Places.
- [ ] My Places still appears after refreshing the page.

## Current Location And Tracking

- [ ] Set My Location asks for location permission.
- [ ] If permission is allowed, a current-location marker appears.
- [ ] If permission is blocked, a clear message appears.
- [ ] Live Tracking starts and updates the marker.
- [ ] Live Tracking can be stopped.
- [ ] Recenter moves the map back to current location.
- [ ] User can still pan away from the marker while live tracking is active.

## Directions

- [ ] Choose a start and destination manually.
- [ ] Get Directions shows a route line.
- [ ] Directions show walking time, distance, and segment count.
- [ ] Clear Route removes the route line.
- [ ] Set My Location can be used as the route start.
- [ ] Route to a selected building works from the detail card.

## Route Preferences

Test the same start and destination with each preference:

- [ ] Fastest route works.
- [ ] Accessible route works.
- [ ] Avoid roads when possible works.
- [ ] Prefer main sidewalks works.
- [ ] Route summary updates when preference changes.
- [ ] Route does not zoom out unexpectedly after preference changes.

## Route Issue Reporter

- [ ] Generate a route.
- [ ] Tap Report Route Issue.
- [ ] Feedback form opens.
- [ ] Type is set to Route issue.
- [ ] Start and destination are prefilled.
- [ ] Route preference, distance, and walking time are included in the message.
- [ ] Submit opens the Google Form.

## Safety Quick Actions

- [ ] Header Safety button opens the safety panel.
- [ ] Map Safety button opens the safety panel.
- [ ] Call 911 button is visible.
- [ ] Campus Police number is visible.
- [ ] Counseling number is visible.
- [ ] Health Center number is visible.
- [ ] Route to Campus Police sets the destination.
- [ ] Route to Counseling Center sets the destination.
- [ ] Route to Health Center sets the destination.
- [ ] Safety panel closes with X and by tapping outside the modal.

## Route Test Cases

Use this table to record route quality issues.

| Start | Destination | Preference | Expected | Actual | Pass? | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Henry J. Biddle Hall | Mary Joyce Taylor Crisp Memorial Student Union | Fastest |  |  |  |  |
| Student Athlete Achievement Center | Irwin Belk Complex | Fastest |  |  |  |  |
| James B. Duke Memorial Library | Cafeteria | Fastest |  |  |  |  |
| Home Dorm | Main Class Building | Fastest |  |  |  |  |
| Parking Area | Office of Admissions | Avoid roads |  |  |  |  |
| Campus Police | Health Center | Accessible |  |  |  |  |

## Bugs Found

| Issue | Device | Steps To Reproduce | Expected | Actual | Priority | Fixed? |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |
