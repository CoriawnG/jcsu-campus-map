const mapId = "1DIEHzvOP7u9UehtaCniXFbs5FMT0C3w";
const defaultMapUrl = `https://www.google.com/maps/d/embed?mid=${mapId}`;
const appIntro = document.querySelector("#appIntro");
const offlineBanner = document.querySelector("#offlineBanner");
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
const fromLocationSuggestions = document.querySelector("#fromLocationSuggestions");
const toLocationSuggestions = document.querySelector("#toLocationSuggestions");
const directionQuickPicks = document.querySelector("#directionQuickPicks");
const useMyLocationButton = document.querySelector("#useMyLocation");
const toggleLiveTrackingButton = document.querySelector("#toggleLiveTracking");
const toggleLiveTrackingMapButton = document.querySelector("#toggleLiveTrackingMap");
const recenterLocationMapButton = document.querySelector("#recenterLocationMap");
const openDirectionsPanelButton = document.querySelector("#openDirectionsPanel");
const closeDirectionsPanelButton = document.querySelector("#closeDirectionsPanel");
const getDirectionsButton = document.querySelector("#getDirections");
const clearRouteButton = document.querySelector("#clearRoute");
const directionsOutput = document.querySelector("#directionsOutput");
const routeStepNavigator = document.querySelector("#routeStepNavigator");
const gpsAccuracyBadge = document.querySelector("#gpsAccuracyBadge");
const mapLocationStatus = document.querySelector("#mapLocationStatus");
const bottomNavButtons = document.querySelectorAll("[data-app-nav]");
const routeSegmentCount = Array.isArray(window.pathSegments) ? window.pathSegments.length : 0;
const mapTabs = document.querySelectorAll(".map-tab");
const mapViews = document.querySelectorAll(".map-view");
const sidebar = document.querySelector(".sidebar");
const mobilePanelToggle = document.querySelector("#mobilePanelToggle");
const helpButton = document.querySelector("#helpButton");
const helpModal = document.querySelector("#helpModal");
const closeHelpButton = document.querySelector("#closeHelp");
const finishHelpButton = document.querySelector("#finishHelp");
const safetyButton = document.querySelector("#safetyButton");
const openSafetyPanelMapButton = document.querySelector("#openSafetyPanelMap");
const safetyModal = document.querySelector("#safetyModal");
const closeSafetyButton = document.querySelector("#closeSafety");
const safetyRouteButtons = document.querySelectorAll("[data-safety-route]");
const safetyNearestButtons = document.querySelectorAll("[data-safety-nearest]");
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
const helpSeenStorageKey = "jcsu-help-seen";
const maxRecentLocations = 8;

const routePreferenceLabels = {
  fastest: "Fastest route",
  accessible: "Accessible route",
  "avoid-roads": "Avoid roads",
  "main-sidewalks": "Main sidewalks"
};

const gpsAccuracyThresholds = {
  good: 20,
  usable: 35,
  weak: 65,
  maxTrusted: 120
};

const locationContacts = {
  "Henry J. Biddle Hall": [
    { label: "Admissions", phone: "704.378.1010", description: "First floor admissions support" },
    { label: "Financial Aid", phone: "704.378.1035", description: "Second floor financial aid questions" },
    { label: "Student Accounts", phone: "704.378.1145", description: "Third floor billing and student account questions" }
  ],
  "Administrative Cottage #4 (Campus Police)": [
    { label: "Campus Police", phone: "704.378.1003", description: "Campus safety, security, and emergency support" }
  ],
  "Administrative Cottage #3 (Counseling Center)": [
    { label: "Counseling Services", phone: "704.378.1044", description: "Counseling appointments and student support" }
  ],
  "JCSU Health Center": [
    { label: "Health Center", phone: "704.378.1075", description: "Student health services and wellness support" }
  ],
  "Wilbert Greenfield Residence Hall": [
    { label: "Greenfield Residence Hall", phone: "704.378.1231", description: "Residence hall contact" }
  ],
  "James B. Duke Memorial Hall": [
    { label: "Honors College Residence Hall", phone: "704.378.1253", description: "Residence hall contact" }
  ],
  "New Residence Hall": [
    { label: "New Residence Hall", phone: "704.378.6819", description: "Residence hall contact" }
  ]
};
const locationHours = {
  "Administrative Cottage #4 (Campus Police)": {
    label: "Campus Police",
    alwaysOpen: true,
    source: "JCSU lists Campus Police as operating 24 hours a day, 7 days a week."
  },
  "Administrative Cottage #3 (Counseling Center)": {
    label: "Counseling Center",
    weekly: {
      1: [[480, 1020]],
      2: [[480, 1020]],
      3: [[480, 1020]],
      4: [[480, 1020]],
      5: [[480, 1020]]
    },
    source: "JCSU Counseling Center hours: Monday-Friday, 8 a.m.-5 p.m.; evening sessions by appointment."
  },
  "JCSU Health Center": {
    label: "Health Center",
    weekly: {
      1: [[540, 780], [840, 1080]],
      2: [[540, 780], [840, 1080]],
      3: [[540, 780], [840, 1080]],
      4: [[540, 780], [840, 1080]],
      5: [[540, 780]]
    },
    source: "JCSU Health Center hours: Monday-Thursday 9 a.m.-6 p.m. closed 1-2 p.m.; Friday 9 a.m.-1 p.m."
  },
  "James B. Duke Memorial Library": {
    label: "Library Fall/Spring Hours",
    weekly: {
      0: [[840, 1440]],
      1: [[450, 1440]],
      2: [[450, 1380]],
      3: [[450, 1380]],
      4: [[450, 1380]],
      5: [[450, 1020]],
      6: [[600, 840]]
    },
    source: "Library posted fall/spring hours; hours may change during breaks, exams, and summer."
  },
  "Henry J. Biddle Hall": {
    label: "Admissions / Financial Aid / Student Accounts",
    source: "Office hours were not confirmed in the app data. Call the office before visiting."
  },
  "Mary Joyce Taylor Crisp Memorial Student Union": {
    label: "Student Union dining and services",
    source: "Food, lounge, bookstore, and student-service hours may vary by semester. Check posted campus hours."
  },
  "Cafeteria": {
    label: "Cafeteria",
    source: "Dining hours vary by semester and meal period. Check posted campus dining hours."
  },
  "KoKoMo's Coffeehouse": {
    label: "KoKoMo's Coffeehouse",
    source: "Coffeehouse hours may vary by semester. Check posted campus dining hours."
  }
};

const locationDetailProfiles = {
  "Band and Music Hall": {
    aliases: ["Music Building", "Band Building"],
    highlights: ["Music classes", "Band rehearsal", "Performance preparation"],
    notes: ["Use this location for music, band, rehearsal, and arts-related academic activity."],
    arrivalTip: "Look for the academic building marker near the north side of campus."
  },
  "Dorothy Cowser Yancy Technology Center": {
    aliases: ["Yancy Tech", "DCYTC", "Technology Center"],
    highlights: ["Computer labs", "Technology classrooms", "Digital learning spaces"],
    notes: ["Helpful for technology-focused classes, computer access, and digital coursework."],
    arrivalTip: "Use this building when searching for tech, computer lab, or Yancy."
  },
  "George E. Davis Hall": {
    aliases: ["Davis Hall"],
    highlights: ["Classrooms", "Student support", "Technology functions"],
    notes: ["Academic building connected to classroom and student support functions."]
  },
  "Henry J. Biddle Hall": {
    aliases: ["Biddle", "Admissions Building"],
    highlights: ["Admissions", "Financial Aid", "Student Accounts", "Housing Support", "Campus Pantry"],
    floors: [
      { label: "Basement", items: ["Housing Support", "Campus Pantry"] },
      { label: "First Floor", items: ["Office of Admissions"] },
      { label: "Second Floor", items: ["Financial Aid"] },
      { label: "Third Floor", items: ["Student Accounts"] }
    ],
    notes: ["Use this building for admissions, aid, account questions, housing help, and student pantry support."],
    arrivalTip: "If you are visiting an office, check the floor note first so you know where to go after entering."
  },
  "Mary Joyce Taylor Crisp Memorial Student Union": {
    aliases: ["Student Union", "Crisp Union", "MJTCMSU"],
    highlights: ["Grimes Lounge", "Lorraine's", "Bull Pen", "Pizza Hut", "Bookstore"],
    floors: [
      { label: "Top Floor", items: ["Grimes Lounge"] },
      { label: "Middle Floor", items: ["Lorraine's soul food buffet"] },
      { label: "Bottom Floor", items: ["Bull Pen", "Pizza Hut", "Bookstore"] }
    ],
    notes: ["Student life hub for food, gathering, lounge space, and bookstore access."],
    arrivalTip: "Pizza Hut is inside the Bull Pen on the bottom floor."
  },
  "Irwin Belk Complex": {
    aliases: ["IBC", "Belk Complex"],
    highlights: ["Football", "Track", "Athletics", "Classes", "Health and Human Performance spaces"],
    notes: ["This is both an athletics facility and an academic/class meeting location."],
    arrivalTip: "Use IBC in search if you want the shorter nickname."
  },
  "Administrative Cottage #4 (Campus Police)": {
    aliases: ["Campus Police", "Police Cottage"],
    highlights: ["Campus Police", "Safety support", "Emergency response"],
    notes: ["Use this location for campus safety support and public safety questions."],
    arrivalTip: "For emergencies, call first. Directions are useful after you are safe."
  },
  "JCSU Health Center": {
    aliases: ["Health Center"],
    highlights: ["Student health services", "Wellness support"],
    notes: ["Health services are listed as located inside the Mary Joyce Taylor Crisp Memorial Student Union."]
  },
  "Administrative Cottage #3 (Counseling Center)": {
    aliases: ["Counseling Center"],
    highlights: ["Counseling appointments", "Student support"],
    notes: ["Use this location for counseling services and student support needs."]
  },
  "Student Athlete Achievement Center": {
    aliases: ["SAAC", "Student Athlete Center"],
    highlights: ["Student-athlete academic support", "Advising", "Study support", "Athletics support"],
    notes: ["Useful for student-athletes looking for academic and athletic department support."],
    arrivalTip: "SAAC is a common nickname students may use in search."
  },
  "James B. Duke Memorial Library": {
    aliases: ["Library", "Duke Library"],
    highlights: ["Study space", "Research help", "Printing", "Archives", "Group study"],
    notes: ["Best stop for studying, research, printing, technology access, and academic resources."]
  },
  "New Science Center (STEM)": {
    aliases: ["STEM", "Science Center", "New Science"],
    highlights: ["Science classrooms", "Teaching labs", "Faculty offices", "STEM learning"],
    notes: ["Use this for biology, chemistry, lab, and STEM-related academic activity."]
  },
  "Old Science Building": {
    aliases: ["Old Science"],
    highlights: ["Former science space", "Campus reference point"],
    notes: ["Current use should be verified before relying on this as an active academic destination."]
  },
  "Metropolitan College": {
    aliases: ["Metro College", "Albright Hall"],
    highlights: ["Metropolitan College", "Adult degree support", "Evening or online programs", "Student support"],
    notes: ["This replaces the old Robert L. Albright Hall label in the app."]
  },
  "Jack S. Brayboy Gymnasium": {
    aliases: ["Brayboy Gym", "JBG"],
    highlights: ["Basketball", "Indoor athletics", "Events", "Physical education"],
    notes: ["Indoor athletics and event facility used by students and athletics."]
  },
  "Jack S. Brayboy HealthPlex": {
    aliases: ["HealthPlex", "Brayboy HealthPlex"],
    highlights: ["Fitness", "Wellness", "Exercise", "Recreation"],
    notes: ["Useful for workout, wellness, and recreation-related searches."]
  },
  "Wilbert Greenfield Residence Hall": {
    aliases: ["Greenfield", "Greenfield Hall"],
    highlights: ["Freshman female housing", "Residence Life", "Dorm navigation"],
    notes: ["Listed in the app as an active freshman female residence hall."]
  },
  "Myers Hall": {
    aliases: ["Myers"],
    highlights: ["Freshman male housing", "Residence Life", "Dorm navigation"],
    notes: ["Listed in the app as an active freshman male residence hall."]
  },
  "New Residence Hall": {
    aliases: ["New Res", "NRH"],
    highlights: ["Suite-style housing", "Residence Life", "Student living"],
    notes: ["Useful for students navigating to suite-style residence housing."]
  },
  "James B. Duke Memorial Hall": {
    aliases: ["Duke Hall", "Honors Dorm"],
    highlights: ["Residence hall", "Honors housing", "Campus living"],
    notes: ["Residence hall connected to student housing and campus living."]
  },
  "Mosaic Village": {
    aliases: ["Mosaic"],
    highlights: ["Student apartments", "Mixed-use housing", "Campus living"],
    notes: ["Student apartment and mixed-use housing complex."]
  },
  "The Block": {
    aliases: ["Block"],
    highlights: ["Student hangout", "Meeting spot", "Campus reference point"],
    notes: ["Student-known campus area used as a common meeting place and navigation reference."]
  }
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
let rawCurrentPosition = null;
let recentGpsPositions = [];
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
let sheetSwipeStartY = 0;
let sheetSwipeStartX = 0;
let sheetSwipeStartedAt = 0;
let sheetSwipeStartTranslate = 0;
let sheetSwipeLatestTranslate = 0;
let sheetSwipeMoved = false;
let lastRouteSignature = "";
let shouldFitRouteToMap = true;
let latestRoutePreview = null;
let latestDirectionSteps = [];
let routeInstructionPoints = [];
let activeRouteStepIndex = 0;
let isGuidedNavigationActive = false;
let routeStartManuallyChanged = false;

let introDismissTimer = null;
let introHiddenAt = 0;
const introReplayDelayMs = 900;


function updateOfflineBanner() {
  if (!offlineBanner) {
    return;
  }

  const isOffline = navigator.onLine === false;
  offlineBanner.hidden = !isOffline;
  document.body.classList.toggle("is-offline", isOffline);
}
function dismissAppIntro() {
  if (!appIntro || appIntro.hidden || appIntro.classList.contains("is-dismissing")) {
    return;
  }

  appIntro.classList.add("is-dismissing");
  document.body.classList.remove("intro-running");

  window.setTimeout(() => {
    appIntro.hidden = true;
  }, 560);
}

function playAppIntro() {
  if (!appIntro) {
    return;
  }

  window.clearTimeout(introDismissTimer);
  appIntro.hidden = false;
  appIntro.classList.remove("is-dismissing");
  appIntro.style.animation = "none";
  appIntro.offsetHeight;
  appIntro.style.animation = "";
  document.body.classList.add("intro-running");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  introDismissTimer = window.setTimeout(dismissAppIntro, prefersReducedMotion ? 600 : 2850);
}

function initializeAppIntro() {
  if (!appIntro) {
    return;
  }

  playAppIntro();
  appIntro.addEventListener("click", () => {
    window.clearTimeout(introDismissTimer);
    dismissAppIntro();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      introHiddenAt = Date.now();
      window.clearTimeout(introDismissTimer);
      return;
    }

    if (Date.now() - introHiddenAt >= introReplayDelayMs) {
      playAppIntro();
    }
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      playAppIntro();
    }
  });
}

function hasSeenHelp() {
  try {
    return localStorage.getItem(helpSeenStorageKey) === "true";
  } catch (error) {
    return false;
  }
}

function markHelpSeen() {
  try {
    localStorage.setItem(helpSeenStorageKey, "true");
  } catch (error) {
    // Help can still close if storage is blocked.
  }
}

function openHelpModal(options = {}) {
  if (!helpModal) {
    return;
  }

  helpModal.hidden = false;
  document.body.classList.add("modal-open");

  if (options.markSeen !== false) {
    markHelpSeen();
  }

  closeHelpButton?.focus();
}

function closeHelpModal() {
  if (!helpModal) {
    return;
  }

  helpModal.hidden = true;
  document.body.classList.remove("modal-open");
  markHelpSeen();
}

function showFirstTimeHelp() {
  if (!hasSeenHelp()) {
    openHelpModal();
  }
}
function openSafetyModal() {
  safetyModal.hidden = false;
  document.body.classList.add("modal-open");
  closeSafetyButton.focus();
}

function closeSafetyModal() {
  safetyModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function getDistanceBetweenPoints(pointA, pointB) {
  const milesPerDegreeLat = 69;
  const milesPerDegreeLng = 69 * Math.cos((pointA.lat * Math.PI) / 180);
  const latMiles = (pointB.lat - pointA.lat) * milesPerDegreeLat;
  const lngMiles = (pointB.lng - pointA.lng) * milesPerDegreeLng;
  return Math.sqrt(latMiles ** 2 + lngMiles ** 2);
}

function getGpsAccuracyLevel(accuracy) {
  if (!Number.isFinite(accuracy)) {
    return { label: "Waiting for GPS", className: "is-waiting", isReliable: false };
  }

  if (accuracy <= gpsAccuracyThresholds.good) {
    return { label: "Precise", className: "is-good", isReliable: true };
  }

  if (accuracy <= gpsAccuracyThresholds.usable) {
    return { label: "Usable", className: "is-usable", isReliable: true };
  }

  if (accuracy <= gpsAccuracyThresholds.weak) {
    return { label: "Weak", className: "is-weak", isReliable: false };
  }

  return { label: "Low accuracy", className: "is-poor", isReliable: false };
}

function updateGpsAccuracyBadge() {
  if (!gpsAccuracyBadge) {
    return;
  }

  if (!rawCurrentPosition) {
    gpsAccuracyBadge.hidden = true;
    gpsAccuracyBadge.textContent = "";
    return;
  }

  const accuracy = Math.round(rawCurrentPosition.accuracy || 0);
  const level = getGpsAccuracyLevel(accuracy);
  gpsAccuracyBadge.hidden = false;
  gpsAccuracyBadge.classList.remove("is-good", "is-usable", "is-weak", "is-poor", "is-waiting");
  gpsAccuracyBadge.classList.add(level.className);
  gpsAccuracyBadge.innerHTML = `<strong>${level.label}</strong><span>${accuracy}m GPS</span>`;
}

function getAccuracyGuidance(accuracy) {
  const level = getGpsAccuracyLevel(accuracy);

  if (level.isReliable) {
    return "";
  }

  return "<br>For better precision, step outside or near a window and wait a few seconds.";
}

function getNearestSafetyLocation(type) {
  const origin = currentPosition || { lat: jcsuCenter[0], lng: jcsuCenter[1] };
  const candidates = locations.filter((location) => {
    if (type === "entrance") {
      return location.name.toLowerCase().includes("entrance");
    }

    if (type === "parking") {
      return location.layer === "Parking and Transportation" && location.name.toLowerCase().includes("parking");
    }

    return false;
  });

  return candidates.reduce((nearest, location) => {
    if (!nearest) {
      return location;
    }

    return getDistanceBetweenPoints(origin, location) < getDistanceBetweenPoints(origin, nearest) ? location : nearest;
  }, null);
}

function routeToNearestSafetyLocation(type) {
  const location = getNearestSafetyLocation(type);

  if (!location) {
    setLocationStatus("Nearest safety location is unavailable right now.", { isError: true });
    closeSafetyModal();
    return;
  }

  routeToSafetyLocation(location.name);
}
function routeToSafetyLocation(locationName) {
  const location = locations.find((item) => item.name === locationName);

  if (!location) {
    closeSafetyModal();
    setLocationStatus(`Safety location unavailable: ${locationName}`, { isError: true });
    expandMobilePanel();
    return;
  }

  closeSafetyModal();
  activeLocationName = location.name;
  activeLocationIndex = location.index;
  toLocationSelect.value = getLocationInputValue(location);
  saveRecentLocation(location);
  renderSelectedLocation(location);
  renderLocations(getFilteredLocations());
  renderNavigationMarkers(getFilteredLocations());
  focusMapOnLocation(location);

  if (fromLocationSelect.value) {
    shouldFitRouteToMap = true;
    renderDirectionsPreview();
  } else {
    directionsOutput.innerHTML = `<strong>Destination set:</strong> ${location.name}. Choose a starting point or tap Set My Location.`;
    openDirectionsPanel();
  }
}
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

function getRouteIssueStepSummary(route) {
  if (!route?.steps?.length) {
    return "No step data available";
  }

  const uniqueNames = [];

  route.steps.forEach((step) => {
    if (step.name && uniqueNames[uniqueNames.length - 1] !== step.name) {
      uniqueNames.push(step.name);
    }
  });

  return uniqueNames.slice(0, 8).join(" -> ") || "Unnamed campus paths";
}

function openRouteIssueReporter(route, routePreferenceLabel, issueType = "") {
  const start = getLocationBySelectValue(fromLocationSelect.value);
  const end = getLocationBySelectValue(toLocationSelect.value);
  const selectedLocationName = activeLocationName || end?.name || "";
  const routeSummary = route
    ? `${routePreferenceLabel}; ${route.distanceText}; about ${route.minutes} minute${route.minutes === 1 ? "" : "s"}; ${route.graphEdgeCount} path segments`
    : routePreferenceLabel;
  const stepSummary = getRouteIssueStepSummary(route);

  openFeedbackModal({
    type: "Route issue",
    location: selectedLocationName,
    routeStart: start?.name || "",
    routeDestination: end?.name || "",
    status: "Route details added. Describe what needs fixing, then submit.",
    message: [
      `Issue type: ${issueType || "Describe the route problem"}`,
      `Route preference: ${routeSummary}`,
      `Route path shown: ${stepSummary}`,
      "",
      "What should be fixed: ",
      "Where does the problem happen: "
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

function setMapButtonContent(button, iconName, label) {
  if (!button) {
    return;
  }

  button.setAttribute("aria-label", label);
  button.title = label;
  button.innerHTML = `
    <span class="material-symbols-outlined" aria-hidden="true">${iconName}</span>
    <span class="visually-hidden">${label}</span>
  `;
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

const mainClassLocationNames = new Set([
  "Band and Music Hall",
  "Dorothy Cowser Yancy Technology Center",
  "George E. Davis Hall",
  "Henry Lawrence McCrorey Memorial Hall",
  "Irwin Belk Complex",
  "Lionel H. Newsom Humanities Hall",
  "Metropolitan College",
  "New Science Center (STEM)",
  "Old Science Building",
  "Rufus R. Perry Hall",
  "William F. Johnson & James W. Seabrook Hall"
]);

function canSaveAsHomeDorm(location) {
  return location.layer === "Housing";
}

function canSaveAsMainClass(location) {
  return mainClassLocationNames.has(location.name);
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

function removePersonalPlace(type) {
  try {
    const savedPlaces = getPersonalPlaceIndexes();
    savedPlaces[type] = null;
    localStorage.setItem(personalPlacesStorageKey, JSON.stringify(savedPlaces));
  } catch (error) {
    // Removing a shortcut is optional; routing still works if storage is blocked.
  }
}

function renderPersonalLocations() {
  if (!personalLocationsContainer) {
    return;
  }

  const savedPlaces = getPersonalPlaceIndexes();
  const personalPlaces = [
    savedPlaces.homeDorm !== null
      ? { type: "homeDorm", label: "Home Dorm", icon: "home", location: locations[savedPlaces.homeDorm] }
      : null,
    savedPlaces.mainClass !== null
      ? { type: "mainClass", label: "Main Class Building", icon: "school", location: locations[savedPlaces.mainClass] }
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
    const card = document.createElement("div");
    card.className = "recent-location-button personal-location-button";
    card.innerHTML = `
      <button class="personal-location-select" type="button" aria-label="Open ${place.location.name}">
        <span class="material-symbols-outlined location-icon" aria-hidden="true">${place.icon}</span>
        <span class="personal-location-copy">
          <strong>${place.location.name}</strong>
          <span>${place.label}</span>
        </span>
      </button>
      <button class="personal-location-remove" type="button" data-remove-personal="${place.type}" aria-label="Remove ${place.label}">
        <span class="material-symbols-outlined" aria-hidden="true">close</span>
      </button>
    `;

    card.querySelector(".personal-location-select").addEventListener("click", () => selectLocation(place.location));
    card.querySelector("[data-remove-personal]").addEventListener("click", () => {
      removePersonalPlace(place.type);
      renderPersonalLocations();
      renderDirectionQuickPicks();
      if (activeLocationIndex === place.location.index) {
        renderSelectedLocation(place.location);
      }
    });

    rail.appendChild(card);
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

function selectLocation(location, options = {}) {
  activeLocationName = location.name;
  activeLocationIndex = location.index;
  saveRecentLocation(location);

  if (options.showDetails) {
    renderSelectedLocation(location);
    expandMobilePanel();
  } else {
    renderLocationPreview(location);
    halfOpenMobilePanel();
  }

  focusMapOnLocation(location);
  renderLocations(getFilteredLocations());
  renderNavigationMarkers(getFilteredLocations());
}

function getShortDescription(text, maxLength = 118) {
  const cleanText = String(text || "").trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return `${cleanText.slice(0, maxLength).trim()}...`;
}

function renderLocationPreview(location) {
  const isFavorite = isFavoriteLocation(location);
  const hoursStatus = getLocationHoursStatus(location);

  setActiveBottomNav("explore");
  sidebar.classList.remove("directions-detail-active");
  sidebar.classList.add("location-detail-active", "location-preview-active");
  selectedLocation.innerHTML = `
    <article class="place-preview-card" aria-label="${location.name} preview">
      <div class="place-preview-header">
        <span class="material-symbols-outlined location-icon" aria-hidden="true">${getLocationIcon(location)}</span>
        <div class="place-preview-title">
          <p class="eyebrow">Selected Location</p>
          <h2>${location.name}</h2>
          <div class="detail-meta place-preview-meta">
            <span class="tag">${location.category}</span>
            <span class="tag hours-badge ${hoursStatus.className}">${hoursStatus.label}</span>
          </div>
        </div>
        <button id="closeLocationPreview" class="icon-button" type="button" aria-label="Back to search">x</button>
      </div>
      <p class="place-preview-description">${getShortDescription(location.description)}</p>
      <div class="place-preview-actions">
        <button class="primary-button" type="button" data-preview-action="directions">
          <span class="material-symbols-outlined" aria-hidden="true">directions</span>
          Directions
        </button>
        <button class="secondary-button" type="button" data-preview-action="favorite">
          <span class="material-symbols-outlined" aria-hidden="true">${isFavorite ? "star" : "star_border"}</span>
          ${isFavorite ? "Saved" : "Save"}
        </button>
        <button class="secondary-button" type="button" data-preview-action="details">
          <span class="material-symbols-outlined" aria-hidden="true">info</span>
          More Info
        </button>
      </div>
    </article>
  `;

  selectedLocation.querySelector("#closeLocationPreview").addEventListener("click", showSearchPanel);
  selectedLocation.querySelector('[data-preview-action="directions"]').addEventListener("click", () => {
    setRouteEndpoint("destination", location, { openDirections: true });
  });
  selectedLocation.querySelector('[data-preview-action="favorite"]').addEventListener("click", () => {
    toggleFavoriteLocation(location);
    renderLocationPreview(location);
    renderLocations(getFilteredLocations());
    renderDirectionQuickPicks();
  });
  selectedLocation.querySelector('[data-preview-action="details"]').addEventListener("click", () => {
    renderSelectedLocation(location);
    expandMobilePanel();
  });
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

function getLocationInputValue(location) {
  const duplicateNameCount = locations.filter((item) => item.name === location.name).length;
  return duplicateNameCount > 1
    ? `${location.name} - ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
    : location.name;
}

function normalizeRouteInput(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDirectionQuickPickItems() {
  const savedPlaces = getPersonalPlaceIndexes();
  const favoriteIndexes = getFavoriteLocationIndexes();
  const items = [];
  const usedIndexes = new Set();

  const addItem = (label, icon, location) => {
    if (!location || usedIndexes.has(location.index)) {
      return;
    }

    usedIndexes.add(location.index);
    items.push({ label, icon, location });
  };

  addItem("Home Dorm", "home", locations[savedPlaces.homeDorm]);
  addItem("Main Class", "school", locations[savedPlaces.mainClass]);
  favoriteIndexes.forEach((index) => addItem("Favorite", "star", locations[index]));

  return items;
}

function renderDirectionQuickPicks() {
  if (!directionQuickPicks) {
    return;
  }

  const quickPickItems = getDirectionQuickPickItems();

  if (!quickPickItems.length) {
    directionQuickPicks.hidden = true;
    directionQuickPicks.innerHTML = "";
    return;
  }

  directionQuickPicks.hidden = false;
  directionQuickPicks.innerHTML = `
    <div class="rail-heading compact-rail-heading">
      <h3>Quick Picks</h3>
    </div>
    <div class="direction-quick-pick-list" aria-label="Saved route shortcuts"></div>
  `;

  const list = directionQuickPicks.querySelector(".direction-quick-pick-list");

  quickPickItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "direction-quick-pick-row";
    row.innerHTML = `
      <span class="material-symbols-outlined location-icon" aria-hidden="true">${item.icon}</span>
      <span class="direction-quick-pick-copy">
        <strong>${item.location.name}</strong>
        <span>${item.label}</span>
      </span>
      <span class="direction-quick-pick-actions">
        <button class="secondary-button" type="button" data-route-pick="start">From</button>
        <button class="secondary-button" type="button" data-route-pick="destination">To</button>
      </span>
    `;

    row.querySelector('[data-route-pick="start"]').addEventListener("click", () => {
      setRouteEndpoint("start", item.location, { openDirections: true });
    });

    row.querySelector('[data-route-pick="destination"]').addEventListener("click", () => {
      setRouteEndpoint("destination", item.location, { openDirections: true });
    });

    list.appendChild(row);
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
  const profile = getLocationDetailProfile(location);

  return [
    location.name,
    location.layer,
    location.category,
    location.description,
    ...location.keywords,
    ...(profile.aliases || []),
    ...(profile.highlights || [])
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

function setActiveBottomNav(target) {
  bottomNavButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.appNav === target);
  });
}

function scrollPanelToTop() {
  if (sidebar) {
    sidebar.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function scrollPanelToSavedPlaces() {
  const target = personalLocationsContainer && !personalLocationsContainer.hidden
    ? personalLocationsContainer
    : favoriteLocationsContainer && !favoriteLocationsContainer.hidden
      ? favoriteLocationsContainer
      : recentLocationsContainer;

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function openExploreView() {
  setActiveBottomNav("explore");
  showSearchPanel();
  setMobilePanelState(isMobilePanelEnabled() ? "half" : "full");
  scrollPanelToTop();
}

function openSavedView() {
  setActiveBottomNav("saved");
  showSearchPanel();
  searchInput.value = "";
  activeLayer = "All";
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.layer === "All");
  });
  renderLocations(getFilteredLocations());
  setMobilePanelState("full");
  window.setTimeout(scrollPanelToSavedPlaces, 80);
}

function openDirectionsView() {
  setActiveBottomNav("directions");
  openDirectionsPanel({ preservePanelState: true });
  setMobilePanelState("full");
}

function handleBottomNavigation(event) {
  const target = event.currentTarget.dataset.appNav;

  if (target === "explore") {
    openExploreView();
    return;
  }

  if (target === "directions") {
    openDirectionsView();
    return;
  }

  if (target === "saved") {
    openSavedView();
    return;
  }

  if (target === "safety") {
    setActiveBottomNav("safety");
    openSafetyModal();
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

function openDirectionsPanel(options = {}) {
  setActiveBottomNav("directions");
  renderDirectionQuickPicks();
  sidebar.classList.add("directions-detail-active");
  sidebar.classList.remove("location-detail-active", "location-preview-active");

  if (options.preservePanelState && isMobilePanelEnabled()) {
    const currentPanelState = sidebar.dataset.panelState || "full";
    document.body.classList.toggle("directions-panel-open", currentPanelState !== "collapsed");
  } else {
    setMobilePanelState(isMobilePanelEnabled() ? "half" : "full");
  }

  setTimeout(() => {
    if (navigationMap) {
      navigationMap.invalidateSize();
    }
  }, 0);
}

function closeDirectionsPanel() {
  sidebar.classList.remove("directions-detail-active");

  if (activeLocationIndex >= 0) {
    sidebar.classList.add("location-detail-active");
  } else {
    sidebar.classList.remove("location-detail-active");
  }

  setMobilePanelState("full");
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

function getSwipePoint(event) {
  const touch = event.changedTouches?.[0] || event.touches?.[0];
  return touch || event;
}

function startSheetSwipe(event) {
  if (!isMobilePanelEnabled() || sidebar.dataset.panelState !== "half") {
    return;
  }

  const point = getSwipePoint(event);
  sheetSwipeStartY = point.clientY;
  sheetSwipeStartX = point.clientX;
  sheetSwipeStartedAt = Date.now();
  sheetSwipeStartTranslate = getCurrentPanelTranslate();
  sheetSwipeLatestTranslate = sheetSwipeStartTranslate;
  sheetSwipeMoved = false;
}

function moveSheetSwipe(event) {
  if (!sheetSwipeStartedAt || !isMobilePanelEnabled() || sidebar.dataset.panelState !== "half") {
    return;
  }

  const point = getSwipePoint(event);
  const deltaY = point.clientY - sheetSwipeStartY;
  const deltaX = Math.abs(point.clientX - sheetSwipeStartX);

  if (Math.abs(deltaY) < 8 || Math.abs(deltaY) < deltaX) {
    return;
  }

  event.preventDefault();
  sheetSwipeMoved = true;

  const maxTranslate = getPanelStateTranslate("collapsed");
  sheetSwipeLatestTranslate = Math.max(0, Math.min(maxTranslate, sheetSwipeStartTranslate + deltaY));
  sidebar.classList.add("is-dragging");
  sidebar.style.transform = `translateY(${sheetSwipeLatestTranslate}px)`;
}

function endSheetSwipe(event) {
  if (!sheetSwipeStartedAt || !isMobilePanelEnabled() || sidebar.dataset.panelState !== "half") {
    sheetSwipeStartedAt = 0;
    return;
  }

  const point = getSwipePoint(event);
  const deltaY = point.clientY - sheetSwipeStartY;
  const deltaX = Math.abs(point.clientX - sheetSwipeStartX);
  const elapsed = Date.now() - sheetSwipeStartedAt;
  sheetSwipeStartedAt = 0;
  sidebar.classList.remove("is-dragging");
  sidebar.style.transform = "";

  if (sheetSwipeMoved) {
    setMobilePanelState(getNearestPanelState(sheetSwipeLatestTranslate));
  } else if (deltaY < -34 && Math.abs(deltaY) > deltaX && elapsed < 900) {
    setMobilePanelState("full");
  }

  sheetSwipeMoved = false;
}

function focusMapOnLocation(location) {
  focusNavigationMapOnLocation(location);
}

function showSearchPanel() {
  setActiveBottomNav("explore");
  sidebar.classList.remove("location-detail-active", "directions-detail-active", "location-preview-active");
  activeLocationName = "";
  activeLocationIndex = -1;
  renderLocations(getFilteredLocations());
  renderNavigationMarkers(getFilteredLocations());
}

function getPhoneHref(phone) {
  const digits = String(phone).replace(/\D/g, "");
  const tenDigitNumber = digits.length > 10 ? digits.slice(-10) : digits;
  return `tel:+1${tenDigitNumber}`;
}

function getLocationHoursProfile(location) {
  return locationHours[location.name] || null;
}

function formatHoursTime(minutes) {
  if (minutes === 1440) {
    return "12 a.m.";
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "p.m." : "a.m.";
  const displayHour = hours % 12 || 12;
  const displayMinutes = mins ? `:${String(mins).padStart(2, "0")}` : "";
  return `${displayHour}${displayMinutes} ${period}`;
}

function formatHoursWindows(windows) {
  if (!windows?.length) {
    return "Closed today";
  }

  return windows
    .map(([start, end]) => `${formatHoursTime(start)}-${formatHoursTime(end)}`)
    .join(", ");
}

function getLocationHoursStatus(location, date = new Date()) {
  const profile = getLocationHoursProfile(location);

  if (!profile) {
    return {
      label: "Hours Unknown",
      className: "unknown",
      heading: "Hours Unknown",
      today: "Hours are not listed yet for this location.",
      note: "Use the building details or campus contact information to verify before visiting."
    };
  }

  if (profile.alwaysOpen) {
    return {
      label: "Open 24/7",
      className: "open",
      heading: profile.label,
      today: "Open 24 hours today",
      note: profile.source
    };
  }

  if (!profile.weekly) {
    return {
      label: "Hours Unknown",
      className: "unknown",
      heading: profile.label,
      today: "Hours need to be verified.",
      note: profile.source
    };
  }

  const day = date.getDay();
  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  const windows = profile.weekly[day] || [];
  const activeWindow = windows.find(([start, end]) => nowMinutes >= start && nowMinutes < end);
  const nextWindow = windows.find(([start]) => nowMinutes < start);

  return {
    label: activeWindow ? "Open Now" : "Closed",
    className: activeWindow ? "open" : "closed",
    heading: profile.label,
    today: `${formatHoursWindows(windows)}${!activeWindow && nextWindow ? `; opens at ${formatHoursTime(nextWindow[0])}` : ""}`,
    note: profile.source
  };
}

function getLocationHoursMarkup(location) {
  const status = getLocationHoursStatus(location);

  return `
    <section class="detail-section detail-hours-section">
      <h3>Hours</h3>
      <div class="hours-status-row">
        <span class="hours-status-dot ${status.className}" aria-hidden="true"></span>
        <strong>${status.heading}</strong>
      </div>
      <p><strong>Today:</strong> ${status.today}</p>
      <p>${status.note}</p>
    </section>
  `;
}
function getLocationDetailProfile(location) {
  return locationDetailProfiles[location.name] || {};
}

function getDetailListMarkup(items) {
  if (!items?.length) {
    return "";
  }

  return `
    <ul class="detail-chip-list">
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function getAliasMarkup(profile) {
  if (!profile.aliases?.length) {
    return "";
  }

  return `
    <section class="detail-section detail-alias-section">
      <h3>Also Known As</h3>
      ${getDetailListMarkup(profile.aliases)}
    </section>
  `;
}

function getHighlightsMarkup(profile) {
  if (!profile.highlights?.length) {
    return "";
  }

  return `
    <section class="detail-section">
      <h3>Inside This Location</h3>
      ${getDetailListMarkup(profile.highlights)}
    </section>
  `;
}

function getFloorNotesMarkup(profile) {
  if (!profile.floors?.length) {
    return "";
  }

  return `
    <section class="detail-section">
      <h3>Floor / Office Notes</h3>
      <div class="detail-floor-list">
        ${profile.floors.map((floor) => `
          <div class="detail-floor-row">
            <strong>${floor.label}</strong>
            <span>${floor.items.join(", ")}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function getDetailNotesMarkup(profile) {
  if (!profile.notes?.length) {
    return "";
  }

  return `
    <section class="detail-section detail-note-section">
      <h3>Notes</h3>
      ${profile.notes.map((note) => `<p>${note}</p>`).join("")}
    </section>
  `;
}

function getArrivalTipMarkup(profile) {
  if (!profile.arrivalTip) {
    return "";
  }

  return `
    <section class="detail-section detail-arrival-section">
      <h3>Arrival Tip</h3>
      <p>${profile.arrivalTip}</p>
    </section>
  `;
}

function getLocationContactMarkup(location) {
  const contacts = locationContacts[location.name] || [];

  if (!contacts.length) {
    return "";
  }

  const contactRows = contacts.map((contact) => `
    <a class="contact-call-row" href="${getPhoneHref(contact.phone)}" aria-label="Call ${contact.label} at ${contact.phone}">
      <span class="material-symbols-outlined contact-call-icon" aria-hidden="true">call</span>
      <span class="contact-call-copy">
        <strong>Call ${contact.label}</strong>
        <span>${contact.description} &middot; ${contact.phone}</span>
      </span>
    </a>
  `).join("");

  return `
    <section class="detail-section detail-contact-section">
      <h3>Phone Contacts</h3>
      <div class="detail-contact-list" aria-label="Phone contacts for ${location.name}">
        ${contactRows}
      </div>
    </section>
  `;
}

function getPersonalActionMarkup(location, isHomeDorm, isMainClass) {
  const actions = [];

  if (canSaveAsHomeDorm(location) || isHomeDorm) {
    actions.push(`
      <button class="secondary-button" type="button" data-personal-action="homeDorm" data-personal-mode="${isHomeDorm ? "remove" : "save"}">
        <span class="material-symbols-outlined" aria-hidden="true">home</span>
        ${isHomeDorm ? "Remove Home Dorm" : "Set Home Dorm"}
      </button>
    `);
  }

  if (canSaveAsMainClass(location) || isMainClass) {
    actions.push(`
      <button class="secondary-button" type="button" data-personal-action="mainClass" data-personal-mode="${isMainClass ? "remove" : "save"}">
        <span class="material-symbols-outlined" aria-hidden="true">school</span>
        ${isMainClass ? "Remove Main Class" : "Set Main Class"}
      </button>
    `);
  }

  return actions.join("");
}
function renderSelectedLocation(location) {
  const isFavorite = isFavoriteLocation(location);
  const savedPersonalPlaces = getPersonalPlaceIndexes();
  const isHomeDorm = savedPersonalPlaces.homeDorm === location.index;
  const isMainClass = savedPersonalPlaces.mainClass === location.index;
  const profile = getLocationDetailProfile(location);
  const aliasMarkup = getAliasMarkup(profile);
  const highlightsMarkup = getHighlightsMarkup(profile);
  const floorNotesMarkup = getFloorNotesMarkup(profile);
  const detailNotesMarkup = getDetailNotesMarkup(profile);
  const arrivalTipMarkup = getArrivalTipMarkup(profile);
  const contactMarkup = getLocationContactMarkup(location);
  const hoursMarkup = getLocationHoursMarkup(location);
  const hoursStatus = getLocationHoursStatus(location);
  const personalActionsMarkup = getPersonalActionMarkup(location, isHomeDorm, isMainClass);

  sidebar.classList.remove("directions-detail-active", "location-preview-active");
  sidebar.classList.add("location-detail-active");
  selectedLocation.innerHTML = `
    <div class="details-heading-row">
      <div>
        <p class="eyebrow">Selected Location</p>
        <h2>${location.name}</h2>
      </div>
      <button id="closeLocationDetails" class="icon-button" type="button" aria-label="Back to search">x</button>
    </div>
    <div class="detail-meta">
      <span class="tag">${location.layer}</span>
      <span class="tag">${location.category}</span>
      <span class="tag hours-badge ${hoursStatus.className}">${hoursStatus.label}</span>
    </div>
    <section class="detail-section detail-about-section">
      <h3>About</h3>
      <p>${location.description}</p>
    </section>
    ${aliasMarkup}
    ${highlightsMarkup}
    ${floorNotesMarkup}
    ${contactMarkup}
    ${detailNotesMarkup}
    ${arrivalTipMarkup}
    <section class="detail-section detail-location-section">
      <h3>Map Info</h3>
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
    </section>
    <section class="detail-section detail-actions-section">
      <h3>Actions</h3>
      <div class="location-actions">
        <button class="primary-button wide-action" type="button" data-route-action="destination">Get Directions</button>
        <button class="secondary-button" type="button" data-route-action="start">Use as Start</button>
        ${personalActionsMarkup}
        <button class="secondary-button wide-action" type="button" data-favorite-action>
          <span class="material-symbols-outlined" aria-hidden="true">${isFavorite ? "star" : "star_border"}</span>
          ${isFavorite ? "Remove Favorite" : "Add Favorite"}
        </button>
      </div>
    </section>
  `;

  selectedLocation.querySelector("#closeLocationDetails").addEventListener("click", showSearchPanel);

  selectedLocation.querySelector('[data-route-action="start"]').addEventListener("click", () => {
    setRouteEndpoint("start", location);
  });

  selectedLocation.querySelector('[data-route-action="destination"]').addEventListener("click", () => {
    setRouteEndpoint("destination", location, { openDirections: true });
  });

  selectedLocation.querySelectorAll("[data-personal-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.personalMode === "remove") {
        removePersonalPlace(button.dataset.personalAction);
      } else {
        savePersonalPlace(button.dataset.personalAction, location);
      }

      renderSelectedLocation(location);
      renderLocations(getFilteredLocations());
      renderDirectionQuickPicks();
    });
  });

  selectedLocation.querySelector("[data-favorite-action]").addEventListener("click", () => {
    toggleFavoriteLocation(location);
    renderSelectedLocation(location);
    renderLocations(getFilteredLocations());
    renderDirectionQuickPicks();
  });
}

function getFilteredLocations() {
  const query = searchInput.value.trim().toLowerCase();
  const layerMatches = (location) => activeLayer === "All" || location.layer === activeLayer;
  const queryMatches = (location) => !query || getSearchText(location).includes(query);

  return locations.filter((location) => layerMatches(location) && queryMatches(location));
}

function getLocationAliases(location) {
  const ignoredKeywords = new Set([
    "and", "the", "hall", "building", "campus", "student", "students", "academic", "classrooms",
    "parking", "public", "faculty", "staff", "dorm", "housing", "support", "office", "offices"
  ]);

  const profile = getLocationDetailProfile(location);
  const profileAliases = profile.aliases || [];
  const keywordAliases = location.keywords
    .filter((keyword) => keyword.length >= 2 && keyword.length <= 8)
    .filter((keyword) => /[a-zA-Z]/.test(keyword))
    .filter((keyword) => !ignoredKeywords.has(keyword.toLowerCase()));

  return [...profileAliases, ...keywordAliases].slice(0, 5);
}

function getRouteSuggestionScore(location, query) {
  const normalizedName = normalizeRouteInput(location.name);
  const normalizedCategory = normalizeRouteInput(location.category);
  const aliases = getLocationAliases(location).map(normalizeRouteInput);
  const searchText = getSearchText(location);

  if (!query) {
    return 100;
  }

  if (normalizedName === query) {
    return 0;
  }

  if (normalizedName.startsWith(query)) {
    return 1;
  }

  if (aliases.some((alias) => alias === query || alias.startsWith(query))) {
    return 2;
  }

  if (normalizedName.includes(query)) {
    return 3;
  }

  if (normalizedCategory.includes(query) || searchText.includes(query)) {
    return 4;
  }

  return null;
}

function getRouteSuggestionMatches(value, options = {}) {
  const query = normalizeRouteInput(value);
  const includeCurrentLocation = options.includeCurrentLocation && currentPosition;
  const matches = [];

  if (includeCurrentLocation && (!query || "current location".includes(query))) {
    matches.push({
      label: "Current Location",
      detail: "Use your live GPS position",
      value: "Current Location",
      location: {
        name: "Current Location",
        lat: currentPosition.lat,
        lng: currentPosition.lng
      },
      score: query ? 0 : 90
    });
  }

  locations.forEach((location) => {
    const score = getRouteSuggestionScore(location, query);

    if (score === null) {
      return;
    }

    matches.push({
      label: location.name,
      detail: location.category,
      value: getLocationInputValue(location),
      location,
      score
    });
  });

  return matches
    .sort((a, b) => a.score - b.score || a.label.localeCompare(b.label))
    .slice(0, 7);
}

function hideRouteSuggestions(suggestionsBox) {
  if (!suggestionsBox) {
    return;
  }

  suggestionsBox.hidden = true;
  suggestionsBox.innerHTML = "";
}

function renderRouteSuggestions(field, suggestionsBox, options = {}) {
  if (!field || !suggestionsBox) {
    return;
  }

  const matches = getRouteSuggestionMatches(field.value, options);

  if (!matches.length) {
    suggestionsBox.hidden = false;
    suggestionsBox.innerHTML = '<p class="route-suggestion-empty">No close matches found.</p>';
    return;
  }

  suggestionsBox.hidden = false;
  suggestionsBox.innerHTML = "";

  matches.forEach((match) => {
    const button = document.createElement("button");
    button.className = "route-suggestion-option";
    button.type = "button";
    button.setAttribute("role", "option");
    button.innerHTML = `
      <span class="material-symbols-outlined" aria-hidden="true">${match.label === "Current Location" ? "my_location" : getLocationIcon(match.location)}</span>
      <span>
        <strong>${match.label}</strong>
        <small>${match.detail}</small>
      </span>
    `;

    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    button.addEventListener("click", () => {
      field.value = match.value;
      if (field === fromLocationSelect) {
        routeStartManuallyChanged = !isCurrentLocationInput(match.value);
      }
      updateRouteActionButton();
      hideRouteSuggestions(suggestionsBox);
      shouldFitRouteToMap = true;

      if (getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value)) {
        renderDirectionsPreview();
      } else {
        syncCurrentLocationMarker({ centerMap: false });
        const nextField = field === fromLocationSelect ? toLocationSelect : fromLocationSelect;
        nextField?.focus();
      }
    });

    suggestionsBox.appendChild(button);
  });
}

function renderLocationOptions() {
  renderRouteSuggestions(fromLocationSelect, fromLocationSuggestions, { includeCurrentLocation: true });
  hideRouteSuggestions(fromLocationSuggestions);
  renderRouteSuggestions(toLocationSelect, toLocationSuggestions);
  hideRouteSuggestions(toLocationSuggestions);
}

function isCurrentLocationInput(value) {
  return normalizeRouteInput(value) === "current location";
}

function getLocationBySelectValue(value) {
  const cleanValue = String(value || "").trim();

  if (isCurrentLocationInput(cleanValue)) {
    return {
      name: "Current Location",
      lat: currentPosition?.lat,
      lng: currentPosition?.lng
    };
  }

  const normalizedValue = normalizeRouteInput(cleanValue);

  if (!normalizedValue) {
    return null;
  }

  return locations.find((location) => normalizeRouteInput(getLocationInputValue(location)) === normalizedValue)
    || locations.find((location) => normalizeRouteInput(location.name) === normalizedValue)
    || locations.find((location) => location.keywords.some((keyword) => normalizeRouteInput(keyword) === normalizedValue))
    || locations.find((location) => getSearchText(location).includes(normalizedValue));
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

function renderDirectionsPreview(options = {}) {
  const start = getLocationBySelectValue(fromLocationSelect.value);
  const end = getLocationBySelectValue(toLocationSelect.value);
  const isCurrentLocationStart = isCurrentLocationInput(fromLocationSelect.value);
  const routePreference = routePreferenceSelect?.value || "fastest";
  const routePreferenceLabel = routePreferenceLabels[routePreference] || "Fastest route";
  const shouldShowStepNavigator = Boolean(options.showStepNavigator);

  openDirectionsPanel({ preservePanelState: options.preservePanelState });
  if (!start || !end) {
    latestRoutePreview = null;
    latestDirectionSteps = [];
    routeInstructionPoints = [];
    isGuidedNavigationActive = false;
    hideRouteStepNavigator();
    directionsOutput.textContent = "Type a campus location and choose the closest matching suggestion for From and To.";
    hideLocationStatus();
    syncCurrentLocationMarker({ centerMap: false });
    return null;
  }

  if (start.name === end.name) {
    latestRoutePreview = null;
    latestDirectionSteps = [];
    routeInstructionPoints = [];
    isGuidedNavigationActive = false;
    hideRouteStepNavigator();
    directionsOutput.textContent = "Your starting point and destination are the same.";
    syncCurrentLocationMarker({ centerMap: false });
    return null;
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
      syncCurrentLocationMarker({ centerMap: !isLiveTracking });
    } else {
      syncCurrentLocationMarker({ centerMap: false });
      focusMapOnLocation(end);
    }
    return null;
  }

  const route = window.CampusNavigation.findRoute(start, end, { preference: routePreference });

  if (!route.ok) {
    latestRoutePreview = null;
    latestDirectionSteps = [];
    routeInstructionPoints = [];
    isGuidedNavigationActive = false;
    hideRouteStepNavigator();
    directionsOutput.innerHTML = `
      <strong>Route unavailable:</strong> ${route.message}
      <br>
      Choose another nearby starting point or destination.
    `;
    if (isCurrentLocationStart) {
      syncCurrentLocationMarker({ centerMap: !isLiveTracking });
    } else {
      syncCurrentLocationMarker({ centerMap: false });
      focusMapOnLocation(end);
    }
    return null;
  }

  const routeSignature = getRouteSignature(start, end);
  const shouldFitThisRoute = shouldFitRouteToMap || routeSignature !== lastRouteSignature;
  lastRouteSignature = routeSignature;
  shouldFitRouteToMap = false;

  const directionSteps = buildDirectionSteps(route.steps);
  latestRoutePreview = { route, start, end, routePreferenceLabel };
  latestDirectionSteps = directionSteps.length
    ? directionSteps
    : [{ instruction: `Continue to ${end.name}`, distance: route.distanceMeters || 1 }];
  routeInstructionPoints = buildRouteInstructionPoints(route, start, end, latestDirectionSteps.length);
  activeRouteStepIndex = 0;
  isGuidedNavigationActive = false;
  const visibleSteps = directionSteps.slice(0, 8);
  const extraStepCount = Math.max(0, directionSteps.length - visibleSteps.length);
  const stepsMarkup = visibleSteps
    .map((step, index) => `<li>${index + 1}. ${step.instruction} for ${formatRouteDistance(step.distance)}.</li>`)
    .join("");
  const extraMarkup = extraStepCount
    ? `<li>Continue through ${extraStepCount} more short campus path${extraStepCount === 1 ? "" : "s"}.</li>`
    : "";

  directionsOutput.innerHTML = `
    <article class="route-preview-card" aria-label="Route preview">
      <div class="route-preview-header">
        <div>
          <p class="eyebrow">Route Preview</p>
          <h3>${start.name} to ${end.name}</h3>
        </div>
        <span class="route-mode-badge">Walk</span>
      </div>

      <div class="route-endpoints" aria-label="Route endpoints">
        <div class="route-endpoint-row">
          <span class="material-symbols-outlined start-dot" aria-hidden="true">radio_button_checked</span>
          <div>
            <strong>Start</strong>
            <span>${start.name}</span>
          </div>
        </div>
        <div class="route-endpoint-row">
          <span class="material-symbols-outlined destination-dot" aria-hidden="true">location_on</span>
          <div>
            <strong>Destination</strong>
            <span>${end.name}</span>
          </div>
        </div>
      </div>

      <div class="route-metric-grid" aria-label="Route estimate">
        <div class="route-metric-card primary-route-metric">
          <span>Estimated Time</span>
          <strong>${route.minutes} min</strong>
        </div>
        <div class="route-metric-card">
          <span>Distance</span>
          <strong>${route.distanceText}</strong>
        </div>
        <div class="route-metric-card">
          <span>Route Type</span>
          <strong>${routePreferenceLabel}</strong>
        </div>
        <div class="route-metric-card">
          <span>Path Segments</span>
          <strong>${route.graphEdgeCount}</strong>
        </div>
      </div>

      <p class="route-preference-card">${route.preferenceNote}</p>

      <details class="route-step-details" open>
        <summary>Step-by-step directions</summary>
        <ol class="route-steps">
          <li>Start at ${start.name}.</li>
          ${stepsMarkup}
          ${extraMarkup}
          <li>Arrive at ${end.name}.</li>
        </ol>
      </details>

      <section class="route-issue-panel" aria-label="Report a route problem">
        <div>
          <h4>See a route problem?</h4>
          <p>Report it with this route already attached.</p>
        </div>
        <div class="route-issue-options">
          <button class="route-issue-chip" type="button" data-route-issue="Route is too long">Too Long</button>
          <button class="route-issue-chip" type="button" data-route-issue="Missing sidewalk or connection">Missing Sidewalk</button>
          <button class="route-issue-chip" type="button" data-route-issue="Crosses the wrong area">Wrong Area</button>
          <button class="route-issue-chip" type="button" data-route-issue="Blocked or inaccessible path">Blocked Path</button>
          <button class="route-issue-chip" type="button" data-route-issue="Directions are unclear">Unclear Steps</button>
        </div>
        <button id="reportRouteIssue" class="secondary-button route-report-button" type="button">
          <span class="material-symbols-outlined" aria-hidden="true">feedback</span>
          Describe Another Issue
        </button>
      </section>
    </article>
  `;

  directionsOutput.querySelectorAll("[data-route-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      openRouteIssueReporter(route, routePreferenceLabel, button.dataset.routeIssue);
    });
  });

  directionsOutput.querySelector("#reportRouteIssue").addEventListener("click", () => {
    openRouteIssueReporter(route, routePreferenceLabel);
  });

  drawNavigationRoute(route, start, end, { fitBounds: shouldFitThisRoute });
  if (shouldShowStepNavigator) {
    renderRouteStepNavigator();
  } else {
    hideRouteStepNavigator();
  }
  switchMapView("navigationMapView");

  if (isCurrentLocationStart) {
    syncCurrentLocationMarker({ centerMap: !isLiveTracking });
  } else {
    syncCurrentLocationMarker({ centerMap: false });
    focusMapOnLocation(end);
  }

  return latestRoutePreview;
}

function formatRouteDistance(meters) {
  const feet = meters * 3.28084;

  if (feet < 1000) {
    return `${Math.round(feet)} ft`;
  }

  return `${(feet / 5280).toFixed(2)} mi`;
}

function buildRouteInstructionPoints(route, start, end, stepCount) {
  const points = [start, ...(route?.path || []), end].filter((point) => point?.lat && point?.lng);

  if (!points.length || stepCount <= 0) {
    return [];
  }

  return Array.from({ length: stepCount }, (_, index) => {
    const pointIndex = Math.min(points.length - 1, Math.round((index / Math.max(1, stepCount - 1)) * (points.length - 1)));
    return points[pointIndex];
  });
}

function hideRouteStepNavigator() {
  if (!routeStepNavigator) {
    return;
  }

  routeStepNavigator.hidden = true;
  routeStepNavigator.innerHTML = "";
}

function focusRouteStepOnMap(index) {
  const point = routeInstructionPoints[index];

  if (!navigationMap || !point) {
    return;
  }

  navigationMap.setView([point.lat, point.lng], isGuidedNavigationActive ? 19 : 18);
}

function setActiveRouteStep(index, options = {}) {
  if (!latestDirectionSteps.length) {
    hideRouteStepNavigator();
    return;
  }

  activeRouteStepIndex = Math.max(0, Math.min(index, latestDirectionSteps.length - 1));
  renderRouteStepNavigator();

  if (options.focusMap !== false) {
    focusRouteStepOnMap(activeRouteStepIndex);
  }
}

function renderRouteStepNavigator() {
  if (!routeStepNavigator || !latestDirectionSteps.length) {
    hideRouteStepNavigator();
    return;
  }

  const step = latestDirectionSteps[activeRouteStepIndex];
  const isLastStep = activeRouteStepIndex === latestDirectionSteps.length - 1;

  routeStepNavigator.hidden = false;
  routeStepNavigator.innerHTML = `
    <div class="route-step-card ${isGuidedNavigationActive ? "is-guiding" : ""}">
      <div class="route-step-copy">
        <span>${isGuidedNavigationActive ? "Go" : "Preview"} Step ${activeRouteStepIndex + 1} of ${latestDirectionSteps.length}</span>
        <strong>${isLastStep ? "Arrive at destination" : step.instruction}</strong>
        <small>${isLastStep ? "You are at the end of this route." : formatRouteDistance(step.distance)}</small>
      </div>
      <div class="route-step-controls">
        <button class="route-step-control" type="button" data-route-step-prev aria-label="Previous step">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹</button>
        <input type="range" min="0" max="${latestDirectionSteps.length - 1}" value="${activeRouteStepIndex}" aria-label="Route step">
        <button class="route-step-control" type="button" data-route-step-next aria-label="Next step">ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âº</button>
      </div>
    </div>
  `;

  const slider = routeStepNavigator.querySelector('input[type="range"]');
  slider.addEventListener("input", () => {
    setActiveRouteStep(Number(slider.value));
  });

  routeStepNavigator.querySelector("[data-route-step-prev]").addEventListener("click", () => {
    setActiveRouteStep(activeRouteStepIndex - 1);
  });

  routeStepNavigator.querySelector("[data-route-step-next]").addEventListener("click", () => {
    setActiveRouteStep(activeRouteStepIndex + 1);
  });
}

function advanceGuidedNavigationIfNeeded() {
  if (!isGuidedNavigationActive || !currentPosition || !routeInstructionPoints.length) {
    return;
  }

  const nextPoint = routeInstructionPoints[Math.min(activeRouteStepIndex + 1, routeInstructionPoints.length - 1)];
  const distanceMeters = getDistanceBetweenPoints(currentPosition, nextPoint) * 1609.344;

  if (distanceMeters < 18 && activeRouteStepIndex < latestDirectionSteps.length - 1) {
    setActiveRouteStep(activeRouteStepIndex + 1, { focusMap: false });
  }
}

function startGuidedNavigation() {
  if (!latestRoutePreview || !routeUsesCurrentLocation()) {
    return;
  }

  isGuidedNavigationActive = true;
  setMobilePanelState("collapsed");
  setActiveRouteStep(0, { focusMap: false });
  showCurrentLocationMarker({ centerMap: true });
  const accuracy = Math.round(rawCurrentPosition?.accuracy || currentPosition?.accuracy || 0);
  const accuracyGuidance = getAccuracyGuidance(rawCurrentPosition?.accuracy || currentPosition?.accuracy);
  const accuracyLevel = getGpsAccuracyLevel(rawCurrentPosition?.accuracy || currentPosition?.accuracy);
  const heading = accuracyLevel.isReliable ? "Navigation started." : "Navigation started with weak GPS.";
  setLocationStatus(`<strong>${heading}</strong><br>Follow the step card at the top of the map. GPS accuracy: about ${accuracy} meters.${accuracyGuidance}`, { isError: !accuracyLevel.isReliable });
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

function setRouteEndpoint(type, location, options = {}) {
  const value = getLocationInputValue(location);

  if (type === "start") {
    fromLocationSelect.value = value;
    routeStartManuallyChanged = true;
    directionsOutput.innerHTML = `<strong>Starting point set:</strong> ${location.name}. Choose a destination next.`;
  } else {
    toLocationSelect.value = value;
    directionsOutput.innerHTML = `<strong>Destination set:</strong> ${location.name}. Choose a starting point next.`;
  }

  updateRouteActionButton();

  if (fromLocationSelect.value && toLocationSelect.value) {
    renderDirectionsPreview();
  } else if (options.openDirections) {
    openDirectionsPanel();
  } else {
    expandMobilePanel();
  }
}

function refreshNavigationMapLayout() {
  if (!navigationMap) {
    return;
  }

  setTimeout(() => {
    navigationMap.invalidateSize();
  }, 80);
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
  refreshNavigationMapLayout();
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
    navigationMap.fitBounds(routeLine.getBounds(), {
      paddingTopLeft: [36, 120],
      paddingBottomRight: [36, isMobilePanelEnabled() ? 270 : 80]
    });
  }
}

function clearRoute() {
  routeStartManuallyChanged = false;
  fromLocationSelect.value = currentPosition ? "Current Location" : "";
  toLocationSelect.value = "";
  directionsOutput.textContent = "Choose a starting point and destination.";
  lastRouteSignature = "";
  shouldFitRouteToMap = true;
  latestRoutePreview = null;
  latestDirectionSteps = [];
  routeInstructionPoints = [];
  activeRouteStepIndex = 0;
  isGuidedNavigationActive = false;
  updateRouteActionButton();
  hideRouteStepNavigator();
  hideLocationStatus();

  if (navigationRouteLayer) {
    navigationRouteLayer.clearLayers();
  }

  syncCurrentLocationMarker({ centerMap: false });
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
  if (useMyLocationButton) {
    useMyLocationButton.disabled = isLoading;
    useMyLocationButton.textContent = isLoading ? "Setting location..." : "Set My Location";
  }
}

function setLiveTrackingButtons() {
  const label = isLiveTracking ? "Stop Live Tracking" : "Start Live Tracking";

  if (toggleLiveTrackingButton) {
    toggleLiveTrackingButton.textContent = label;
  }

  if (toggleLiveTrackingMapButton) {
    setMapButtonContent(toggleLiveTrackingMapButton, isLiveTracking ? "stop_circle" : "near_me", label);
    toggleLiveTrackingMapButton.classList.toggle("primary-map-action", false);
    toggleLiveTrackingMapButton.classList.toggle("live-tracking-active", isLiveTracking);
    toggleLiveTrackingMapButton.style.color = isLiveTracking ? "var(--jcsu-blue)" : "";
    toggleLiveTrackingMapButton.style.background = isLiveTracking ? "var(--jcsu-gold)" : "";
    toggleLiveTrackingMapButton.style.borderColor = isLiveTracking ? "rgba(255, 207, 1, 0.95)" : "";
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
  const nextPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    accuracy: position.coords.accuracy
  };
  rawCurrentPosition = nextPosition;

  const accuracy = Number(nextPosition.accuracy || gpsAccuracyThresholds.maxTrusted);
  const keepExistingBetterPoint = currentPosition
    && accuracy > gpsAccuracyThresholds.maxTrusted
    && Number(currentPosition.accuracy || 0) < accuracy;

  if (!keepExistingBetterPoint) {
    recentGpsPositions.push(nextPosition);
    recentGpsPositions = recentGpsPositions
      .filter((point) => Number(point.accuracy || gpsAccuracyThresholds.maxTrusted) <= gpsAccuracyThresholds.maxTrusted)
      .slice(-5);

    if (recentGpsPositions.length) {
      const totals = recentGpsPositions.reduce((sum, point) => {
        const weight = 1 / Math.max(8, point.accuracy || gpsAccuracyThresholds.usable);
        return {
          lat: sum.lat + point.lat * weight,
          lng: sum.lng + point.lng * weight,
          accuracy: Math.min(sum.accuracy, point.accuracy || gpsAccuracyThresholds.maxTrusted),
          weight: sum.weight + weight
        };
      }, { lat: 0, lng: 0, accuracy: gpsAccuracyThresholds.maxTrusted, weight: 0 });

      currentPosition = {
        lat: totals.lat / totals.weight,
        lng: totals.lng / totals.weight,
        accuracy: totals.accuracy
      };
    } else {
      currentPosition = nextPosition;
    }
  }

  updateGpsAccuracyBadge();
  renderLocationOptions();

  if (!routeStartManuallyChanged && (!fromLocationSelect.value.trim() || isCurrentLocationInput(fromLocationSelect.value))) {
    fromLocationSelect.value = "Current Location";
  }

  updateRouteActionButton();
}

function routeUsesCurrentLocation() {
  return isCurrentLocationInput(fromLocationSelect.value);
}

function updateRouteActionButton() {
  if (!getDirectionsButton) {
    return;
  }

  getDirectionsButton.textContent = routeUsesCurrentLocation() ? "Go" : "Steps";
}

function shouldShowLiveLocationPin() {
  const hasRouteEndpoints = Boolean(getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value));
  return !hasRouteEndpoints || routeUsesCurrentLocation();
}

function syncCurrentLocationMarker(options = {}) {
  if (!currentLocationLayer) {
    return;
  }

  if (shouldShowLiveLocationPin()) {
    showCurrentLocationMarker(options);
  } else {
    currentLocationLayer.clearLayers();
  }
}

function updateCurrentLocation(position, mode) {
  saveCurrentPosition(position);

  const accuracy = Math.round(currentPosition.accuracy || 0);
  const accuracyGuidance = getAccuracyGuidance(rawCurrentPosition?.accuracy);
  const message = mode === "live"
    ? `<strong>Live tracking on.</strong><br>Your pin updates as you move. Accuracy: about ${accuracy} meters.${accuracyGuidance}`
    : `<strong>Starting location saved.</strong><br>This pin stays fixed until you tap Set My Location again. Accuracy: about ${accuracy} meters.${accuracyGuidance}`;

  setLocationStatus(message);
  const shouldCenterMap = mode !== "live" || !hasLiveTrackingCentered;

  const panelStateBeforeMapRefresh = sidebar.dataset.panelState || "full";

  syncCurrentLocationMarker({ centerMap: shouldCenterMap });
  if (mode === "live") {
    hasLiveTrackingCentered = true;
  }
  switchMapView("navigationMapView");

  if (mode === "live" && isMobilePanelEnabled()) {
    document.body.classList.toggle("directions-panel-open", panelStateBeforeMapRefresh !== "collapsed");
  }

  if (isGuidedNavigationActive) {
    advanceGuidedNavigationIfNeeded();
    return;
  }

  if (getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value) && (mode !== "live" || routeUsesCurrentLocation())) {
    renderDirectionsPreview({ preservePanelState: mode === "live" });
  } else if (mode !== "live") {
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

function startLiveTrackingAutomatically() {
  if (isLiveTracking) {
    return;
  }

  window.setTimeout(() => {
    if (!isLiveTracking) {
      toggleLiveTracking();
    }
  }, 900);
}
if (useMyLocationButton) {
  useMyLocationButton.addEventListener("click", requestCurrentLocation);
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

if (closeDirectionsPanelButton) {
  closeDirectionsPanelButton.addEventListener("click", closeDirectionsPanel);
}


if (helpButton) {
  helpButton.addEventListener("click", () => openHelpModal({ markSeen: false }));
}

if (closeHelpButton) {
  closeHelpButton.addEventListener("click", closeHelpModal);
}

if (finishHelpButton) {
  finishHelpButton.addEventListener("click", closeHelpModal);
}

if (helpModal) {
  helpModal.addEventListener("click", (event) => {
    if (event.target === helpModal) {
      closeHelpModal();
    }
  });
}
if (safetyButton) {
  safetyButton.addEventListener("click", openSafetyModal);
}

if (openSafetyPanelMapButton) {
  openSafetyPanelMapButton.addEventListener("click", openSafetyModal);
}

if (closeSafetyButton) {
  closeSafetyButton.addEventListener("click", closeSafetyModal);
}

if (safetyModal) {
  safetyModal.addEventListener("click", (event) => {
    if (event.target === safetyModal) {
      closeSafetyModal();
    }
  });
}

safetyRouteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    routeToSafetyLocation(button.dataset.safetyRoute);
  });
});

safetyNearestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    routeToNearestSafetyLocation(button.dataset.safetyNearest);
  });
});
feedbackButton.addEventListener("click", openFeedbackModal);
closeFeedbackButton.addEventListener("click", closeFeedbackModal);
copyFeedbackButton.addEventListener("click", copyFeedbackText);
feedbackForm.addEventListener("submit", submitFeedback);

feedbackModal.addEventListener("click", (event) => {
  if (event.target === feedbackModal) {
    closeFeedbackModal();
  }
});

function handleRouteAction() {
  shouldFitRouteToMap = true;
  const usesCurrentLocation = routeUsesCurrentLocation();
  const preview = renderDirectionsPreview({
    preservePanelState: true,
    showStepNavigator: true
  });

  if (preview && usesCurrentLocation) {
    startGuidedNavigation();
  } else if (preview) {
    setMobilePanelState(isMobilePanelEnabled() ? "half" : "full");
    setActiveRouteStep(0);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && helpModal && !helpModal.hidden) {
    closeHelpModal();
  }

  if (event.key === "Escape" && !feedbackModal.hidden) {
    closeFeedbackModal();
  }

  if (event.key === "Escape" && safetyModal && !safetyModal.hidden) {
    closeSafetyModal();
  }
});
getDirectionsButton.addEventListener("click", handleRouteAction);

function setupRouteSearchField(field, suggestionsBox, options = {}) {
  if (!field) {
    return;
  }

  field.addEventListener("focus", () => {
    window.setTimeout(() => field.select(), 0);
    renderRouteSuggestions(field, suggestionsBox, options);
  });

  field.addEventListener("input", () => {
    shouldFitRouteToMap = true;
    if (field === fromLocationSelect) {
      routeStartManuallyChanged = !isCurrentLocationInput(field.value);
    }
    updateRouteActionButton();
    renderRouteSuggestions(field, suggestionsBox, options);
    syncCurrentLocationMarker({ centerMap: false });
  });

  field.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideRouteSuggestions(suggestionsBox);
      field.blur();
    }
  });

  field.addEventListener("blur", () => {
    window.setTimeout(() => hideRouteSuggestions(suggestionsBox), 120);
  });

  field.addEventListener("change", () => {
    shouldFitRouteToMap = true;
    if (field === fromLocationSelect) {
      routeStartManuallyChanged = !isCurrentLocationInput(field.value);
    }
    updateRouteActionButton();

    if (getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value)) {
      renderDirectionsPreview();
    } else {
      syncCurrentLocationMarker({ centerMap: false });
    }
  });
}

setupRouteSearchField(fromLocationSelect, fromLocationSuggestions, { includeCurrentLocation: true });
setupRouteSearchField(toLocationSelect, toLocationSuggestions);
if (routePreferenceSelect) {
  routePreferenceSelect.addEventListener("change", () => {
    shouldFitRouteToMap = true;

    if (getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value)) {
      renderDirectionsPreview();
    }
  });
}
clearRouteButton.addEventListener("click", clearRoute);
sidebar.addEventListener("pointerdown", startSheetSwipe);
sidebar.addEventListener("pointerup", endSheetSwipe);
sidebar.addEventListener("pointercancel", () => {
  sheetSwipeStartedAt = 0;
});
sidebar.addEventListener("touchstart", startSheetSwipe, { passive: true });
sidebar.addEventListener("touchmove", moveSheetSwipe, { passive: false });
sidebar.addEventListener("touchend", endSheetSwipe, { passive: true });
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

bottomNavButtons.forEach((button) => {
  button.addEventListener("click", handleBottomNavigation);
});
locations.forEach((location, index) => {
  location.index = index;
});

window.addEventListener("resize", refreshNavigationMapLayout);
window.addEventListener("orientationchange", refreshNavigationMapLayout);
renderLocationOptions();
updateRouteActionButton();
renderLocations(locations);
initializeNavigationMap();
switchMapView("navigationMapView");
setMobilePanelState("half");
if ("serviceWorker" in navigator) {
  let refreshingForUpdate = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshingForUpdate) {
      return;
    }

    refreshingForUpdate = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").then((registration) => {
      registration.update();

      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      registration.addEventListener("updatefound", () => {
        const nextWorker = registration.installing;

        if (!nextWorker) {
          return;
        }

        nextWorker.addEventListener("statechange", () => {
          if (nextWorker.state === "installed" && navigator.serviceWorker.controller) {
            nextWorker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });
    }).catch(() => {
      // The app still works in browsers that block service worker registration.
    });
  });
}

window.addEventListener("online", updateOfflineBanner);
window.addEventListener("offline", updateOfflineBanner);
updateOfflineBanner();
initializeAppIntro();
startLiveTrackingAutomatically();
