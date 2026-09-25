const mapId = "1DIEHzvOP7u9UehtaCniXFbs5FMT0C3w";
const defaultMapUrl = `https://www.google.com/maps/d/embed?mid=${mapId}`;
const appIntro = document.querySelector("#appIntro");
const offlineBanner = document.querySelector("#offlineBanner");
const searchInput = document.querySelector("#locationSearch");
const resultsContainer = document.querySelector("#locationResults");
const personalLocationsContainer = document.querySelector("#personalLocations");
const favoriteLocationsContainer = document.querySelector("#favoriteLocations");
const recentLocationsContainer = document.querySelector("#recentLocations");
const savedPanel = document.querySelector("#savedPanel");
const savedPanelContent = document.querySelector("#savedPanelContent");
const savedCount = document.querySelector("#savedCount");
const resultCount = document.querySelector("#resultCount");
const selectedLocation = document.querySelector("#selectedLocation");
const filterButtons = document.querySelectorAll(".filter-button");
const openNowToggle = document.querySelector("[data-open-now]");
const fromLocationSelect = document.querySelector("#fromLocation");
const toLocationSelect = document.querySelector("#toLocation");
const routePreferenceSelect = document.querySelector("#routePreference");
const fromLocationSuggestions = document.querySelector("#fromLocationSuggestions");
const fromEntranceOptions = document.querySelector("#fromEntranceOptions");
const toLocationSuggestions = document.querySelector("#toLocationSuggestions");
const toEntranceOptions = document.querySelector("#toEntranceOptions");
const directionQuickPicks = document.querySelector("#directionQuickPicks");
const useMyLocationButton = document.querySelector("#useMyLocation");
const toggleLiveTrackingButton = document.querySelector("#toggleLiveTracking");
const toggleLiveTrackingMapButton = document.querySelector("#toggleLiveTrackingMap");
const recenterLocationMapButton = document.querySelector("#recenterLocationMap");
const openDirectionsPanelButton = document.querySelector("#openDirectionsPanel");
const basemapSelect = document.querySelector("#basemapSelect");
const closeDirectionsPanelButton = document.querySelector("#closeDirectionsPanel");
const getDirectionsButton = document.querySelector("#getDirections");
const clearRouteButton = document.querySelector("#clearRoute");
const reportCurrentRouteIssueButton = document.querySelector("#reportCurrentRouteIssue");
const directionsOutput = document.querySelector("#directionsOutput");
const routeStepNavigator = document.querySelector("#routeStepNavigator");
const gpsAccuracyBadge = document.querySelector("#gpsAccuracyBadge");
const startArModeButton = document.querySelector("#startArMode");
const arModeLayer = document.querySelector("#arMode");
const arCameraVideo = document.querySelector("#arCamera");
const closeArModeButton = document.querySelector("#closeArMode");
const arArrowElement = document.querySelector("#arArrow");
const arBearingText = document.querySelector("#arBearingText");
const arTargetNameText = document.querySelector("#arTargetName");
const arInstructionText = document.querySelector("#arInstruction");
const arDistanceText = document.querySelector("#arDistance");
const arEtaText = document.querySelector("#arEta");
const arStatusText = document.querySelector("#arStatus");
const routeDock = document.querySelector("#routeDock");
const routeDockHandle = document.querySelector("#routeDockHandle");
const routeDockArrival = document.querySelector("#routeDockArrival");
const routeDockDestination = document.querySelector("#routeDockDestination");
const routeDockDetail = document.querySelector("#routeDockDetail");
const routeDockSteps = document.querySelector("#routeDockSteps");
const routeDockArButton = document.querySelector("#routeDockAr");
const endRouteButton = document.querySelector("#endRoute");
const mapLocationStatus = document.querySelector("#mapLocationStatus");
const bottomNav = document.querySelector(".app-bottom-nav");
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
// Campus-only map bounds: every mapped location, pan room to the east
// edge (-80.8488) covering the baseball field by the IBC, and room
// west/south so Mosaic Village and the Arts Factory can be centered.
const campusMapBounds = [
  [35.2368, -80.8616],
  [35.247, -80.8488]
];
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
const outlookEmailFallbackDelayMs = 2400;
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
      Monday: [["8:00 AM", "5:00 PM"]],
      Tuesday: [["8:00 AM", "5:00 PM"]],
      Wednesday: [["8:00 AM", "5:00 PM"]],
      Thursday: [["8:00 AM", "5:00 PM"]],
      Friday: [["8:00 AM", "5:00 PM"]]
    },
    source: "JCSU Counseling Center hours: Monday-Friday, 8 a.m.-5 p.m.; evening sessions by appointment."
  },
  "JCSU Health Center": {
    label: "Health Center",
    weekly: {
      Monday: [["9:00 AM", "1:00 PM"], ["2:00 PM", "6:00 PM"]],
      Tuesday: [["9:00 AM", "1:00 PM"], ["2:00 PM", "6:00 PM"]],
      Wednesday: [["9:00 AM", "1:00 PM"], ["2:00 PM", "6:00 PM"]],
      Thursday: [["9:00 AM", "1:00 PM"], ["2:00 PM", "6:00 PM"]],
      Friday: [["9:00 AM", "1:00 PM"]]
    },
    source: "JCSU Health Center hours: Monday-Thursday 9 a.m.-6 p.m. closed 1-2 p.m.; Friday 9 a.m.-1 p.m."
  },
  "James B. Duke Memorial Library": {
    label: "Library Fall/Spring Hours",
    weekly: {
      Sunday: [["2:00 PM", 1440]],
      Monday: [["7:30 AM", 1440]],
      Tuesday: [["7:30 AM", "11:00 PM"]],
      Wednesday: [["7:30 AM", "11:00 PM"]],
      Thursday: [["7:30 AM", "11:00 PM"]],
      Friday: [["7:30 AM", "5:00 PM"]],
      Saturday: [["10:00 AM", "2:00 PM"]]
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

const facultyOfficeHours = {
  "New Science Center (STEM)": {
    label: "College of STEM Faculty",
    source: "College of STEM office hours collected for the JCSU Map senior project. Times can change during breaks and exams.",
    faculty: [
      {
        name: "Dr. Jason Tarkington",
        room: "NSC 231",
        email: "jtarkington@JCSU.EDU",
        weekly: {
          Monday: [["10:00 AM","12:00 PM"]],
          Tuesday: [["11:00 AM","12:00 PM"],["1:00 AM", "3:00 PM"]],
          Wednesday: [["10:00 AM","12:00 PM"]],
          Friday: [["10:00 AM","12:00 PM"]],

        },
        note: "Appointment email to schedule."
      },
      {
        name: "Dr. Alexa von Dohlen",
        room: "NSC 232",
        email: "acrosypal@jcsu.edu",
        weekly:{
          Monday: [["10:30 AM", "11:00 AM"], ["1:00 PM", "3:00 PM"]],
          Wednesday: [["10:30 AM", "11:00 AM"], ["1:00 PM", "3:00 PM"]],
        },
        appointment: {
          Tuesday: [["8:00 AM", "11:00 AM"]],
          Thursday: [["9:00 AM", "11:00 AM"]],
        }
      },

      {
        name: "Dr. Tracy Fox-Brown",
        room: "NSC 306",
        email: "tbrown2@JCSU.EDU",
        weekly: {
          Monday: [["9:00 AM", "10:00 AM"]],
          Wednesday: [["9:00 AM", "10:00 AM"]],
          Thursday: [["9:00", "12:00 PM"]],
          Friday: [["9:00 AM", "10:00 AM"]],

        },
        appointment: {
          Monday: [["8:00 AM", "9:00 AM"]],
          Wednesday: [["8:00 AM", "9:00 AM"]],
          Thursday: [["8:00 AM", "9:00 AM"]],
          Friday: [["8:00 AM", "9:00 AM"]],

        }

      },
      {
        name: "Dr. Debra Terrell",
        room: "NSC 223B",
        email: "dterrell@jcsu.edu",
        weekly: {
          Tuesday: [["11:00 AM", "3:00 PM"]],
          Thursday: [["11:00 AM", "3:00 PM"]],

        },
        note: "Friday by Appointment Only."

      },
      {
        name: "Ms. Rashawna Huntley",
        room: "NSC 223C",
        email: "rhuntley@JCSU.EDU",
        weekly: {
          Monday: [["8:00 AM", "12:00 PM"], ["1:00 PM", "5:00 PM"]],
          Wednesday: [["8:00 AM", "12:00 PM"], ["1:00 PM", "5:00 PM"]],
          Thursday: [["12:00 PM", "5:00 PM"]],
          Friday: [["9:00 AM", "1:30 PM"]],

        },
      
      },
      
      {
        name: "Dr. Mark Dugo",
        room: "NSC 223E",
        email: "mdugo@jcsu.edu",
        weekly: {
          Monday: [["1:00 PM", "2:00 PM"], ["3:00 PM", "5:00 PM"]],
          Wednesday: [["1:00 PM", "2:00 PM"], ["3:00 PM", "5:00 PM"]],
          Friday: [["1:00 PM", "2:00 PM"]]
        },
        appointment: {
          Monday: [["11:00 AM", "12:00 PM"]],
          Wednesday: [["11:00 AM", "12:00 PM"]],
          Thursday: [["11:00 AM", "1:00 PM"]],
          Friday: [["11:00 AM", "12:00 PM"]]
        }
      },
      {
        name: "Dr. Sunil Gupta",
        room: "NSC 354",
        email: "sgupta@jcsu.edu",
        weekly: {
          Monday: [["10:00 AM", "12:00 PM"]],
          Wednesday: [["10:00 AM", "12:00 PM"]],
          Friday: [["10:00 AM", "12:00 PM"]]
        },
        note: "Appointments: email to schedule."
      },
      {
        name: "Dr. Jasmine Hamlehary",
        room: "NSC 345",
        email: "jhamlehdary@jcsu.edu",
        weekly: {
          Friday: [["10:00 AM", "12:00 PM"]]
        },
        note: "Appointments: email to schedule."
      },
      {
        name: "Ms. Nakoria Strong",
        room: "NSC 341",
        email: "nstrong@jcsu.edu",
        weekly: {
          Monday: [["9:00 AM", "10:00 AM"], ["1:00 PM", "2:00 PM"]],
          Wednesday: [["9:00 AM", "10:00 AM"], ["1:00 PM", "2:00 PM"]],
          Friday: [["9:00 AM", "10:00 AM"], ["1:00 PM", "2:00 PM"]]
        },
        appointment: {
          Monday: [["10:30 AM", "11:30 AM"], ["2:30 PM", "4:00 PM"]],
          Tuesday: [["10:00 AM", "11:30 AM"], ["1:30 PM", "4:30 PM"]],
          Wednesday: [["10:30 AM", "11:30 AM"], ["2:30 PM", "4:00 PM"]],
          Thursday: [["10:00 AM", "11:30 AM"], ["1:30 PM", "4:30 PM"]]
        },
        note: "Appointments: email to schedule."
      },
      {
        name: "Dr. Thomas Fleming",
        room: "NSC 346",
        email: "tfleming@jcsu.edu",
        weekly: {
          Monday: [["9:00 AM", "10:00 AM"], ["2:30 PM", "4:00 PM"]],
          Wednesday: [["9:00 AM", "10:00 AM"], ["2:30 PM", "4:00 PM"]],
          Friday: [["9:00 AM", "10:00 AM"], ["2:30 PM", "4:00 PM"]]
        },
        appointment: {
          Tuesday: [["8:00 AM", "11:00 AM"], ["3:00 PM", "5:00 PM"]]
        }
      },
      {
        name: "Dr. Willie Fleming",
        room: "NSC 337",
        email: "wfleming@JCSU.EDU",
        weekly: {
          Tuesday: [["8:30 AM", "9:30 AM"], ["10:45 AM", "12:00 PM"], ["3:30 PM", "4:30 PM"]],
          Wednesday: [["9:00 AM", "12:00 PM"]],
          Thursday: [["8:30 AM", "9:30 AM"], ["10:45 AM", "12:00 PM"], ["3:30 PM", "4:30 PM"]]
        },
        note: "Appointments: as needed."
      },
      {
        name: "Dr. Thipwiwatpotjana Phantipa (Yim)",
        room: "NSC 334",
        email: "pthipwiwatpotjana@JCSU.EDU",
        weekly: {
          Monday: [["7:00 AM", "8:50 AM"], ["10:00 AM", "10:50 AM"], ["2:00 PM", "3:00 PM"]],
          Wednesday: [["7:00 AM", "8:50 AM"], ["10:00 AM", "10:50 AM"], ["2:00 PM", "3:00 PM"]],
          Friday: [["7:00 AM", "8:50 AM"], ["10:00 AM", "10:50 AM"], ["2:00 PM", "3:00 PM"]]
        },
        appointment: {
          Tuesday: [["11:00 AM", "12:30 PM"]],
          Thursday: [["11:00 AM", "12:30 PM"]]
        },
        note: "Tuesday/Thursday appointment slots meet on Microsoft Teams."
      },
      {
        name: "Dr. Jason Tarkington",
        room: "NSC 208",
        email: "jtarkington@JCSU.EDU",
        weekly: {
          Monday: [["1:00 PM", "2:00 PM"]],
          Tuesday: [["11:00 AM", "12:00 PM"], ["1:00 PM", "3:00 PM"]],
          Wednesday: [["1:00 PM", "2:00 PM"]],
          Friday: [["1:00 PM", "2:00 PM"]]
        },
        note: "Appointments: email to schedule."
      },
      {
        name: "Dr. Brian Hunt",
        room: "NSC 336",
        email: "bjhunt@jcsu.edu",
        weekly: {
          Monday: [["12:00 PM", "1:00 PM"], ["2:00 PM", "3:00 PM"]],
          Wednesday: [["12:00 PM", "1:00 PM"], ["2:00 PM", "3:00 PM"]],
          Friday: [["12:00 PM", "1:00 PM"]]
        },
        appointment: {
          Monday: [["9:00 AM", "11:00 AM"]],
          Wednesday: [["9:00 AM", "10:00 AM"]],
          Friday: [["9:00 AM", "11:00 AM"]]
        }
      },
      {
        name: "Dr. Douglas Cooper",
        room: "NSC 340",
        email: "dpcooper@jcsu.edu",
        weekly: {
          Monday: [["4:00 PM", "5:00 PM"]],
          Tuesday: [["1:00 PM", "3:00 PM"]],
          Wednesday: [["2:00 PM", "5:00 PM"]],
          Thursday: [["1:00 PM", "3:00 PM"]],
          Friday: [["2:00 PM", "5:00 PM"]]
        },
        note: "Tuesday and Thursday times are virtual only; Monday, Wednesday, and Friday are walk-in and virtual."
      },
      {
        name: "Dr. Vijaya Gompa",
        room: "NSC 348",
        email: "vgompa@JCSU.EDU",
        weekly: {
          Monday: [["2:00 PM", "3:45 PM"]],
          Wednesday: [["2:00 PM", "3:45 PM"]],
          Friday: [["2:00 PM", "3:45 PM"]]
        },
        appointment: {
          Monday: [["8:00 AM", "9:00 AM"]],
          Wednesday: [["8:00 AM", "9:00 AM"]],
          Friday: [["8:00 AM", "9:00 AM"]]
        },
        note: "The PDF printed 'MWF 2-3:45PM / 2:00-3:00PM'; entered as 2-3:45 p.m. Verify with the department."
      }
    ]
  },
  "Dorothy Cowser Yancy Technology Center": {
    label: "College of STEM Faculty (Yancy)",
    faculty: [
      {
        name: "Dr. Suraydip Chakraborty",
        room: "Yancy (TC) 317",
        email: "schakraborty@JCSU.EDU",
        weekly: {
          Monday: [["2:00 PM", "3:00 PM"]],
          Wednesday: [["2:00 PM", "3:00 PM"]],
          Thursday: [["9:30 AM", "11:00 AM"]], 

        },
        appointment: {
          Monday: [["12:00 PM", "2:00 PM"]],
          Tuesday: [["11:00 AM", "12:00 PM"]],
          Thursday: [["3:00 PM", "4:00 PM"]],

        }

      },
      {
        name: "Dr. Felesia Stukes",
        room: "Yancy (TC) 209 ",
        email: "fstukes@JCSU.EDU",
        weekly: {
          Thursday: [["8:30 AM", "9:30 AM"], ["10:45 AM", "11:45 AM"], ["2:45 PM", "3:45 PM"]],

        },
        appointment: {
          Monday: [["8:00 AM", "9:30 AM"], ["2:45 PM", "3:45 PM"]],
          Wednesday: [["8:00 AM", "9:30 AM"], ["2:45 PM", "3:45 PM"]]
          
        }

      },
      {
        name: "Dr. Vanessa Figgers",
        room: "Yancy (TC) 314",
        email: "vfiggers@jcsu.edu",
        weekly: {
          Monday: [["9:00 AM", "10:00 AM"], ["11:00 AM", "12:00 PM"]],
          Wednesday: [["9:00 AM", "10:00 AM"], ["11:00 AM", "12:00 PM"]],
          Friday: [["9:00 AM", "10:00 AM"]]
        },
        appointment: {
          Monday: [["12:00 PM", "2:30 PM"]],
          Wednesday: [["12:00 PM", "2:30 PM"]]
        }
      },
      {
        name: "Dr. Awatif Amin",
        room: "Yancy (TC) 113",
        email: "aamin@jcsu.edu",
        weekly: {
          Monday: [["12:00 PM", "1:00 PM"], ["2:00 PM", "3:00 PM"]],
          Tuesday: [["11:00 AM", "1:30 PM"]],
          Wednesday: [["12:00 PM", "1:00 PM"]],
          Thursday: [["11:00 AM", "1:30 PM"]],
          Friday: [["12:00 PM", "1:00 PM"], ["2:00 PM", "3:00 PM"]]
        }
      },
      {
        name: "Dr. Sabina Otienoburu",
        room: "Yancy (TC) 312",
        email: "sotienoburu@JCSU.EDU",
        weekly: {
          Monday: [["10:00 AM", "12:00 PM"]],
          Friday: [["10:00 AM", "12:00 PM"]]
        },
        appointment: {
          Tuesday: [["10:00 AM", "3:00 PM"]]
        },
        note: "NSC 130 Lab, 1:00-2:00 p.m."
      },
      {
        name: "Professor Raymond Scriven",
        room: "Yancy (TC) 112",
        email: "rscriven@JCSU.EDU",
        weekly: {
          Monday: [["10:00 AM", "11:00 AM"], ["12:00 PM", "1:00 PM"]],
          Tuesday: [["9:00 AM", "12:00 PM"]],
          Wednesday: [["10:00 AM", "11:00 AM"], ["12:00 PM", "1:00 PM"]],
          Thursday: [["9:00 AM", "12:00 PM"]],
          Friday: [["10:00 AM", "11:00 AM"], ["12:00 PM", "1:00 PM"]]
        },
        appointment: {
          Monday: [["3:00 PM", "4:00 PM"]],
          Tuesday: [["3:00 PM", "4:00 PM"]],
          Wednesday: [["3:00 PM", "4:00 PM"]],
          Thursday: [["3:00 PM", "4:00 PM"]],
          Friday: [["3:00 PM", "4:00 PM"]]
        }
      },
      {
        name: "Dr. Sonya Worrell",
        room: "Yancy (TC) 214",
        email: "sworrell@JCSU.EDU",
        weekly: {
          Monday: [["8:00 AM", "9:00 AM"], ["11:00 AM", "12:00 PM"], ["2:00 PM", "3:00 PM"]],
          Tuesday: [["8:00 AM", "9:00 AM"], ["11:00 AM", "12:00 PM"], ["2:00 PM", "3:00 PM"]],
          Wednesday: [["8:00 AM", "9:00 AM"], ["11:00 AM", "12:00 PM"], ["2:00 PM", "3:00 PM"]]
        },
        appointment: {
          Tuesday: [["10:00 AM", "2:00 PM"]],
          Thursday: [["10:00 AM", "2:00 PM"]]
        }
      }
    ],
    source: "College of STEM faculty located in Yancy Technology Center, collected with the same office hours list. Times can change during breaks and exams."
  }
};

const locationDetailProfiles = {
  "Band and Music Hall": {
    aliases: ["Music Building", "Band Building"],
    bestFor: ["Music classes", "Band rehearsal", "Performance preparation", "Arts-related meetings"],
    mainEntrance: "Use the entrance closest to the north-side academic walkway.",
    accessibility: "Check posted entrance signs for the most accessible doorway before entering.",
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
    bestFor: ["Admissions visits", "Financial aid help", "Student account questions", "Housing support", "Campus pantry"],
    mainEntrance: "Use the main building entrance, then follow the floor notes for the correct office.",
    accessibility: "Check posted building signs for the most accessible entrance and elevator/stair access.",
    insideTip: "Admissions is on the first floor, Financial Aid is on the second, Student Accounts is on the third, and Housing Support/Pantry are on the basement level.",
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
    bestFor: ["Food", "Bookstore", "Student events", "Lounging", "Quick meetups"],
    mainEntrance: "Use the student union entrance closest to the central campus paths when walking from Biddle or the cafeteria area.",
    accessibility: "Use the building entry level that best matches the service you need; verify elevator access once inside.",
    insideTip: "Grimes Lounge is upstairs; Lorraine's is below it; Bull Pen, Pizza Hut, and the Bookstore are on the bottom floor.",
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
    bestFor: ["Football", "Track", "Health and Human Performance classes", "Athletics events", "Practice navigation"],
    mainEntrance: "Use the entrance closest to the athletic fields or event gate depending on whether you are going to class, practice, or an event.",
    accessibility: "For events, follow posted accessible routes and gate signage around the complex.",
    insideTip: "This location can be both a class destination and an athletics destination.",
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
    bestFor: ["Student-athlete advising", "Study support", "Academic check-ins", "Athletics support"],
    mainEntrance: "Use the nearby athletics-side entrance and campus paths connecting toward Irwin Belk Complex.",
    accessibility: "Use sidewalk routes and marked crossings around the athletics area where available.",
    highlights: ["Student-athlete academic support", "Advising", "Study support", "Athletics support"],
    notes: ["Useful for student-athletes looking for academic and athletic department support."],
    arrivalTip: "SAAC is a common nickname students may use in search."
  },
  "James B. Duke Memorial Library": {
    aliases: ["Library", "Duke Library"],
    bestFor: ["Quiet study", "Research", "Printing", "Group study", "Archives"],
    mainEntrance: "Use the main library entrance from the central campus walkway.",
    accessibility: "Check the main entrance area for accessible entry and posted elevator information.",
    highlights: ["Study space", "Research help", "Printing", "Archives", "Group study"],
    notes: ["Best stop for studying, research, printing, technology access, and academic resources."]
  },
  "New Science Center (STEM)": {
    aliases: ["STEM", "Science Center", "New Science"],
    bestFor: ["Science classes", "Labs", "Faculty offices", "STEM tutoring", "Academic meetings"],
    mainEntrance: "Use the closest entrance based on your class or lab room; the app includes multiple route access points for this building.",
    accessibility: "Choose accessible routes when stairs or steep sidewalk segments may be a concern.",
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
    bestFor: ["Freshman female housing", "Residence Life", "Dorm navigation"],
    mainEntrance: "Use the residence hall entrance designated by Residence Life.",
    accessibility: "Residence access may be restricted; students should follow posted housing entry rules.",
    highlights: ["Freshman female housing", "Residence Life", "Dorm navigation"],
    notes: ["Listed in the app as an active freshman female residence hall."]
  },
  "Myers Hall": {
    aliases: ["Myers"],
    bestFor: ["Freshman male housing", "Residence Life", "Dorm navigation"],
    mainEntrance: "Use the residence hall entrance designated by Residence Life.",
    accessibility: "Residence access may be restricted; students should follow posted housing entry rules.",
    highlights: ["Freshman male housing", "Residence Life", "Dorm navigation"],
    notes: ["Listed in the app as an active freshman male residence hall."]
  },
  "New Residence Hall": {
    aliases: ["New Res", "NRH"],
    bestFor: ["Suite-style housing", "Residence Life", "Student living"],
    mainEntrance: "Use the main residence hall entrance designated by Residence Life.",
    accessibility: "Residence access may be restricted; students should follow posted housing entry rules.",
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
  "Arts Factory": {
    aliases: ["JCSU Arts Factory", "Arts Factory CLT"],
    bestFor: ["Theatre", "Visual arts", "Performing arts", "Community events", "Historic West End arts"],
    mainEntrance: "Use the Arts Factory entrance on West Trade Street near the Historic West End arts corridor.",
    accessibility: "Check posted venue information for accessible entrance and event access details before visiting.",
    highlights: ["Black box theatre", "Studios", "Classroom/workspace", "Murals", "Local arts programming"],
    notes: ["Former Griffin Brothers Tire Sales/Griffin Tire property renovated into JCSU's Arts Factory around 2010.", "It was JCSU's first academic facility built outside the main campus and helped support visual and performing arts."],
    arrivalTip: "This location sits off the main campus at 1545 W. Trade Street, so walking routes may extend beyond the core campus paths."
  },  "The Block": {
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
const mapMarkerMinZoom = 18;
const mapLabelMinZoom = 18;
const basemapOptions = {
  imagery: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      maxZoom: 20,
      attribution: "Tiles &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community"
    }
  },
  streets: {
    name: "Streets",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }
  }
};
let activeLocationName = "";
let activeLocationIndex = -1;
let activeLayer = "All";
let activeOpenNowFilter = false;
let currentPosition = null;
let rawCurrentPosition = null;
let recentGpsPositions = [];
let liveTrackingWatchId = null;
let isLiveTracking = false;
let hasLiveTrackingCentered = false;
let navigationMap = null;
let navigationBaseLayer = null;
let navigationMarkerLayer = null;
let navigationLabelLayer = null;
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
let arModeActive = false;
let arModeSessionId = 0;
let arCameraStream = null;
let arAnimationFrameId = 0;
let arCompassHeading = null;
let arHeadingReady = false;
let arCompassHintTimer = 0;
let arAddedBodyLock = false;
let stepsScrollTimer = 0;
let isSyncingCarousel = false;
let suppressDockClick = false;
let isRouteStepViewActive = false;
let activeRouteStepIndex = 0;
let isGuidedNavigationActive = false;
let hasAnnouncedRouteArrival = false;
let offRouteFixCount = 0;
let offRouteAnnounced = false;
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
  renderSavedPanel();
  renderNavigationMarkers(getFilteredLocations());
  focusMapOnLocation(location);

  if (getLocationBySelectValue(fromLocationSelect.value)) {
    shouldFitRouteToMap = true;
    // Safety destinations follow the same rule as the directions form: the
    // preview pops on its own, and Current Location -> safety location asks
    // for the GPS fix it needs before drawing the route.
    previewAfterFieldSelection(null);
    return;
  }

  directionsOutput.innerHTML = `<strong>Destination set:</strong> ${location.name}. Choose a starting point or tap Set My Location.`;
  openDirectionsPanel();
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
      renderSavedPanel();
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
  renderSavedPanel();
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
    renderSavedPanel();
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

function getEntranceLabel(point) {
  const name = point?.name || "Building Entrance";
  const lowerName = name.toLowerCase();

  if (point?.type === "accessible" || lowerName.includes("accessible") || lowerName.includes("elevator")) {
    return name.includes("Accessible") ? name : `${name} - Accessible / Elevator`;
  }

  if (lowerName.includes("side")) {
    return name.includes("Entrance") ? name : `${name} Side Entrance`;
  }

  if (lowerName.includes("back")) {
    return name;
  }

  if (lowerName.includes("main")) {
    return name;
  }

  return name;
}

function getLocationEntranceOptions(location) {
  return Array.isArray(location?.routeAccessPoints) ? location.routeAccessPoints : [];
}

function resetEntranceSelectionForField(field) {
  const container = field === fromLocationSelect ? fromEntranceOptions : toEntranceOptions;

  if (container) {
    container.dataset.selectedEntranceIndex = "0";
  }
}

function getEntranceSelectorForType(type) {
  return type === "start" ? fromEntranceOptions : toEntranceOptions;
}

function getSelectedEntranceIndex(type) {
  const selector = getEntranceSelectorForType(type);

  if (!selector) {
    return 0;
  }

  const selectedIndex = Number(selector.dataset.selectedEntranceIndex || 0);
  return Number.isFinite(selectedIndex) && selectedIndex >= 0 ? selectedIndex : 0;
}

function getSelectedEntrance(location, type) {
  const entrances = getLocationEntranceOptions(location);
  const selector = getEntranceSelectorForType(type);

  if (!entrances.length || !selector) {
    return null;
  }

  return entrances[getSelectedEntranceIndex(type)] || entrances[0];
}

function getSelectedEntranceKey(type) {
  const selector = getEntranceSelectorForType(type);

  if (!selector || selector.hidden) {
    return "default";
  }

  return String(getSelectedEntranceIndex(type));
}

function getRoutePointForEndpoint(location, type) {
  const selectedEntrance = getSelectedEntrance(location, type);

  if (!selectedEntrance) {
    return location;
  }

  return {
    ...location,
    lat: selectedEntrance.lat,
    lng: selectedEntrance.lng,
    routeAccessPoints: [selectedEntrance],
    selectedEntrance
  };
}

function renderEntranceOptions(type, location) {
  const container = getEntranceSelectorForType(type);
  const entrances = getLocationEntranceOptions(location);

  if (!container) {
    return;
  }

  if (!location || entrances.length === 0) {
    container.hidden = true;
    container.innerHTML = "";
    container.dataset.selectedEntranceIndex = "0";
    return;
  }

  const selectedIndex = Math.min(Number(container.dataset.selectedEntranceIndex || 0), entrances.length - 1);
  container.dataset.selectedEntranceIndex = String(selectedIndex);
  container.hidden = false;
  container.innerHTML = `
    <label for="${type}EntranceSelect">${type === "start" ? "Start" : "Destination"} entrance</label>
    <select id="${type}EntranceSelect" class="entrance-select">
      ${entrances.map((point, index) => `
        <option value="${index}" ${index === selectedIndex ? "selected" : ""}>${getEntranceLabel(point)}</option>
      `).join("")}
    </select>
  `;

  container.querySelector("select").addEventListener("change", (event) => {
    container.dataset.selectedEntranceIndex = event.target.value;
    shouldFitRouteToMap = true;

    if (getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value)) {
      renderDirectionsPreview({ preservePanelState: true });
    }
  });
}

function syncEntranceOptions() {
  renderEntranceOptions("start", getLocationBySelectValue(fromLocationSelect.value));
  renderEntranceOptions("destination", getLocationBySelectValue(toLocationSelect.value));
}

function getEntranceSummaryMarkup(location, type, fallbackLabel) {
  const selectedEntrance = location?.selectedEntrance;

  if (!selectedEntrance) {
    return `<span>${fallbackLabel}</span>`;
  }

  return `
    <span>${fallbackLabel}</span>
    <small class="route-entrance-note">${getEntranceLabel(selectedEntrance)}</small>
  `;
}

function getLocationEntranceMarkup(location) {
  const entrances = getLocationEntranceOptions(location);

  if (!entrances.length) {
    return "";
  }

  return `
    <section class="detail-section detail-entrance-section">
      <h3>Entrances</h3>
      <div class="detail-entrance-list">
        ${entrances.map((point, index) => `
          <button class="detail-entrance-row" type="button" data-route-entrance="${index}">
            <span class="material-symbols-outlined" aria-hidden="true">${point.type === "accessible" ? "accessible" : "door_open"}</span>
            <span>
              <strong>${getEntranceLabel(point)}</strong>
              <span>${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}</span>
            </span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
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

function getPersonalPlaceItems() {
  const savedPlaces = getPersonalPlaceIndexes();

  return [
    savedPlaces.homeDorm !== null
      ? { type: "homeDorm", label: "Home Dorm", icon: "home", location: locations[savedPlaces.homeDorm] }
      : null,
    savedPlaces.mainClass !== null
      ? { type: "mainClass", label: "Main Class", icon: "school", location: locations[savedPlaces.mainClass] }
      : null
  ].filter(Boolean);
}

function renderSavedPlaceCard(item, options = {}) {
  const removeType = options.removeType || item.removeType || item.type || "";
  const card = document.createElement("article");
  card.className = "saved-place-card";
  card.innerHTML = `
    <button class="saved-place-main" type="button" aria-label="Open ${item.location.name}">
      <span class="material-symbols-outlined location-icon" aria-hidden="true">${item.icon || getLocationIcon(item.location)}</span>
      <span>
        <strong>${item.location.name}</strong>
        <span>${item.label || item.location.category}</span>
      </span>
    </button>
    <div class="saved-place-actions">
      <button class="icon-button saved-route-button" type="button" aria-label="Directions to ${item.location.name}" data-saved-route>
        <span class="material-symbols-outlined" aria-hidden="true">directions</span>
      </button>
      ${removeType ? `
        <button class="icon-button saved-remove-button" type="button" aria-label="Remove ${item.location.name}" data-saved-remove="${removeType}">
          <span class="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      ` : ""}
    </div>
  `;

  card.querySelector(".saved-place-main").addEventListener("click", () => selectLocation(item.location, { showDetails: true }));
  card.querySelector("[data-saved-route]").addEventListener("click", () => setRouteEndpoint("destination", item.location, { openDirections: true }));

  const removeButton = card.querySelector("[data-saved-remove]");
  if (removeButton) {
    removeButton.addEventListener("click", () => {
      if (removeButton.dataset.savedRemove === "favorite") {
        toggleFavoriteLocation(item.location);
      } else {
        removePersonalPlace(removeButton.dataset.savedRemove);
      }

      renderSavedPanel();
      renderLocations(getFilteredLocations());
      renderDirectionQuickPicks();

      if (activeLocationIndex === item.location.index) {
        renderSelectedLocation(item.location);
      }
    });
  }

  return card;
}

function renderSavedSection(title, items, options = {}) {
  const section = document.createElement("section");
  section.className = "saved-section";
  section.innerHTML = `<div class="rail-heading"><h3>${title}</h3></div>`;

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "saved-empty-state";
    empty.textContent = options.emptyText || "Nothing saved yet.";
    section.appendChild(empty);
    return section;
  }

  const list = document.createElement("div");
  list.className = "saved-place-list";

  items.forEach((item) => {
    list.appendChild(renderSavedPlaceCard(item, options));
  });

  section.appendChild(list);
  return section;
}

function renderSavedPanel() {
  if (!savedPanel || !savedPanelContent) {
    return;
  }

  const personalItems = getPersonalPlaceItems();
  const favoriteItems = getFavoriteLocationIndexes().map((index) => ({
    label: "Favorite",
    icon: "star",
    location: locations[index]
  }));
  const recentItems = getRecentLocationIndexes().map((index) => ({
    label: locations[index].category,
    icon: getLocationIcon(locations[index]),
    location: locations[index]
  }));
  const totalSaved = personalItems.length + favoriteItems.length;

  savedPanel.hidden = false;
  if (savedCount) {
    savedCount.textContent = totalSaved;
  }

  savedPanelContent.innerHTML = "";
  savedPanelContent.appendChild(renderSavedSection("Pinned Places", personalItems, {
    emptyText: "Set a home dorm or main class building from a location page."
  }));
  savedPanelContent.appendChild(renderSavedSection("Favorites", favoriteItems, {
    emptyText: "Favorite a building to keep it here.",
    removeType: "favorite"
  }));
  savedPanelContent.appendChild(renderSavedSection("Recently Viewed", recentItems, {
    emptyText: "Open a few campus locations and they will appear here."
  }));
}

function hideExploreRails() {
  [personalLocationsContainer, favoriteLocationsContainer, recentLocationsContainer].forEach((container) => {
    if (!container) {
      return;
    }

    container.hidden = true;
    container.innerHTML = "";
  });
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

function getFacultySearchMatches(query) {
  if (!query) {
    return [];
  }

  const matches = [];

  Object.entries(facultyOfficeHours).forEach(([buildingName, profile]) => {
    (profile.faculty || []).forEach((faculty) => {
      const haystack = `${faculty.name} ${faculty.room || ""} ${faculty.email || ""} ${buildingName}`.toLowerCase();

      if (haystack.includes(query)) {
        matches.push({ faculty, buildingName, profile });
      }
    });
  });

  return matches;
}

function getFacultySearchAvailabilityText(faculty) {
  const status = getFacultyAvailabilityStatus(faculty);

  if (status.isAvailable) {
    return "Available now";
  }

  return getNextFacultyScheduledText(faculty) || "No scheduled times";
}

function renderLocations(list) {
  resultsContainer.innerHTML = "";
  const query = searchInput.value.trim().toLowerCase();
  const facultyMatches = getFacultySearchMatches(query);
  resultCount.textContent = list.length + facultyMatches.length;
  hideExploreRails();
  renderSavedPanel();

  if (facultyMatches.length) {
    const heading = document.createElement("p");
    heading.className = "eyebrow";
    heading.textContent = "Faculty";
    resultsContainer.appendChild(heading);

    facultyMatches.forEach((match) => {
      const button = document.createElement("button");
      button.className = "location-button";
      button.type = "button";
      button.innerHTML = `
        <span class="material-symbols-outlined location-icon" aria-hidden="true">person</span>
        <strong>${match.faculty.name}</strong>
        <span>${getFacultySearchAvailabilityText(match.faculty)} &middot; ${match.faculty.room} &middot; ${match.buildingName}</span>
      `;

      button.addEventListener("click", () => {
        const building = locations.find((item) => item.name === match.buildingName);

        if (!building) {
          return;
        }

        selectLocation(building, { showDetails: true });

        setTimeout(() => {
          const section = selectedLocation.querySelector(".detail-faculty-section");

          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 60);
      });

      resultsContainer.appendChild(button);
    });
  }

  if (list.length === 0 && !facultyMatches.length) {
    resultsContainer.innerHTML = activeOpenNowFilter
      ? '<p class="empty-state">Nothing matches while the "Open now" filter is on. Some places do not have hours listed yet, so try turning the filter off.</p>'
      : '<p class="empty-state">No locations found. Try a building name, office, food spot, dorm, or professor name.</p>';
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
  if (bottomNav) {
    bottomNav.classList.remove("is-explore-active", "is-directions-active", "is-saved-active", "is-safety-active");
    bottomNav.classList.add(`is-${target}-active`);
  }

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
  sidebar.classList.remove("location-detail-active", "location-preview-active", "directions-detail-active");
  sidebar.classList.add("saved-panel-active");
  renderSavedPanel();
  setMobilePanelState("full");
  scrollPanelToTop();
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
  if (options.preserveView) {
    return;
  }

  setActiveBottomNav("directions");
  renderDirectionQuickPicks();
  sidebar.classList.add("directions-detail-active");
  sidebar.classList.remove("location-detail-active", "location-preview-active", "saved-panel-active");

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
  if (!sidebar) {
    return 0;
  }

  const transform = window.getComputedStyle(sidebar).transform;

  if (transform && transform !== "none") {
    const match = transform.match(/matrix.*\((.+)\)/);

    if (match) {
      const values = match[1].split(",").map((value) => Number(value.trim()));
      const translateY = values.length === 6 ? values[5] : values[13];

      if (Number.isFinite(translateY)) {
        return translateY;
      }
    }
  }

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

  if (panelDragMoved) {
    setMobilePanelState(getNearestPanelState(panelDragLatestTranslate));
  }

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

  if (event.pointerId !== undefined && sidebar.setPointerCapture) {
    sidebar.setPointerCapture(event.pointerId);
  }
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

  sheetSwipeStartedAt = 0;
  sidebar.classList.remove("is-dragging");
  sidebar.style.transform = "";

  if (event.pointerId !== undefined && sidebar.hasPointerCapture && sidebar.hasPointerCapture(event.pointerId)) {
    sidebar.releasePointerCapture(event.pointerId);
  }

  if (sheetSwipeMoved) {
    setMobilePanelState(getNearestPanelState(sheetSwipeLatestTranslate));
  }

  sheetSwipeMoved = false;
}

function focusMapOnLocation(location) {
  focusNavigationMapOnLocation(location);
}

function showSearchPanel() {
  setActiveBottomNav("explore");
  sidebar.classList.remove("location-detail-active", "directions-detail-active", "location-preview-active", "saved-panel-active");
  activeLocationName = "";
  activeLocationIndex = -1;
  renderLocations(getFilteredLocations());
  renderSavedPanel();
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

function getArrivalEtaText(minutes) {
  const eta = new Date(Date.now() + minutes * 60000);
  return formatHoursTime(eta.getHours() * 60 + eta.getMinutes());
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
  const windows = normalizeWeeklySchedule(profile.weekly)[day] || [];
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

function getBuildingWeeklyText(profile, day) {
  const windows = normalizeWeeklySchedule(profile.weekly)[day] || [];
  return windows.length ? formatHoursWindows(windows) : "";
}

function getBuildingWeeklyMarkup(profile) {
  const dayOrder = [1, 2, 3, 4, 5, 6, 0];
  const rows = dayOrder
    .map((day) => {
      const text = getBuildingWeeklyText(profile, day) || "—";
      return `<li><span class="faculty-hours-day">${scheduleDayNames[day]}</span><span class="faculty-hours-day-times">${text}</span></li>`;
    })
    .join("");

  return `
        <details class="faculty-hours-week">
          <summary>See full weekly schedule</summary>
          <ul class="faculty-hours-week-list">
            ${rows}
          </ul>
        </details>
      `;
}

function getLocationHoursMarkup(location) {
  const profile = getLocationHoursProfile(location);
  const status = getLocationHoursStatus(location);
  const weeklyMarkup = profile && profile.weekly ? getBuildingWeeklyMarkup(profile) : "";

  return `
    <section class="detail-section detail-hours-section">
      <h3>Hours</h3>
      <div class="hours-status-row">
        <span class="hours-status-dot ${status.className}" aria-hidden="true"></span>
        <strong>${status.heading}</strong>
      </div>
      <p><strong>Today:</strong> ${status.today}</p>
      ${weeklyMarkup}
      <p>${status.note}</p>
    </section>
  `;
}
function getFacultyHoursProfile(location) {
  return facultyOfficeHours[location.name] || null;
}

function normalizeFacultyWindows(windows) {
  if (!windows || !windows.length) {
    return [];
  }

  return Array.isArray(windows[0]) ? windows : [windows];
}

function formatFacultyWindows(windows) {
  windows = normalizeFacultyWindows(windows);

  if (!windows?.length) {
    return "";
  }

  return windows
    .slice()
    .sort((a, b) => a[0] - b[0])
    .map(([start, end]) => `${formatHoursTime(start)}-${formatHoursTime(end)}`)
    .join(", ");
}

function getFacultyAvailabilityStatus(faculty, date = new Date()) {
  const day = date.getDay();
  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  const officeWindows = normalizeFacultyWindows(normalizeWeeklySchedule(faculty.weekly)[day]);
  const appointmentWindows = normalizeFacultyWindows(normalizeWeeklySchedule(faculty.appointment)[day]);
  const officeText = formatFacultyWindows(officeWindows);
  const appointmentText = formatFacultyWindows(appointmentWindows);
  const todayParts = [];

  if (officeText) {
    todayParts.push(`Office hours ${officeText}`);
  }

  if (appointmentText) {
    todayParts.push(`Appointments ${appointmentText}`);
  }

  return {
    isAvailable: officeWindows.concat(appointmentWindows).some(([start, end]) => nowMinutes >= start && nowMinutes < end),
    today: todayParts.length ? todayParts.join("; ") : "No scheduled times today"
  };
}

const scheduleDayNames = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday"
};

const facultyDayNumbers = {
  sunday: 0,
  sun: 0,
  monday: 1,
  mon: 1,
  tuesday: 2,
  tues: 2,
  tue: 2,
  wednesday: 3,
  wed: 3,
  thursday: 4,
  thurs: 4,
  thur: 4,
  thu: 4,
  friday: 5,
  fri: 5,
  saturday: 6,
  sat: 6
};

function parseScheduleTime(value) {
  if (typeof value === "number") {
    return value;
  }

  const text = String(value).trim().toLowerCase().replace(/\s+/g, " ");
  let match = text.match(/^(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)$/);

  if (match) {
    let hours = Number(match[1]) % 12;

    if (match[3].startsWith("p")) {
      hours += 12;
    }

    return hours * 60 + Number(match[2] || 0);
  }

  match = text.match(/^(\d{1,2}):(\d{2})$/);

  if (match) {
    return Number(match[1]) * 60 + Number(match[2]);
  }

  match = text.match(/^(\d{1,2})$/);

  if (match) {
    return (Number(match[1]) % 24) * 60;
  }

  return NaN;
}

function normalizeScheduleWindows(windows) {
  if (!Array.isArray(windows)) {
    return [];
  }

  return windows
    .map((pair) => {
      if (!Array.isArray(pair) || pair.length < 2) {
        return null;
      }

      if (typeof pair[0] === "number" && typeof pair[1] === "number") {
        return [pair[0], pair[1]];
      }

      const start = parseScheduleTime(pair[0]);
      const end = parseScheduleTime(pair[1]);
      return Number.isFinite(start) && Number.isFinite(end) ? [start, end] : null;
    })
    .filter((pair) => pair && pair[0] < pair[1]);
}

function normalizeWeeklySchedule(schedule) {
  if (!schedule) {
    return {};
  }

  const normalized = {};

  Object.entries(schedule).forEach(([key, windows]) => {
    const keyText = String(key).trim().toLowerCase();
    let dayNumber = facultyDayNumbers[keyText];

    if (dayNumber === undefined && /^\d$/.test(keyText)) {
      dayNumber = Number(keyText);
    }

    if (dayNumber !== undefined) {
      normalized[dayNumber] = normalizeScheduleWindows(windows);
    }
  });

  return normalized;
}

function getFacultyDayWindows(faculty, day) {
  const dayWindows = [];
  normalizeFacultyWindows(normalizeWeeklySchedule(faculty.weekly)[day]).forEach(([start, end]) => {
    dayWindows.push({ start, end, kind: "office hours" });
  });
  normalizeFacultyWindows(normalizeWeeklySchedule(faculty.appointment)[day]).forEach(([start, end]) => {
    dayWindows.push({ start, end, kind: "appointments" });
  });
  return dayWindows.sort((a, b) => a.start - b.start);
}

function getFacultyDayText(faculty, day) {
  const officeText = formatFacultyWindows(normalizeWeeklySchedule(faculty.weekly)[day]);
  const appointmentText = formatFacultyWindows(normalizeWeeklySchedule(faculty.appointment)[day]);
  const parts = [];

  if (officeText) {
    parts.push(`Office hours ${officeText}`);
  }

  if (appointmentText) {
    parts.push(`Appointments ${appointmentText}`);
  }

  return parts.join("; ");
}

function getNextFacultyScheduledText(faculty, date = new Date()) {
  const today = date.getDay();
  const nowMinutes = date.getHours() * 60 + date.getMinutes();

  for (let offset = 0; offset < 8; offset += 1) {
    const checkDay = (today + offset) % 7;
    const dayWindows = getFacultyDayWindows(faculty, checkDay).filter((win) => offset > 0 || win.start > nowMinutes);

    if (!dayWindows.length) {
      continue;
    }

    const dayLabel = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : scheduleDayNames[checkDay];
    const text = dayWindows.map((win) => `${win.kind} ${formatHoursTime(win.start)}-${formatHoursTime(win.end)}`).join(", ");
    return `${dayLabel}: ${text}`;
  }

  return "";
}

function getFacultyWeeklyMarkup(faculty) {
  const dayOrder = [1, 2, 3, 4, 5, 6, 0];
  const rows = dayOrder
    .map((day) => {
      const text = getFacultyDayText(faculty, day) || "—";
      return `<li><span class="faculty-hours-day">${scheduleDayNames[day]}</span><span class="faculty-hours-day-times">${text}</span></li>`;
    })
    .join("");

  return `
        <details class="faculty-hours-week">
          <summary>See full weekly schedule</summary>
          <ul class="faculty-hours-week-list">
            ${rows}
          </ul>
        </details>
      `;
}

let emailComposeAttemptId = 0;

function openFacultyEmailCompose(faculty) {
  if (!faculty?.email) {
    return;
  }

  const email = faculty.email;
  const mailtoUrl = `mailto:${email}`;
  const outlookDeepLink = `ms-outlook://compose?to=${encodeURIComponent(email)}`;

  // A mail app can take a few seconds to come to the front on a phone, so we look for any sign
  // that another app took over instead of trusting the clock alone. If we see none, we fall back
  // to the phone's default mail app.
  const attemptId = (emailComposeAttemptId += 1);
  let appTookOver = false;
  let fallbackTimer = 0;

  const stopWatching = () => {
    window.clearTimeout(fallbackTimer);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("blur", handleAppTookOver);
    window.removeEventListener("pagehide", handleAppTookOver);
  };

  const handleAppTookOver = () => {
    appTookOver = true;
    stopWatching();
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      handleAppTookOver();
    }
  };

  const openDefaultMailApp = () => {
    stopWatching();

    if (attemptId !== emailComposeAttemptId || appTookOver || document.visibilityState === "hidden") {
      return;
    }

    window.location.href = mailtoUrl;
  };

  // Watch for the hand-off BEFORE launching Outlook so a quick app switch is never missed.
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleAppTookOver);
  window.addEventListener("pagehide", handleAppTookOver);
  fallbackTimer = window.setTimeout(openDefaultMailApp, outlookEmailFallbackDelayMs);

  window.location.href = outlookDeepLink;
}

function getFacultyHoursMarkup(location) {
  const profile = getFacultyHoursProfile(location);

  if (!profile || !profile.faculty?.length) {
    return "";
  }

  const now = new Date();
  const entries = profile.faculty
    .map((faculty) => ({ faculty, status: getFacultyAvailabilityStatus(faculty, now), next: getNextFacultyScheduledText(faculty, now) }))
    .sort((a, b) => (b.status.isAvailable === a.status.isAvailable
      ? a.faculty.name.localeCompare(b.faculty.name)
      : (b.status.isAvailable ? 1 : 0) - (a.status.isAvailable ? 1 : 0)));
  const availableCount = entries.filter((entry) => entry.status.isAvailable).length;

  return `
    <section class="detail-section detail-faculty-section">
      <h3>Faculty Office Hours</h3>
      <div class="hours-status-row">
        <span class="hours-status-dot ${availableCount ? "open" : "closed"}" aria-hidden="true"></span>
        <strong>${availableCount} of ${entries.length} faculty available right now</strong>
      </div>
      <ul class="faculty-hours-list">
        ${entries.map((entry) => `
          <li class="faculty-hours-item${entry.status.isAvailable ? " is-available" : ""}">
            <div class="faculty-hours-top">
              <span class="faculty-hours-dot${entry.status.isAvailable ? " open" : ""}" aria-hidden="true"></span>
              <strong>${entry.faculty.name}</strong>
              <span class="faculty-hours-room">${entry.faculty.room}</span>
            </div>
            <p class="faculty-hours-today"><strong>Today:</strong> ${entry.status.today}</p>
            ${!entry.status.isAvailable && entry.next ? `<p class="faculty-hours-next"><strong>Next:</strong> ${entry.next}</p>` : ""}
            ${entry.faculty.email ? `<button class="faculty-hours-email" type="button" data-faculty-email="${entry.faculty.email}">${entry.faculty.email}</button>` : ""}
            ${getFacultyWeeklyMarkup(entry.faculty)}
            ${entry.faculty.note ? `<p class="faculty-hours-note">${entry.faculty.note}</p>` : ""}
          </li>
        `).join("")}
      </ul>
      <p class="faculty-hours-source">${profile.source}</p>
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

function getBestForMarkup(profile) {
  if (!profile.bestFor?.length) {
    return "";
  }

  return `
    <section class="detail-section detail-best-section">
      <h3>Best For</h3>
      ${getDetailListMarkup(profile.bestFor)}
    </section>
  `;
}

function getVisitInfoMarkup(profile) {
  const rows = [
    profile.mainEntrance ? { icon: "login", label: "Main Entrance", value: profile.mainEntrance } : null,
    profile.accessibility ? { icon: "accessible", label: "Accessibility", value: profile.accessibility } : null,
    profile.insideTip ? { icon: "stairs", label: "Inside Tip", value: profile.insideTip } : null
  ].filter(Boolean);

  if (!rows.length) {
    return "";
  }

  return `
    <section class="detail-section detail-visit-section">
      <h3>Visit Info</h3>
      <div class="detail-info-row-list">
        ${rows.map((row) => `
          <div class="detail-info-row">
            <span class="material-symbols-outlined" aria-hidden="true">${row.icon}</span>
            <span>
              <strong>${row.label}</strong>
              <span>${row.value}</span>
            </span>
          </div>
        `).join("")}
      </div>
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
  const bestForMarkup = getBestForMarkup(profile);
  const visitInfoMarkup = getVisitInfoMarkup(profile);
  const entranceMarkup = getLocationEntranceMarkup(location);
  const highlightsMarkup = getHighlightsMarkup(profile);
  const floorNotesMarkup = getFloorNotesMarkup(profile);
  const detailNotesMarkup = getDetailNotesMarkup(profile);
  const arrivalTipMarkup = getArrivalTipMarkup(profile);
  const contactMarkup = getLocationContactMarkup(location);
  const hoursMarkup = getLocationHoursMarkup(location);
  const facultyHoursMarkup = getFacultyHoursMarkup(location);
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
    ${bestForMarkup}
    ${highlightsMarkup}
    ${floorNotesMarkup}
    ${visitInfoMarkup}
    ${entranceMarkup}
    ${hoursMarkup}
    ${contactMarkup}
    ${facultyHoursMarkup}
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
  selectedLocation.querySelectorAll("[data-route-entrance]").forEach((button) => {
    button.addEventListener("click", () => {
      setRouteEndpoint("destination", location, { openDirections: true, entranceIndex: Number(button.dataset.routeEntrance) });
    });
  });

  selectedLocation.querySelectorAll("[data-faculty-email]").forEach((button) => {
    button.addEventListener("click", () => {
      openFacultyEmailCompose({ email: button.dataset.facultyEmail });
    });
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
      renderSavedPanel();
      renderDirectionQuickPicks();
    });
  });

  selectedLocation.querySelector("[data-favorite-action]").addEventListener("click", () => {
    toggleFavoriteLocation(location);
    renderSelectedLocation(location);
    renderLocations(getFilteredLocations());
    renderSavedPanel();
    renderDirectionQuickPicks();
  });
}

function isLocationOpenNow(location) {
  return getLocationHoursStatus(location).className === "open";
}

function getFilteredLocations() {
  const query = searchInput.value.trim().toLowerCase();
  const layerMatches = (location) => activeLayer === "All" || location.layer === activeLayer;
  const queryMatches = (location) => !query || getSearchText(location).includes(query);
  const openNowMatches = (location) => !activeOpenNowFilter || isLocationOpenNow(location);

  return locations.filter((location) => layerMatches(location) && queryMatches(location) && openNowMatches(location));
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
  const includeCurrentLocation = Boolean(options.includeCurrentLocation);
  const matches = [];

  if (includeCurrentLocation && (!query || "current location".includes(query))) {
    matches.push({
      label: "Current Location",
      detail: currentPosition ? "Use your live GPS position" : "Use your live GPS position — tap to locate",
      value: "Current Location",
      location: {
        name: "Current Location",
        lat: currentPosition?.lat,
        lng: currentPosition?.lng
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
        resetEntranceSelectionForField(field);
      } else if (field === toLocationSelect) {
        resetEntranceSelectionForField(field);
      }
      updateRouteActionButton();
      hideRouteSuggestions(suggestionsBox);
      shouldFitRouteToMap = true;

      // Auto-preview AFTER selecting 2 buildings / Current Location -> building.
      // Then Get Directions / Go / Steps enters the directions feature.
      const nextField = field === fromLocationSelect ? toLocationSelect : fromLocationSelect;
      previewAfterFieldSelection(nextField);
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

function hasRouteCoordinates(location) {
  return Number.isFinite(location?.lat) && Number.isFinite(location?.lng);
}

function needsCurrentGpsForForm() {
  return routeUsesCurrentLocation() && !hasRouteCoordinates(getLocationBySelectValue(fromLocationSelect.value));
}

function requestPreviewGpsFix() {
  if (!canUseCurrentLocation()) {
    return;
  }
  setLocationStatus("<strong>Finding your current location...</strong><br>Your browser may ask for permission.");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      updateCurrentLocation(position, "fixed");
      if (!isRouteStepViewActive
        && getLocationBySelectValue(toLocationSelect.value)
        && hasRouteCoordinates(getLocationBySelectValue(fromLocationSelect.value))) {
        shouldFitRouteToMap = true;
        renderDirectionsPreview();
      }
    },
    (error) => {
      setLocationStatus(getLocationErrorMessage(error), { isError: true });
      expandMobilePanel();
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}

// Pops the route preview the moment both ends resolve to real locations, and
// reports whether it did so callers can fall back to their own prompt.
function previewAfterFieldSelection(fallbackField) {
  const fromFilled = Boolean(fromLocationSelect.value.trim());
  const toFilled = Boolean(toLocationSelect.value.trim());

  // The preview pops as soon as both ends are chosen — two buildings, or
  // Current Location -> building. A typed value alone is not enough: it must
  // resolve to a real location first (otherwise the preview card flashes the
  // "choose the closest matching suggestion" message on every keystroke).
  const fromLocation = fromFilled ? getLocationBySelectValue(fromLocationSelect.value) : null;
  const toLocation = toFilled ? getLocationBySelectValue(toLocationSelect.value) : null;

  if (fromFilled && toFilled && fromLocation && toLocation) {
    shouldFitRouteToMap = true;
    // Current Location -> building: preview the prompt + route line now so the
    // directions card pops, then GPS fills in the real start when it lands.
    renderDirectionsPreview();
    if (needsCurrentGpsForForm()) {
      requestPreviewGpsFix();
    }
    return true;
  }

  syncCurrentLocationMarker({ centerMap: false });
  fallbackField?.focus();
  return false;
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

// Every input that changes what the preview would look like. Comparing this
// single string is deterministic: it cannot drift the way re-deriving endpoints
// and re-reading DOM entrance state at click time did.
function getRouteFormStateKey() {
  return [
    normalizeRouteInput(fromLocationSelect.value),
    normalizeRouteInput(toLocationSelect.value),
    getSelectedEntranceKey("start"),
    getSelectedEntranceKey("destination"),
    routePreferenceSelect?.value || "fastest"
  ].join("|");
}

function isPreviewCurrentForForm() {
  if (!latestRoutePreview) {
    return false;
  }

  if (!directionsOutput?.querySelector(".route-preview-card")) {
    return false;
  }

  return latestRoutePreview.formStateKey === getRouteFormStateKey();
}

function getRouteSignature(start, end) {
  const startKey = start.name === "Current Location"
    ? "Current Location"
    : `${start.name}:${Number(start.lat).toFixed(5)},${Number(start.lng).toFixed(5)}`;
  const endKey = `${end.name}:${Number(end.lat).toFixed(5)},${Number(end.lng).toFixed(5)}`;
  return `${startKey}->${endKey}`;
}

function updateRouteIssueButton() {
  updateArModeButton();
  updateRouteDock();

  if (!reportCurrentRouteIssueButton) {
    return;
  }

  reportCurrentRouteIssueButton.hidden = !latestRoutePreview;
}

function reportLatestRouteIssue(issueType = "") {
  if (!latestRoutePreview) {
    openFeedbackModal({
      type: "Route issue",
      status: "Choose a route first so the app can attach start and destination details.",
      message: "Issue type: Describe the route problem\n\nWhat should be fixed: "
    });
    return;
  }

  openRouteIssueReporter(latestRoutePreview.route, latestRoutePreview.routePreferenceLabel, issueType);
}
function renderDirectionsPreview(options = {}) {
  const startBase = getLocationBySelectValue(fromLocationSelect.value);
  const endBase = getLocationBySelectValue(toLocationSelect.value);
  syncEntranceOptions();
  const start = getRoutePointForEndpoint(startBase, "start");
  const end = getRoutePointForEndpoint(endBase, "destination");
  const isCurrentLocationStart = isCurrentLocationInput(fromLocationSelect.value);
  const routePreference = routePreferenceSelect?.value || "fastest";
  const routePreferenceLabel = routePreferenceLabels[routePreference] || "Fastest route";
  // A silent live-GPS refresh must never close the step navigator: "Steps"
  // mode depends on the swipeable carousel staying on screen while the user
  // walks, and the automatic live tracking that starts on page load ticks
  // every few seconds.
  const shouldShowStepNavigator = options.silentRefresh
    ? isRouteStepViewActive
    : Boolean(options.showStepNavigator);
  const canRouteWithoutGps = Boolean(
    startBase
    && endBase
    && hasRouteCoordinates(startBase)
    && hasRouteCoordinates(endBase)
  );
  const waitingOnGps = isCurrentLocationStart && !canRouteWithoutGps && !options.silentRefresh;
  // Live tracking auto-starts on page load and ticks every few seconds. For a
  // fixed building-to-building route none of that can change the preview, so
  // skip the rebuild and leave the card, step carousel, and dock untouched.
  if (options.silentRefresh
    && !isCurrentLocationStart
    && latestRoutePreview
    && latestRoutePreview.formStateKey === getRouteFormStateKey()) {
    updateRouteDock();
    return latestRoutePreview;
  }

  // Live GPS ticks must never pop, clear, or overwrite the panel on their own.
  // If we still have no fix, keep whatever the user already sees.
  if (options.silentRefresh && isCurrentLocationStart && !canRouteWithoutGps) {
    updateRouteDock();
    return latestRoutePreview;
  }
  // The arrival dock belongs to the Go/Steps phase only. A plain route preview keeps the
  // bottom sheet visible so the time estimate and the Go/Steps button can be read.
  // Silent GPS refreshes must not flip the phase by themselves.
  if (!options.silentRefresh) {
    isRouteStepViewActive = shouldShowStepNavigator;
  }

  openDirectionsPanel({ preservePanelState: options.preservePanelState, preserveView: options.silentRefresh });
  if ((!start || !end) && !waitingOnGps && !(options.silentRefresh && latestRoutePreview)) {
    isRouteStepViewActive = false;
    latestRoutePreview = null;
    latestDirectionSteps = [];
    routeInstructionPoints = [];
    isGuidedNavigationActive = false;
    hideRouteStepNavigator();
    directionsOutput.textContent = "Type a campus location and choose the closest matching suggestion for From and To.";
    updateRouteIssueButton();
    refreshGetDirectionsButtonLabel();
    hideLocationStatus();
    syncCurrentLocationMarker({ centerMap: false });
    return null;
  }

  if (waitingOnGps) {
    // Gated preview: keep the "waiting on GPS" prompt until a fix arrives.
    // Get Directions explicitly asks for GPS (see previewRouteFromForm), so
    // this message only sticks around while the lookup is in flight or the
    // user denied/failed it. Auto-refresh paths never write to the panel.
    isRouteStepViewActive = false;
    if (!options.silentRefresh) {
      hideRouteStepNavigator();
      directionsOutput.innerHTML = `
        <strong>Waiting for your current location...</strong>
        <br>
        Finding you now — your browser may ask for permission. If nothing appears, tap Set My Location or Start Live Tracking, then push Get Directions again.
      `;
      updateRouteIssueButton();
      refreshGetDirectionsButtonLabel();
      hideLocationStatus();
    }
    syncCurrentLocationMarker({ centerMap: false });
    return null;
  }

  if (start.name === end.name) {
    isRouteStepViewActive = false;
    latestRoutePreview = null;
    latestDirectionSteps = [];
    routeInstructionPoints = [];
    isGuidedNavigationActive = false;
    hideRouteStepNavigator();
    directionsOutput.textContent = "Your starting point and destination are the same.";
    updateRouteIssueButton();
    refreshGetDirectionsButtonLabel();
    syncCurrentLocationMarker({ centerMap: false });
    return null;
  }

  if (!window.CampusNavigation) {
    const walkingMinutes = estimateWalkingMinutes(start, end);
    const estimateText = walkingMinutes
      ? ` Estimated walking time: about ${walkingMinutes} minute${walkingMinutes === 1 ? "" : "s"}.`
      : "";
    isRouteStepViewActive = false;
    latestRoutePreview = null;
    updateRouteIssueButton();
    refreshGetDirectionsButtonLabel();

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
    // A live GPS tick must never destroy an active Go/Steps session because of
    // one transient fix (e.g. a missing coordinate). Keep the existing preview.
    if (options.silentRefresh && latestRoutePreview) {
      updateRouteDock();
      return latestRoutePreview;
    }

    isRouteStepViewActive = false;
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
    updateRouteIssueButton();
    refreshGetDirectionsButtonLabel();
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
  latestRoutePreview = {
    route,
    start,
    end,
    routePreferenceLabel,
    formStateKey: getRouteFormStateKey()
  };
  updateRouteIssueButton();
  latestDirectionSteps = directionSteps.length
    ? directionSteps
    : [{ instruction: `Continue to ${end.name}`, distance: route.distanceMeters || 1 }];
  routeInstructionPoints = buildRouteInstructionPoints(route, start, end, latestDirectionSteps);

  // A silent live-GPS refresh must not restart the navigation session. Without
  // this, the tick that lands right after the user arrives would clear
  // hasAnnouncedRouteArrival and throw the dock back into "still walking" mode.
  if (!options.silentRefresh) {
    activeRouteStepIndex = 0;
    isGuidedNavigationActive = false;
    hasAnnouncedRouteArrival = false;
  }
  // Refresh after the state above is settled, so the dock reads the new route's mode.
  updateRouteDock();
  const stepsMarkup = directionSteps
    .map((step, index) => `
        <li>
          <button type="button" class="route-step-item" data-route-step="${index}">
            <span class="route-step-number" aria-hidden="true">${index + 1}</span>
            <span class="route-step-copy">${step.instruction} for ${formatRouteDistance(step.distance)}.</span>
          </button>
        </li>
    `)
    .join("");

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
            ${getEntranceSummaryMarkup(start, "start", start.name)}
          </div>
        </div>
        <div class="route-endpoint-row">
          <span class="material-symbols-outlined destination-dot" aria-hidden="true">location_on</span>
          <div>
            <strong>Destination</strong>
            ${getEntranceSummaryMarkup(end, "destination", end.name)}
          </div>
        </div>
      </div>

      <div class="route-metric-grid" aria-label="Route estimate">
        <div class="route-metric-card primary-route-metric">
          <span>Estimated Time</span>
          <strong>${route.minutes} min</strong>
          <small class="route-metric-note">arrives ~${getArrivalEtaText(route.minutes)}</small>
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
          <span>Directions Steps</span>
          <strong>${latestDirectionSteps.length}</strong>
        </div>
      </div>

      <button id="routePreviewAction" class="primary-button route-preview-action" type="button">
        <span class="material-symbols-outlined" aria-hidden="true">${isCurrentLocationStart ? "near_me" : "format_list_numbered"}</span>
        ${isCurrentLocationStart ? "Go" : "Steps"}
      </button>

      <p class="route-preference-card">${route.preferenceNote}</p>

      <details class="route-step-details" open>
        <summary>Step-by-step directions</summary>
        <ol class="route-steps">
          <li>Start at ${start.name}.</li>
          ${stepsMarkup}
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

  // The Go/Steps button lives right beside the preview's time estimate.
  const routePreviewActionButton = directionsOutput.querySelector("#routePreviewAction");

  if (routePreviewActionButton) {
    routePreviewActionButton.addEventListener("click", handleRouteAction);
  }

  const stepButtons = Array.from(directionsOutput.querySelectorAll("[data-route-step]"));

  function highlightActiveRouteStep() {
    stepButtons.forEach((button) => {
      button.classList.toggle("is-active", Number(button.dataset.routeStep) === activeRouteStepIndex);
    });
  }

  stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeRouteStepIndex = Number(button.dataset.routeStep);
      highlightActiveRouteStep();
      focusRouteStepOnMap(activeRouteStepIndex);
      if (isMobilePanelEnabled()) {
        setMobilePanelState("collapsed");
      }
    });
  });

  highlightActiveRouteStep();

  drawNavigationRoute(route, start, end, { fitBounds: shouldFitThisRoute });
  if (shouldShowStepNavigator) {
    renderRouteStepNavigator();
  } else {
    hideRouteStepNavigator();
  }
  refreshGetDirectionsButtonLabel();
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

function buildRouteInstructionPoints(route, start, end, displaySteps) {
  const points = [start, ...(route?.path || []), end].filter((point) => point?.lat && point?.lng);
  const stepCount = displaySteps.length;

  if (!points.length || stepCount <= 0) {
    return [];
  }

  const steps = route?.steps || [];
  const hasAnchors = steps.length >= stepCount && displaySteps.every((step) => Number.isInteger(step.nodeIndex));

  if (!hasAnchors) {
    return Array.from({ length: stepCount }, (_, index) => {
      const pointIndex = Math.min(points.length - 1, Math.round((index / Math.max(1, stepCount - 1)) * (points.length - 1)));
      return points[pointIndex];
    });
  }

  return Array.from({ length: stepCount }, (_, index) => {
    if (index === stepCount - 1) {
      return points[points.length - 1];
    }

    const pointIndex = Math.min(points.length - 2, Math.max(0, displaySteps[index].nodeIndex + 1));
    return points[pointIndex];
  });
}

function hideRouteStepNavigator() {
  if (!routeStepNavigator) {
    return;
  }

  routeStepNavigator.hidden = true;
  routeStepNavigator.innerHTML = "";
  routeStepNavigator.classList.remove("is-active");
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

  const nextIndex = Math.max(0, Math.min(index, latestDirectionSteps.length - 1));

  if (options.source === "swipe" && nextIndex === activeRouteStepIndex) {
    return;
  }

  activeRouteStepIndex = nextIndex;

  // A swipe has already moved the carousel, so only refresh highlights instead of rebuilding it.
  if (options.source === "swipe") {
    syncStepsCarousel();
  } else {
    renderRouteStepNavigator();
  }

  if (options.focusMap !== false) {
    focusRouteStepOnMap(activeRouteStepIndex);
  }

  syncRouteDockSteps();
}

function getGuidedStepMeters() {
  if (!currentPosition || !routeInstructionPoints.length) {
    return null;
  }

  const nextPoint = routeInstructionPoints[Math.min(activeRouteStepIndex + 1, routeInstructionPoints.length - 1)];
  return nextPoint ? getDistanceBetweenPoints(currentPosition, nextPoint) * 1609.344 : null;
}

function getNextInstructionPreview() {
  const nextStep = latestDirectionSteps[activeRouteStepIndex + 1];
  return nextStep ? nextStep.instruction : `Arrive at ${latestRoutePreview?.end?.name || "your destination"}`;
}

function getGuidedStepDetailText() {
  const isLastStep = activeRouteStepIndex === latestDirectionSteps.length - 1;
  const meters = getGuidedStepMeters();
  const distanceText = Number.isFinite(meters) ? `${formatArDistance(meters)} to go · ` : "";

  return isLastStep
    ? `${distanceText}You are on the last stretch.`
    : `${distanceText}Then: ${getNextInstructionPreview()}`;
}

function refreshGuidedBanner() {
  if (!isGuidedNavigationActive || !routeStepNavigator) {
    return;
  }

  const detail = routeStepNavigator.querySelector("#guidedStepDetail");

  if (detail) {
    setTextIfChanged(detail, getGuidedStepDetailText());
  }
}

function renderRouteStepNavigator() {
  if (!routeStepNavigator || !latestDirectionSteps.length) {
    hideRouteStepNavigator();
    return;
  }

  // "Go" mode (route starts at your location) gets one banner that advances by itself.
  // "Steps" mode (building to building) gets swipeable step cards.
  routeStepNavigator.hidden = false;

  if (isGuidedNavigationActive) {
    renderGuidedStepBanner();
  } else {
    renderStepsCarousel();
  }
}

function renderGuidedStepBanner() {
  const step = latestDirectionSteps[activeRouteStepIndex];
  const isLastStep = activeRouteStepIndex === latestDirectionSteps.length - 1;
  const destinationName = latestRoutePreview?.end?.name || "your destination";

  routeStepNavigator.innerHTML = `
    <div class="route-step-card is-guiding">
      <div class="route-step-copy">
        <span>Go · Step ${activeRouteStepIndex + 1} of ${latestDirectionSteps.length}</span>
        <strong>${isLastStep ? `Arrive at ${destinationName}` : step.instruction}</strong>
        <small id="guidedStepDetail">${getGuidedStepDetailText()}</small>
      </div>
    </div>
  `;
}

function renderStepsCarousel() {
  const slides = latestDirectionSteps.map((step, index) => `
      <article class="route-step-slide ${index === activeRouteStepIndex ? "is-active" : ""}" data-step-slide="${index}" role="listitem">
        <span class="route-step-slide-number" aria-hidden="true">${index + 1}</span>
        <div class="route-step-copy">
          <strong>${step.instruction}</strong>
          <small>${formatRouteDistance(step.distance)}</small>
        </div>
      </article>
  `).join("");

  const dots = latestDirectionSteps
    .map((step, index) => `<span class="route-step-dot ${index === activeRouteStepIndex ? "is-active" : ""}"></span>`)
    .join("");

  routeStepNavigator.innerHTML = `
    <div class="route-step-carousel-wrap">
      <div id="routeStepCarousel" class="route-step-carousel" role="list" aria-label="Route steps. Swipe left or right to preview each step.">
        ${slides}
      </div>
      <div class="route-step-dots" aria-hidden="true">${dots}</div>
    </div>
  `;

  const carousel = routeStepNavigator.querySelector("#routeStepCarousel");

  if (!carousel) {
    return;
  }

  carousel.scrollLeft = activeRouteStepIndex * carousel.clientWidth;
  carousel.addEventListener("scroll", handleStepsCarouselScroll, { passive: true });
}

function handleStepsCarouselScroll(event) {
  if (isSyncingCarousel) {
    return;
  }

  const carousel = event.currentTarget;
  window.clearTimeout(stepsScrollTimer);

  // Wait for the swipe to settle, then snap the active step to the nearest card.
  stepsScrollTimer = window.setTimeout(() => {
    const slideWidth = carousel.clientWidth || 1;
    setActiveRouteStep(Math.round(carousel.scrollLeft / slideWidth), { focusMap: true, source: "swipe" });
  }, 130);
}

function syncStepsCarousel() {
  if (!routeStepNavigator) {
    return;
  }

  routeStepNavigator.querySelectorAll("[data-step-slide]").forEach((slide) => {
    slide.classList.toggle("is-active", Number(slide.dataset.stepSlide) === activeRouteStepIndex);
  });

  routeStepNavigator.querySelectorAll(".route-step-dot").forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeRouteStepIndex);
  });

  const carousel = routeStepNavigator.querySelector("#routeStepCarousel");

  if (!carousel) {
    return;
  }

  isSyncingCarousel = true;
  carousel.scrollTo({ left: activeRouteStepIndex * carousel.clientWidth, behavior: "smooth" });
  window.setTimeout(() => {
    isSyncingCarousel = false;
  }, 340);
}

function advanceGuidedNavigationIfNeeded() {
  if (!isGuidedNavigationActive || !currentPosition || !routeInstructionPoints.length) {
    return;
  }

  if (navigationMap) {
    navigationMap.setView([currentPosition.lat, currentPosition.lng], 19, { animate: true });
  }

  // Keep the "36 m to go · Then: ..." line live as the user walks.
  refreshGuidedBanner();

  const nextPoint = routeInstructionPoints[Math.min(activeRouteStepIndex + 1, routeInstructionPoints.length - 1)];
  const distanceMeters = getDistanceBetweenPoints(currentPosition, nextPoint) * 1609.344;
  const isLastStep = activeRouteStepIndex === latestDirectionSteps.length - 1;

  if (isLastStep) {
    if (!hasAnnouncedRouteArrival && distanceMeters < 15) {
      hasAnnouncedRouteArrival = true;
      isGuidedNavigationActive = false;
      offRouteFixCount = 0;
      offRouteAnnounced = false;
      navigator.vibrate?.([90, 60, 90]);
      setMobilePanelState(isMobilePanelEnabled() ? "half" : "full");
      setActiveRouteStep(activeRouteStepIndex, { focusMap: false });
      setLocationStatus("<strong>You have arrived! 🎉</strong><br>You reached your destination.");
      updateRouteDock();
    }
    return;
  }

  const wentOffRoute = updateOffRouteTracking(getMetersToRoutePath(currentPosition));

  if (wentOffRoute || offRouteAnnounced) {
    showOffRouteBanner();
    return;
  }

  if (distanceMeters < 18) {
    setActiveRouteStep(activeRouteStepIndex + 1, { focusMap: false });
    navigator.vibrate?.(50);
  }
}

function getMetersToRoutePath(point) {
  const pathPoints = latestRoutePreview?.route?.path || [];

  if (!pathPoints.length) {
    return Infinity;
  }

  let nearest = Infinity;
  pathPoints.forEach((vertex) => {
    const distanceMeters = getDistanceBetweenPoints(point, vertex) * 1609.344;

    if (distanceMeters < nearest) {
      nearest = distanceMeters;
    }
  });

  return nearest;
}

function updateOffRouteTracking(distanceMeters) {
  if (distanceMeters <= 45) {
    offRouteFixCount = 0;

    if (offRouteAnnounced) {
      offRouteAnnounced = false;
      renderRouteStepNavigator();
    }

    return false;
  }

  offRouteFixCount += 1;

  if (offRouteFixCount >= 2 && !offRouteAnnounced) {
    offRouteAnnounced = true;
    navigator.vibrate?.([60, 40, 60]);
    return true;
  }

  return offRouteAnnounced;
}

function showOffRouteBanner() {
  if (!routeStepNavigator) {
    return;
  }

  routeStepNavigator.hidden = false;
  routeStepNavigator.innerHTML = `
    <div class="route-step-card is-offroute">
      <div class="route-step-copy" aria-live="polite">
        <span>Off route</span>
        <strong>You left the highlighted path</strong>
        <small>Walk back toward the gold line, or recalculate from where you are now.</small>
      </div>
      <div class="route-step-controls">
        <button class="route-step-control route-recalc-button" type="button" data-recalc-route>Recalculate</button>
      </div>
    </div>
  `;

  routeStepNavigator.querySelector("[data-recalc-route]").addEventListener("click", recalculateRouteFromCurrentPosition);
}

function recalculateRouteFromCurrentPosition() {
  if (!currentPosition || !latestRoutePreview) {
    return;
  }

  offRouteFixCount = 0;
  offRouteAnnounced = false;
  fromLocationSelect.value = "Current Location";
  routeStartManuallyChanged = false;

  const preview = renderDirectionsPreview({ preservePanelState: true, showStepNavigator: true });

  if (preview) {
    // Re-routing mid-walk keeps the user in the same full-screen feature.
    document.body.classList.add("route-feature-active");
    startGuidedNavigation();
    updateRouteDock();
  }
}

function startGuidedNavigation() {
  if (!latestRoutePreview || !routeUsesCurrentLocation()) {
    return;
  }

  isGuidedNavigationActive = true;
  hasAnnouncedRouteArrival = false;
  offRouteFixCount = 0;
  // The map only follows the user while live tracking is feeding positions in.
  // If it was stopped (or auto-start was denied earlier), turn it back on now
  // so the guided phase actually advances as the user walks.
  if (!isLiveTracking) {
    toggleLiveTracking();
  }

  offRouteAnnounced = false;
  setMobilePanelState("collapsed");
  setActiveRouteStep(0, { focusMap: false });
  updateRouteDock();
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
        distance: step.distance,
        nodeIndex: step.nodeIndex
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

  // Same rule as the dropdown picks: the preview pops as soon as both ends are
  // known — two buildings, or Current Location -> building. This click is a
  // user gesture, so the GPS fix Current Location needs can be asked for here.
  if (previewAfterFieldSelection(null)) {
    return;
  }

  if (options.openDirections) {
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

  navigationMap = L.map("navigationMap", {
    attributionControl: false,
    minZoom: 16,
    maxBounds: L.latLngBounds(campusMapBounds),
    maxBoundsViscosity: 1.0
  }).setView(jcsuCenter, 17);
  L.control.attribution({
    position: "topright",
    prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a>'
  }).addTo(navigationMap);

  setNavigationBasemap(basemapSelect ? basemapSelect.value : "imagery");

  navigationMarkerLayer = L.layerGroup().addTo(navigationMap);
  navigationLabelLayer = L.layerGroup().addTo(navigationMap);
  navigationRouteLayer = L.layerGroup().addTo(navigationMap);
  currentLocationLayer = L.layerGroup().addTo(navigationMap);
  addNavigationLegend();
  renderNavigationMarkers(getFilteredLocations());
  navigationMap.on("zoomend", () => renderNavigationMarkers(getFilteredLocations()));
  refreshNavigationMapLayout();
}

function getLayerStyle(layer) {
  return layerStyles[layer] || { label: layer, color: "#1c4f9c" };
}

function setNavigationBasemap(type = "imagery") {
  if (!navigationMap || !window.L) {
    return;
  }

  const basemap = basemapOptions[type] || basemapOptions.imagery;

  if (navigationBaseLayer) {
    navigationMap.removeLayer(navigationBaseLayer);
  }

  navigationBaseLayer = L.tileLayer(basemap.url, basemap.options).addTo(navigationMap);

  if (basemapSelect && basemapSelect.value !== type) {
    basemapSelect.value = type;
  }
}

const labelMeasureContext = typeof document !== "undefined" && document.createElement
  ? document.createElement("canvas").getContext("2d")
  : null;

function measureMapLabelText(text, fontSize) {
  if (!labelMeasureContext) {
    return String(text).length * 5.4;
  }

  labelMeasureContext.font = `800 ${fontSize}px "Segoe UI", system-ui, sans-serif`;
  return labelMeasureContext.measureText(text).width;
}

function estimateMapLabelWidth(name, zoom) {
  const fontSize = zoom >= 19 ? 9.28 : 8.32;
  const textWidth = Math.min(measureMapLabelText(name, fontSize) * 1.15, 118);
  return Math.round(9 + 3 + textWidth);
}

function planBuildingLabelPlacements(candidates, map, zoom) {
  const labelHalfHeight = 8;
  const sideGap = 3;
  const placed = [];
  const overlaps = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

  candidates.forEach((candidate) => {
    const point = map.latLngToContainerPoint([candidate.location.lat, candidate.location.lng]);
    const width = estimateMapLabelWidth(candidate.location.name, zoom);
    const rightRect = [point.x + sideGap, point.y - labelHalfHeight, point.x + sideGap + width, point.y + labelHalfHeight];
    const leftRect = [point.x - sideGap - width, point.y - labelHalfHeight, point.x - sideGap, point.y + labelHalfHeight];

    if (candidate.isSelected || !placed.some((entry) => !entry.hidden && overlaps(entry.rect, rightRect))) {
      placed.push({ ...candidate, side: "right", width, rect: rightRect, hidden: false });
      return;
    }

    if (!placed.some((entry) => !entry.hidden && overlaps(entry.rect, leftRect))) {
      placed.push({ ...candidate, side: "left", width, rect: leftRect, hidden: false });
      return;
    }

    placed.push({ ...candidate, side: "right", width, rect: rightRect, hidden: true });
  });

  return placed;
}

function addBuildingDotMarker(location, style, isSelected) {
  const marker = L.circleMarker([location.lat, location.lng], {
    radius: isSelected ? 8 : 5,
    color: isSelected ? "#111827" : style.color,
    weight: isSelected ? 4 : 2,
    fillColor: style.color,
    fillOpacity: isSelected ? 0.98 : 0.78
  });

  marker.bindTooltip(location.name, {
    direction: "top",
    offset: [0, -8]
  });

  marker.on("click", () => selectLocation(location));
  marker.addTo(navigationMarkerLayer);
}

function shouldShowMapLabel(location) {
  return location.layer !== "Parking and Transportation";
}

function getMapLabelZoomClass(zoom) {
  if (zoom >= 19) {
    return "is-close";
  }

  if (zoom >= 18) {
    return "is-visible";
  }

  return "is-faint";
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
  if (navigationLabelLayer) {
    navigationLabelLayer.clearLayers();
  }
  const zoom = navigationMap ? navigationMap.getZoom() : 17;
  const shouldShowMapText = zoom >= mapLabelMinZoom;
  const shouldShowMapDots = zoom >= mapMarkerMinZoom;
  const labelZoomClass = getMapLabelZoomClass(zoom);

  const labelCandidates = [];
  let selectedEntry = null;

  list.forEach((location) => {
    if (!location.lat || !location.lng) {
      return;
    }

    const style = getLayerStyle(location.layer);
    const isSelected = location.index === activeLocationIndex;
    const shouldRenderLocation = isSelected || (shouldShowMapDots && shouldShowMapText);

    if (isSelected) {
      selectedEntry = location;
    }

    if (shouldRenderLocation && shouldShowMapLabel(location)) {
      labelCandidates.push({ location, style, isSelected });
      return;
    }

    if (shouldRenderLocation) {
      addBuildingDotMarker(location, style, isSelected);
    }
  });

  labelCandidates.sort((a, b) => (a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1));
  const placements = planBuildingLabelPlacements(labelCandidates, navigationMap, zoom);

  placements.forEach((placement) => {
    if (placement.hidden) {
      addBuildingDotMarker(placement.location, placement.style, placement.isSelected);
      return;
    }

    const marker = L.marker([placement.location.lat, placement.location.lng], {
      interactive: true,
      icon: L.divIcon({
        className: `campus-building-label ${placement.side === "left" ? "is-left " : ""}${placement.isSelected ? "is-selected" : labelZoomClass}`,
        html: `
          <span style="--label-color:${placement.style.color}">
            <i aria-hidden="true"></i>
            <b>${placement.location.name}</b>
          </span>
        `,
        iconSize: null,
        iconAnchor: placement.side === "left" ? [Math.round(placement.width + 8), 8] : [8, 8]
      })
    });

    marker.bindTooltip(placement.location.name, {
      direction: "top",
      offset: [0, -10]
    });

    marker.on("click", () => selectLocation(placement.location));
    marker.addTo(navigationMarkerLayer);
  });

  if (selectedEntry) {
    addEntrancePinsForLocation(selectedEntry, zoom);
  }
}

function addEntrancePinsForLocation(location, zoom) {
  const entrances = getLocationEntranceOptions(location);

  if (!entrances.length || zoom < mapMarkerMinZoom) {
    return;
  }

  const selectedEntrance = getSelectedEntrance(location, "destination");
  const selectedIndex = selectedEntrance ? entrances.indexOf(selectedEntrance) : -1;

  entrances.forEach((point, index) => {
    const isAccessible = point.type === "accessible";
    const isChosen = index === selectedIndex;
    const pin = L.marker([point.lat, point.lng], {
      interactive: true,
      icon: L.divIcon({
        className: `campus-entrance-pin${isAccessible ? " is-accessible" : ""}${isChosen ? " is-chosen" : ""}`,
        html: `<span class="material-symbols-outlined" aria-hidden="true">${isAccessible ? "accessible" : "door_open"}</span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 22]
      })
    });

    pin.bindTooltip(`${getEntranceLabel(point)}${isAccessible ? " (Accessible)" : ""}${isChosen ? " — selected" : ""}`, {
      direction: "top",
      offset: [0, -14]
    });

    pin.on("click", () => {
      setRouteEndpoint("destination", location, { openDirections: true, entranceIndex: index });
    });

    pin.addTo(navigationMarkerLayer);
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

  if (!isCampusPosition(currentPosition.lat, currentPosition.lng)) {
    return;
  }

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

  if (isCampusPosition(currentPosition.lat, currentPosition.lng) && options.centerMap !== false) {
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
  isRouteStepViewActive = false;
  updateRouteIssueButton();
  routeInstructionPoints = [];
  activeRouteStepIndex = 0;
  isGuidedNavigationActive = false;
  hasAnnouncedRouteArrival = false;
  offRouteFixCount = 0;
  offRouteAnnounced = false;
  updateRouteActionButton();
  hideRouteStepNavigator();
  hideLocationStatus();
  document.body.classList.remove("route-feature-active");

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

if (openNowToggle) {
  openNowToggle.addEventListener("click", () => {
    activeOpenNowFilter = !activeOpenNowFilter;
    openNowToggle.classList.toggle("is-active", activeOpenNowFilter);
    openNowToggle.setAttribute("aria-pressed", String(activeOpenNowFilter));

    const filteredLocations = getFilteredLocations();
    renderLocations(filteredLocations);
    renderNavigationMarkers(filteredLocations);
  });
}

/* ===== AR navigation mode =====
   A camera-view wayfinder: the live camera fills the screen and a compass-driven arrow
   points at the next route waypoint. Built on the camera + device orientation APIs so it
   works on both iPhone and Android. A WebXR 3D layer could be added on top for Android later. */
function normalizeHeadingDegrees(value) {
  return ((value % 360) + 360) % 360;
}

function getScreenOrientationAngle() {
  if (typeof screen !== "undefined" && screen.orientation && typeof screen.orientation.angle === "number") {
    return screen.orientation.angle;
  }

  // Older iOS Safari uses the legacy window.orientation value.
  if (typeof window.orientation === "number") {
    return window.orientation;
  }

  return 0;
}

function getCoordinateBearing(from, to) {
  const toRadiansValue = (value) => (value * Math.PI) / 180;
  const lat1 = toRadiansValue(from.lat);
  const lat2 = toRadiansValue(to.lat);
  const deltaLng = toRadiansValue(to.lng - from.lng);
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
  return normalizeHeadingDegrees((Math.atan2(y, x) * 180) / Math.PI);
}

function getCompassHeadingFromOrientation(event) {
  // iOS Safari reports a real compass heading, already measured clockwise from north.
  if (typeof event.webkitCompassHeading === "number" && !Number.isNaN(event.webkitCompassHeading)) {
    return normalizeHeadingDegrees(event.webkitCompassHeading + getScreenOrientationAngle());
  }

  const isAbsoluteAlpha = event.absolute === true || event.type === "deviceorientationabsolute";

  if (typeof event.alpha === "number" && isAbsoluteAlpha) {
    // Absolute alpha turns counter-clockwise from north, so the heading is 360 - alpha.
    return normalizeHeadingDegrees(360 - event.alpha + getScreenOrientationAngle());
  }

  // Relative alpha only measures turning since page load, so it cannot point at anything.
  return null;
}

function handleArOrientation(event) {
  const heading = getCompassHeadingFromOrientation(event);

  if (heading === null) {
    return;
  }

  arCompassHeading = heading;

  if (!arHeadingReady) {
    arHeadingReady = true;
    setArStatus("");
  }
}

function detachArCompass() {
  window.removeEventListener("deviceorientationabsolute", handleArOrientation, true);
  window.removeEventListener("deviceorientation", handleArOrientation, true);
}

async function requestArMotionPermission() {
  if (typeof window.DeviceOrientationEvent?.requestPermission !== "function") {
    return "not-needed";
  }

  // iOS shows this prompt only while the tap is still "active", which is why
  // AR mode asks for motion BEFORE the camera. Do not add arguments here:
  // some Safari builds reject unknown arguments and report a denial the
  // user never actually made.
  try {
    return await window.DeviceOrientationEvent.requestPermission();
  } catch (error) {
    return "denied";
  }
}

async function attachArCompass(sessionId) {
  if (!window.DeviceOrientationEvent) {
    return "unavailable";
  }

  if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
    const permission = await requestArMotionPermission();

    if (permission !== "granted") {
      return "denied";
    }
  }

  // The user may have closed AR mode while the prompt was open.
  if (!arModeActive || sessionId !== arModeSessionId) {
    return "cancelled";
  }

  window.addEventListener("deviceorientationabsolute", handleArOrientation, true);
  window.addEventListener("deviceorientation", handleArOrientation, true);
  return "ready";
}

function setTextIfChanged(element, text) {
  if (element && element.textContent !== text) {
    element.textContent = text;
  }
}

function setArStatus(message) {
  if (!arStatusText) {
    return;
  }

  setTextIfChanged(arStatusText, message || "");
  arStatusText.hidden = !message;
}

function getArTargetPoint() {
  if (!routeInstructionPoints.length) {
    return null;
  }

  // Mirrors guided navigation: aim at the point AFTER the active step, or the destination on the last step.
  if (activeRouteStepIndex >= latestDirectionSteps.length - 1) {
    return routeInstructionPoints[routeInstructionPoints.length - 1];
  }

  return routeInstructionPoints[Math.min(activeRouteStepIndex + 1, routeInstructionPoints.length - 1)];
}

function getArInstructionText() {
  if (activeRouteStepIndex >= latestDirectionSteps.length - 1) {
    return "Arrive at your destination";
  }

  const step = latestDirectionSteps[activeRouteStepIndex];
  return step ? step.instruction : "Follow the arrow";
}

function getArRemainingMeters() {
  if (!currentPosition || !routeInstructionPoints.length) {
    return null;
  }

  const isLastStep = activeRouteStepIndex >= latestDirectionSteps.length - 1;
  const remainingPoints = isLastStep
    ? [routeInstructionPoints[routeInstructionPoints.length - 1]]
    : routeInstructionPoints.slice(activeRouteStepIndex + 1);

  if (!remainingPoints.length) {
    return null;
  }

  let totalMeters = getDistanceBetweenPoints(currentPosition, remainingPoints[0]) * 1609.344;

  for (let index = 1; index < remainingPoints.length; index += 1) {
    totalMeters += getDistanceBetweenPoints(remainingPoints[index - 1], remainingPoints[index]) * 1609.344;
  }

  return totalMeters;
}

function getArRemainingMinutes(remainingMeters) {
  const route = latestRoutePreview?.route;

  if (!route || !route.minutes || !route.distanceMeters || !Number.isFinite(remainingMeters)) {
    return null;
  }

  // Scale the app's own route time by how much walking is left.
  return Math.max(1, Math.round((remainingMeters / route.distanceMeters) * route.minutes));
}

function formatArDistance(meters) {
  if (!Number.isFinite(meters)) {
    return "--";
  }

  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  return `${(meters / 1609.344).toFixed(1)} mi`;
}

function renderArFrame() {
  if (!arModeActive) {
    return;
  }

  arAnimationFrameId = window.requestAnimationFrame(renderArFrame);

  if (!arArrowElement) {
    return;
  }

  const target = getArTargetPoint();
  const hasPosition = Boolean(currentPosition);

  if (!hasPosition || !target) {
    arArrowElement.classList.remove("is-centered");
    arArrowElement.classList.add("is-unknown");
    arArrowElement.style.transform = "rotate(0deg)";
    setTextIfChanged(arBearingText, hasPosition ? "No active route to point at" : "Waiting for GPS...");
    return;
  }

  const targetBearing = getCoordinateBearing(currentPosition, target);

  if (arCompassHeading === null) {
    arArrowElement.classList.remove("is-centered");
    arArrowElement.classList.add("is-unknown");
    arArrowElement.style.transform = "rotate(0deg)";
    setTextIfChanged(arBearingText, `Target is at ${Math.round(targetBearing)}° - compass unavailable`);
    return;
  }

  const relativeBearing = normalizeHeadingDegrees(targetBearing - arCompassHeading);
  const isFacingTarget = relativeBearing <= 12 || relativeBearing >= 348;
  const turnAmount = Math.round(relativeBearing > 180 ? 360 - relativeBearing : relativeBearing);

  arArrowElement.classList.remove("is-unknown");
  arArrowElement.classList.toggle("is-centered", isFacingTarget);
  arArrowElement.style.transform = `rotate(${Math.round(relativeBearing)}deg)`;

  setTextIfChanged(
    arBearingText,
    isFacingTarget ? `Straight ahead · ${Math.round(targetBearing)}°` : `Turn ${relativeBearing > 180 ? "left" : "right"} ${turnAmount}°`
  );

  const remainingMeters = getArRemainingMeters();
  const remainingMinutes = getArRemainingMinutes(remainingMeters);

  setTextIfChanged(arTargetNameText, latestRoutePreview?.end?.name || "Destination");
  setTextIfChanged(arInstructionText, getArInstructionText());
  setTextIfChanged(arDistanceText, Number.isFinite(remainingMeters) ? `${formatArDistance(remainingMeters)} to go` : "--");
  setTextIfChanged(arEtaText, remainingMinutes ? `~${remainingMinutes} min walk` : "--");
}

async function startArMode() {
  if (arModeActive) {
    return;
  }

  if (!latestRoutePreview || !routeUsesCurrentLocation()) {
    setLocationStatus("AR mode needs a route that starts from your current location. Set From to Current Location first.", { isError: true });
    return;
  }

  if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setLocationStatus("AR mode needs an HTTPS connection and a device with a camera.", { isError: true });
    return;
  }

  arModeActive = true;
  const sessionId = ++arModeSessionId;
  arCompassHeading = null;
  arHeadingReady = false;

  if (arModeLayer) {
    arModeLayer.hidden = false;
  }

  arAddedBodyLock = !document.body.classList.contains("modal-open");
  document.body.classList.add("modal-open");

  setArStatus("");
  setTextIfChanged(arTargetNameText, latestRoutePreview?.end?.name || "Destination");
  setTextIfChanged(arInstructionText, getArInstructionText());

  // Ask for the compass FIRST, and await it BEFORE touching the camera. iOS only
  // shows the motion prompt while this tap is still "active": awaiting the
  // camera prompt first spends that activation, so DeviceOrientationEvent
  // either has no gesture left (permission silently fails -> "denied" with
  // no prompt shown) or its own prompt appears stacked behind the camera
  // prompt. Compass first, camera second.
  const compassResult = await attachArCompass(sessionId);

  // The user may have closed and reopened AR while a permission prompt was open.
  if (!arModeActive || sessionId !== arModeSessionId) {
    return;
  }

  if (compassResult === "cancelled") {
    stopArMode();
    return;
  }

  try {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });

    // Permission can resolve after AR was closed. Never attach or retain that stream.
    if (!arModeActive || sessionId !== arModeSessionId) {
      cameraStream.getTracks().forEach((track) => track.stop());
      return;
    }

    arCameraStream = cameraStream;

    if (arCameraVideo) {
      arCameraVideo.srcObject = arCameraStream;
      await arCameraVideo.play().catch(() => {
        // Autoplay can be refused; the stream stays attached and starts on the next frame.
      });
    }
  } catch (error) {
    // A stale, cancelled request must not tear down a newer AR session.
    if (sessionId !== arModeSessionId) {
      return;
    }

    stopArMode();
    setLocationStatus("Camera access was blocked, so AR mode cannot start. Allow camera access for this site, then try again.", { isError: true });
    return;
  }

  if (!arModeActive || sessionId !== arModeSessionId) {
    return;
  }

  if (compassResult === "denied") {
    setArStatus("Compass permission was denied, so the arrow cannot point. The direction number still tells you which way to face.");
  } else if (compassResult === "unavailable") {
    setArStatus("This device has no compass, so the arrow cannot point. The direction number still tells you which way to face.");
  } else {
    // Some phones need a moment (and a wiggle) before the magnetometer reports anything.
    arCompassHintTimer = window.setTimeout(() => {
      if (arModeActive && arCompassHeading === null) {
        setArStatus("No compass reading yet. Hold the phone flat and slowly move it in a figure-8 to calibrate.");
      }
    }, 3200);
  }

  arAnimationFrameId = window.requestAnimationFrame(renderArFrame);

  // Seed the overlay numbers immediately: GPS + compass update on their own
  // schedules, so without this the distance/ETA read "--" until the first tick.
  setTextIfChanged(arInstructionText, getArInstructionText());
  const seedMeters = getArRemainingMeters();
  const seedMinutes = getArRemainingMinutes(seedMeters);
  setTextIfChanged(arDistanceText, Number.isFinite(seedMeters) ? `${formatArDistance(seedMeters)} to go` : "Waiting for GPS...");
  setTextIfChanged(arEtaText, seedMinutes ? `~${seedMinutes} min walk` : "--");
}

function stopArMode() {
  arModeActive = false;

  if (arAnimationFrameId) {
    window.cancelAnimationFrame(arAnimationFrameId);
    arAnimationFrameId = 0;
  }

  detachArCompass();
  window.clearTimeout(arCompassHintTimer);
  arCompassHintTimer = 0;
  arCompassHeading = null;
  arHeadingReady = false;

  if (arCameraStream) {
    arCameraStream.getTracks().forEach((track) => track.stop());
    arCameraStream = null;
  }

  if (arCameraVideo) {
    arCameraVideo.srcObject = null;
  }

  if (arModeLayer) {
    arModeLayer.hidden = true;
  }

  if (arAddedBodyLock) {
    document.body.classList.remove("modal-open");
    arAddedBodyLock = false;
  }
}

function updateArModeButton() {
  if (!startArModeButton) {
    return;
  }

  const canStartAr = Boolean(latestRoutePreview) && routeUsesCurrentLocation();
  startArModeButton.hidden = !canStartAr;

  // If the route changed underneath an open AR session, close AR instead of pointing at nothing.
  if (arModeActive && !canStartAr) {
    stopArMode();
  }
}

if (startArModeButton) {
  startArModeButton.addEventListener("click", () => {
    startArMode();
  });
}

if (closeArModeButton) {
  closeArModeButton.addEventListener("click", () => {
    stopArMode();
  });
}

// Hand the camera back when the page is really going away.
window.addEventListener("pagehide", () => {
  if (arModeActive) {
    stopArMode();
  }
});

initRouteDock();

/* ===== Bottom route dock (arrival indicator -> End Route) ===== */
function getRouteDockSummary() {
  const route = latestRoutePreview?.route;
  const end = latestRoutePreview?.end;

  if (!route || !end) {
    return null;
  }

  // Go mode: distance and time are the headline, exactly as the user asked for
  // the collapsed indicator. The live remaining distance/ETA is derived from
  // the current GPS fix and updates on every tick via updateRouteDock().
  if (routeUsesCurrentLocation()) {
    const remainingMeters = getArRemainingMeters();
    const remainingMinutes = getArRemainingMinutes(remainingMeters);
    const minutes = remainingMinutes || route.minutes;
    const distanceText = Number.isFinite(remainingMeters)
      ? formatArDistance(remainingMeters)
      : route.distanceText;

    // Arrival is over: stop suggesting a remaining walk time.
    if (hasAnnouncedRouteArrival) {
      return {
        primary: "You have arrived",
        destination: `At ${end.name}`,
        detail: "Navigation is finished. End the route to clear it from the map, or keep exploring this building."
      };
    }

    return {
      primary: `${distanceText} · ${minutes} min`,
      destination: `To ${end.name} · arriving ~${getArrivalEtaText(minutes)}`,
      detail: "Following your live location. Tap or drag this bar up for AR View or to end the route."
    };
  }

  // Arrived while previewing a building-to-building route.
  if (hasAnnouncedRouteArrival) {
    return {
      primary: "You have arrived",
      destination: `At ${end.name}`,
      detail: "Navigation is finished. End the route to clear it from the map, or keep exploring this building."
    };
  }

  // Steps mode: destination building plus how long the walk between the two is.
  return {
    primary: `${route.minutes} min · ${route.distanceText}`,
    destination: `To ${end.name}`,
    detail: `${latestDirectionSteps.length} steps from ${latestRoutePreview.start.name} · swipe the card at the top of the screen to preview each step`
  };
}

function setRouteDockExpanded(expanded) {
  if (!routeDock) {
    return;
  }

  routeDock.dataset.dockState = expanded ? "expanded" : "collapsed";

  if (routeDockHandle) {
    routeDockHandle.setAttribute("aria-expanded", String(expanded));
  }
}

function hideRouteDock() {
  if (routeDock) {
    routeDock.hidden = true;
  }

  document.body.classList.remove("route-dock-open");
  // Leaving the feature always restores the form, so a route edit (new
  // preference, new endpoints, a failed reroute) can never strand the user on
  // a blank full-screen map with the dock hidden.
  document.body.classList.remove("route-feature-active");
  setRouteDockExpanded(false);

  // The map reclaims the sidebar column as the grid reflows.
  if (navigationMap) {
    setTimeout(() => navigationMap.invalidateSize(), 0);
  }
}

function renderRouteDockSteps() {
  if (!routeDockSteps) {
    return;
  }

  // The full list is a building-to-building affordance. Go mode already has a
  // live-advancing banner at the top, so its dock stays compact. This keys off
  // the route's start type rather than isGuidedNavigationActive, which flips to
  // false on arrival and would pop the list open at the destination.
  if (routeUsesCurrentLocation() || !latestDirectionSteps.length) {
    routeDockSteps.hidden = true;
    routeDockSteps.innerHTML = "";
    return;
  }

  routeDockSteps.hidden = false;
  routeDockSteps.innerHTML = latestDirectionSteps
    .map((step, index) => `
      <li class="route-dock-step ${index === activeRouteStepIndex ? "is-active" : ""}">
        <button type="button" data-dock-step="${index}">
          <span class="route-dock-step-number" aria-hidden="true">${index + 1}</span>
          <span class="route-dock-step-copy">
            <strong>${step.instruction}</strong>
            <small>${formatRouteDistance(step.distance)}</small>
          </span>
        </button>
      </li>
    `)
    .join("");

  // Tapping a step in the expanded dock pans the map to that instruction and
  // syncs the swipeable carousel at the top to the same step.
  routeDockSteps.querySelectorAll("[data-dock-step]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveRouteStep(Number(button.dataset.dockStep), { focusMap: true });
      setRouteDockExpanded(false);
    });
  });
}

// Lightweight highlight-only update so swiping the top carousel doesn't rebuild
// the whole dock list (and doesn't fight the user's scroll position).
function syncRouteDockSteps() {
  if (!routeDockSteps || routeDockSteps.hidden) {
    return;
  }

  routeDockSteps.querySelectorAll("[data-dock-step]").forEach((button) => {
    button.parentElement.classList.toggle("is-active", Number(button.dataset.dockStep) === activeRouteStepIndex);
  });
}

function updateRouteDock() {
  if (!routeDock) {
    return;
  }

  const summary = getRouteDockSummary();

  if (!summary || !isRouteStepViewActive) {
    hideRouteDock();
    return;
  }

  routeDock.hidden = false;
  document.body.classList.add("route-dock-open");

  setTextIfChanged(routeDockArrival, summary.primary);
  setTextIfChanged(routeDockDestination, summary.destination);
  setTextIfChanged(routeDockDetail, summary.detail);

  renderRouteDockSteps();

  if (routeDockArButton) {
    routeDockArButton.hidden = !routeUsesCurrentLocation();
  }
}

function initRouteDock() {
  if (!routeDock || !routeDockHandle) {
    return;
  }

  let dragStartY = 0;
  let dragDeltaY = 0;
  let isDragging = false;

  routeDockHandle.addEventListener("pointerdown", (event) => {
    isDragging = true;
    dragStartY = event.clientY;
    dragDeltaY = 0;
    routeDock.classList.add("is-dragging");
    routeDockHandle.setPointerCapture?.(event.pointerId);
  });

  routeDockHandle.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    // Dragging follows the finger, clamped so the dock cannot fly off screen.
    dragDeltaY = Math.max(-120, Math.min(60, event.clientY - dragStartY));
    routeDock.style.setProperty("--dock-drag", `${dragDeltaY}px`);
  });

  const finishDrag = () => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    routeDock.classList.remove("is-dragging");
    routeDock.style.removeProperty("--dock-drag");

    if (dragDeltaY < -30) {
      suppressDockClick = true;
      setRouteDockExpanded(true);
    } else if (dragDeltaY > 30) {
      suppressDockClick = true;
      setRouteDockExpanded(false);
    }
  };

  routeDockHandle.addEventListener("pointerup", finishDrag);
  routeDockHandle.addEventListener("pointercancel", finishDrag);

  // A tap also opens the dock. A real drag sets the flag so it does not double-toggle.
  routeDockHandle.addEventListener("click", () => {
    if (suppressDockClick) {
      suppressDockClick = false;
      return;
    }

    setRouteDockExpanded(routeDock.dataset.dockState !== "expanded");
  });

  if (endRouteButton) {
    endRouteButton.addEventListener("click", () => {
      if (isLiveTracking) {
        stopLiveTracking({ showStatus: false });
      }

      // clearRoute() already stops guided navigation and refreshes the dock.
      clearRoute();
    });
  }

  if (routeDockArButton) {
    routeDockArButton.addEventListener("click", () => {
      startArMode();
    });
  }
}

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
  syncEntranceOptions();
  refreshGetDirectionsButtonLabel();
}

function refreshGetDirectionsButtonLabel() {
  if (!getDirectionsButton) {
    return;
  }

  // Two-tap flow: the form button first shows the preview, then flips to
  // Go (live GPS start) or Steps (building to building) so the second tap
  // enters the directions feature. It only falls back to "Get Directions"
  // once the on-screen preview no longer matches the From/To fields (or when
  // there is no preview at all).
  const label = isPreviewCurrentForForm()
    ? (routeUsesCurrentLocation() ? "Go" : "Steps")
    : "Get Directions";

  if (getDirectionsButton.textContent !== label) {
    getDirectionsButton.textContent = label;
  }
}

function shouldShowLiveLocationPin() {
  const hasRouteEndpoints = Boolean(getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value));
  return !hasRouteEndpoints || routeUsesCurrentLocation();
}

function isCampusPosition(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return false;
  }

  const [[south, west], [north, east]] = campusMapBounds;
  return lat >= south && lat <= north && lng >= west && lng <= east;
}

function syncCurrentLocationMarker(options = {}) {
  if (!currentLocationLayer) {
    return;
  }

  if (shouldShowLiveLocationPin() && currentPosition && isCampusPosition(currentPosition.lat, currentPosition.lng)) {
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

  updateRouteDock();

  if (isGuidedNavigationActive) {
    advanceGuidedNavigationIfNeeded();
    return;
  }

  if (getLocationBySelectValue(fromLocationSelect.value) && getLocationBySelectValue(toLocationSelect.value) && (mode !== "live" || routeUsesCurrentLocation())) {
    renderDirectionsPreview({ preservePanelState: mode === "live", silentRefresh: mode === "live" });
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
  offRouteFixCount = 0;
  offRouteAnnounced = false;
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

if (basemapSelect) {
  basemapSelect.addEventListener("change", () => {
    setNavigationBasemap(basemapSelect.value);
  });
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

function previewRouteFromForm() {
  // Tap 1 = preview, tap 2 = directions. As soon as the preview for these
  // exact inputs is on screen the tap means Go/Steps, and it stays inside the
  // directions phase instead of falling back to a plain preview card.
  if (isPreviewCurrentForForm()) {
    handleRouteAction();
    return;
  }

  // Current Location needs a one-shot GPS fix to draw anything. This tap is
  // the user gesture browsers require, so ask for GPS now and render the
  // preview when the fix lands (updateCurrentLocation re-renders it).
  if (needsCurrentGpsForForm()) {
    shouldFitRouteToMap = true;
    renderDirectionsPreview();
    requestPreviewGpsFix();
    return;
  }

  shouldFitRouteToMap = true;
  // Plain preview: full route on the map plus the time estimate, with the
  // Go/Steps action beside it. Never enters the Go/Steps phase by itself.
  renderDirectionsPreview();
}

// Entering the directions feature is a pure state transition. It deliberately
// does NOT re-run renderDirectionsPreview(): rebuilding the preview would reset
// activeRouteStepIndex, clear isGuidedNavigationActive, and re-open the form
// panel, which is why the old tap-to-enter flow looked like it did nothing.
function enterRouteFeature() {
  if (!latestRoutePreview || !latestDirectionSteps.length) {
    return false;
  }

  isRouteStepViewActive = true;
  shouldFitRouteToMap = false;
  activeRouteStepIndex = 0;

  // Full-screen map: the form panel steps aside so the route line, the top
  // step carousel (Steps) or guided banner (Go), and the bottom dock are all
  // that remain on screen.
  document.body.classList.add("route-feature-active");
  sidebar.classList.remove("directions-detail-active");
  setMobilePanelState("collapsed");

  // Hiding the sidebar reflows the grid, so Leaflet has to re-measure before
  // the map is panned to the first step.
  if (navigationMap) {
    navigationMap.invalidateSize();
  }

  if (routeUsesCurrentLocation()) {
    startGuidedNavigation();
  } else {
    setActiveRouteStep(0, { focusMap: true });
  }

  updateRouteDock();
  return true;
}

function handleRouteAction() {
  if (enterRouteFeature()) {
    return;
  }

  // No usable preview on screen yet (e.g. the card was replaced by an error
  // message), so build one instead of letting the tap do nothing.
  shouldFitRouteToMap = true;
  renderDirectionsPreview();
  if (needsCurrentGpsForForm()) {
    requestPreviewGpsFix();
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
getDirectionsButton.addEventListener("click", previewRouteFromForm);

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

    // Manual typing follows the same rule: the preview pops once both ends
    // are known (buildings, or Current Location -> building). The change
    // event is already a user gesture, so GPS can be requested here too.
    previewAfterFieldSelection(null);
  });
}

setupRouteSearchField(fromLocationSelect, fromLocationSuggestions, { includeCurrentLocation: true });
setupRouteSearchField(toLocationSelect, toLocationSuggestions);
if (routePreferenceSelect) {
  routePreferenceSelect.addEventListener("change", () => {
    shouldFitRouteToMap = true;

    // Refresh a preview already on screen — or pop one if the form is now
    // complete (two buildings, or Current Location -> building).
    if (latestRoutePreview
      && getLocationBySelectValue(fromLocationSelect.value)
      && getLocationBySelectValue(toLocationSelect.value)) {
      renderDirectionsPreview({ preservePanelState: true });
      if (needsCurrentGpsForForm()) {
        requestPreviewGpsFix();
      }
    } else {
      previewAfterFieldSelection(null);
    }
  });
}
clearRouteButton.addEventListener("click", clearRoute);
if (reportCurrentRouteIssueButton) {
  reportCurrentRouteIssueButton.addEventListener("click", () => reportLatestRouteIssue());
}
sidebar.addEventListener("pointerdown", startSheetSwipe);
sidebar.addEventListener("pointermove", moveSheetSwipe);
sidebar.addEventListener("pointerup", endSheetSwipe);
sidebar.addEventListener("pointercancel", () => {
  sheetSwipeStartedAt = 0;
  sheetSwipeMoved = false;
  sidebar.classList.remove("is-dragging");
  sidebar.style.transform = "";
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
  button.addEventListener("pointerdown", () => button.classList.add("is-pressing"));
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    button.addEventListener(eventName, () => button.classList.remove("is-pressing"));
  });
});
locations.forEach((location, index) => {
  location.index = index;
});

window.addEventListener("resize", refreshNavigationMapLayout);
window.addEventListener("orientationchange", refreshNavigationMapLayout);
renderLocationOptions();
updateRouteActionButton();
renderLocations(locations);
renderSavedPanel();
setActiveBottomNav("explore");
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
