const categoryByLayer = {
  "Academic Buildings": "Academic Building",
  "Athletics": "Athletics",
  "Campus Services": "Campus Service",
  "Dining and Student Life": "Dining / Student Life",
  "Former / Inactive Housing": "Former / Inactive Housing",
  "Housing": "Housing",
  "Landmarks": "Campus Landmark",
  "Parking and Transportation": "Parking / Transportation"
};

const routeAccessPointsByLocation = {
  "Administrative Cottage #1 (Custodial)": [
    {"name": "Custodial Entrance", "lat": 35.2453255, "lng": -80.856698}
  ],
  "Administrative Cottage #2 (Facilities)": [
    {"name": "Facilities Entrance", "lat": 35.2454721, "lng": -80.8566854}
  ],
  "Administrative Cottage #3 (Counseling Center)": [
    {"name": "Counseling Center Entrance", "lat": 35.2447387, "lng": -80.857795}
  ],
  "Administrative Cottage #5 (Faculty Hall)": [
    {"name": "Faculty Hall Entrance", "lat": 35.2419392, "lng": -80.855018}
  ],
  "Andrew Carnegie Hall": [
    {"name": "Carnegie Hall", "lat": 35.242799, "lng": -80.8567673}
  ],
  "Arts Factory": [
    {"name": "Arts Factory Entrance", "lat": 35.2386422, "lng": -80.8590678}
  ],
  "Athletic Support Hall": [
    {"name": "Athletic Support Hall Entrance", "lat": 35.2425954, "lng": -80.8533692}
  ],
  "Band and Music Hall": [
    {"name": "Band and Music Entrance", "lat": 35.2448969, "lng": -80.8562488}
  ],
  "Cafeteria": [
    {"name": "Cafeteria Entrance", "lat": 35.243714, "lng": -80.8561897},
    {"name": "Cafeteria Entrance", "lat": 35.2438392, "lng": -80.8561915}
  ],
  "Dorothy Cowser Yancy Technology Center": [
    {"name": "Yancy Entrance", "lat": 35.2418392, "lng": -80.8570965},
    {"name": "Yancy Entrance", "lat": 35.2420106, "lng": -80.857202}
  ],
  "Edward Crutchfield Cottage": [
    {"name": "Edward Crutchfield Cottage Entrance", "lat": 35.2416914, "lng": -80.8551783}
  ],
  "George E. Davis Hall": [
    {"name": "Davis Hall", "lat": 35.2422205, "lng": -80.8569916}
  ],
  "Hartley Wood Hall": [
    {"name": "Woods Hall Entrance", "lat": 35.2452221, "lng": -80.8562116}
  ],
  "Henry J. Biddle Hall": [
    {"name": "Biddle Hall Entrance", "lat": 35.243382, "lng": -80.8568782},
    {"name": "Biddle Accessible / Elevator Entrance", "lat": 35.2434949, "lng": -80.8567008, "type": "accessible"}
  ],
  "Henry Lawrence McCrorey Memorial Hall": [
    {"name": "McCrorey Side Entrance", "lat": 35.242571, "lng": -80.855836},
    {"name": "McCrorey Main Entrance", "lat": 35.2427477, "lng": -80.8559135},
    {"name": "McCrorey Side Entrance", "lat": 35.2429112, "lng": -80.8558134}
  ],
  "Irwin Belk Complex": [
    {"name": "IBC Entrance", "lat": 35.2416921, "lng": -80.853052}
  ],
  "JCSU Health Center": [
    {"name": "JCSU Health Center Entrance", "lat": 35.2437943, "lng": -80.8566476}
  ],
  "Jack S. Brayboy Gymnasium": [
    {"name": "Brayboy Gymnasium Entrance", "lat": 35.2426331, "lng": -80.8544874}
  ],
  "Jack S. Brayboy HealthPlex": [
    {"name": "Jack S. Brayboy HealthPlex Entrance", "lat": 35.2426304, "lng": -80.853987}
  ],
  "James B. Duke Memorial Hall": [
    {"name": "Duke Hall Entrance", "lat": 35.2440126, "lng": -80.8589566}
  ],
  "James B. Duke Memorial Library": [
    {"name": "Duke Library Entrance", "lat": 35.243009, "lng": -80.8570767}
  ],
  "Jane M. Smith Hall (Chapel)": [
    {"name": "Memorial Church Entrance", "lat": 35.2419087, "lng": -80.8577416}
  ],
  "Johnson C. Smith Cottage (Human Resources)": [
    {"name": "Human Resources Entrance", "lat": 35.2421411, "lng": -80.8561299}
  ],
  "Mary Joyce Taylor Crisp Memorial Student Union": [
    {"name": "Memorial Student Union Entrance", "lat": 35.2435242, "lng": -80.8561735}
  ],
  "Metropolitan College": [
    {"name": "Metropolitan Entrance", "lat": 35.2424529, "lng": -80.8560779}
  ],
  "Mosaic Village": [
    {"name": "Mosaic Village Entrance", "lat": 35.2393317, "lng": -80.8586565}
  ],
  "New Residence Hall": [
    {"name": "New Residence Entrance", "lat": 35.2447477, "lng": -80.8549723}
  ],
  "New Science Center (STEM)": [
    {"name": "New Science Center Entrance", "lat": 35.2422795, "lng": -80.8571887},
    {"name": "New Science Center Entrance", "lat": 35.2422148, "lng": -80.8576043}
  ],
  "Old Science Building": [
    {"name": "Old Science Back Entrance", "lat": 35.242312, "lng": -80.8564402},
    {"name": "Old Science Main Entrance", "lat": 35.2423303, "lng": -80.8567676}
  ],
  "Rufus R. Perry Hall": [
    {"name": "Perry Hall Entrance", "lat": 35.2424023, "lng": -80.8567591}
  ],
  "Sanders Hall": [
    {"name": "Sanders Hall Entrance", "lat": 35.244235, "lng": -80.8587148}
  ],
  "Student Athlete Achievement Center": [
    {"name": "The SAAC Entrance", "lat": 35.2432842, "lng": -80.8527147}
  ],
  "Sustainability Village (Aquaponics Garden)": [
    {"name": "Aquaponics Garden Entrance", "lat": 35.2433933, "lng": -80.8534601}
  ],
  "Sustainability Village (Community Garden)": [
    {"name": "Community Garden Entrance", "lat": 35.2432232, "lng": -80.8535513}
  ],
  "Violet Washington Cottage": [
    {"name": "Violet Washington Cottage Entrance", "lat": 35.2448614, "lng": -80.8578681}
  ],
  "Wilbert Greenfield Residence Hall": [
    {"name": "Greenfield Entrance", "lat": 35.2443276, "lng": -80.8556715}
  ],
  "William F. Johnson & James W. Seabrook Hall": [
    {"name": "Seabrook Side Entrance", "lat": 35.2418478, "lng": -80.8562063},
    {"name": "Seabrook Main Entrance", "lat": 35.2419464, "lng": -80.8559046}
  ]
};

const locations = [
  ["James B. Duke Memorial Library", "Academic Buildings", 35.2431047, -80.8572703, "The James B. Duke Memorial Library is a central academic resource for studying, research, printing, technology access, archives, group study, and student learning support.", "library duke study books research printing archives computers group"],
  ["Dorothy Cowser Yancy Technology Center", "Academic Buildings", 35.2419873, -80.8572047, "Newsom Humanities Hall is a classroom and faculty office building. It includes classrooms, offices, a computer lab, language lab, lecture hall, conference room, and staff lounge.", "newsom hall humanities classrooms faculty offices language lab lecture"],
  ["George E. Davis Hall", "Academic Buildings", 35.2421828, -80.8570009, "Davis Hall and Perry Hall provide classroom and office spaces. These buildings support teaching, learning, Student Support Services, Student Success areas, and Information Technology.", "davis hall perry classrooms student support success it technology"],
  ["New Science Center (STEM)", "Academic Buildings", 35.2422429, -80.8574075, "The New Science Center is a major STEM facility with classrooms, teaching labs, faculty offices, and spaces designed for science learning, research, and collaboration.", "science center stem biology chemistry labs research classrooms faculty offices"],
  ["Henry Lawrence McCrorey Memorial Hall", "Academic Buildings", 35.2427717, -80.8558348, "McCrorey Memorial Hall was formerly connected to the School of Theology and now includes classrooms, offices, and the Social Science Lab.", "mccrorey hall social science classrooms offices theology academic building"],
  ["Lionel H. Newsom Humanities Hall", "Academic Buildings", 35.2429027, -80.85534, "Newsom Humanities Hall is a classroom and faculty office building. It includes classrooms, offices, a computer lab, language lab, lecture hall, conference room, and staff lounge.", "newsom hall humanities classrooms faculty offices language lab lecture"],
  ["William F. Johnson & James W. Seabrook Hall", "Academic Buildings", 35.2418543, -80.855917, "Johnson / Seabrook Education Building supports academic programs including Communication Arts and Business Administration. It is connected with the Mary Irwin Belk Center.", "johnson seabrook education building business communication arts classrooms academic programs"],
  ["Band and Music Hall", "Academic Buildings", 35.2449048, -80.8561284, "The Band and Music Building supports music, band, rehearsal, performance preparation, and arts-related student activity.", "band music rehearsal instruments arts performance choir"],
  ["Rufus R. Perry Hall", "Academic Buildings", 35.242401, -80.8567025, "Rufus R. Perry Hall is an academic campus building used for classroom, faculty, student support, or academic program functions. It is connected in campus references with George E. Davis Hall, so students may use either name when searching for this academic area.", "rufus r perry hall george e davis classrooms academic building faculty offices student support"],
  ["Metropolitan College", "Academic Buildings", 35.2423989, -80.8560069, "Robert L. Albright Hall was previously a residential facility and is now used for Metropolitan College of Professional Studies and related academic support programs. The building supports adult degree, evening, online, and e-learning programs and includes seminar rooms, a computer lab, conference rooms, Veteran’s Hub, Single Stop, and multipurpose spaces.", "robert l albright hall metropolitan college adult degree evening program online e learning veteran s hub single stop computer lab"],
  ["Sustainability Village (Aquaponics Garden)", "Academic Buildings", 35.2435007, -80.8534333, "The Sustainability Village Aquaponics Garden is an outdoor learning and sustainability space focused on aquaponics, food systems, and environmental education. It can be used as a destination for classes, campus sustainability projects, research, demonstrations, or student/community learning activities.", "sustainability village aquaponics garden food systems agriculture environmental science outdoor learning research community"],
  ["Sustainability Village (Community Garden)", "Academic Buildings", 35.2432534, -80.8535781, "The Sustainability Village Community Garden is an outdoor campus garden space connected to sustainability, food access, environmental education, and community engagement. It can support student learning, service projects, wellness, gardening, and campus/community partnerships.", "sustainability village community garden food access agriculture environmental science outdoor learning service project wellness engagement"],
  ["Irwin Belk Complex", "Academic Buildings", 35.2416921, -80.853052, "Irwin Belk Complex serves both academic and athletic purposes. It includes spaces connected to football, track, dance, locker rooms, weight rooms, and multimedia classrooms for Health and Human Performance.", "irwin belk complex stadium football track dance studio health and human performance athletics"],
  ["Old Science Building", "Academic Buildings", 35.2422217, -80.8567024, "The Old Science Building is a campus academic building historically associated with science instruction or science-related academic use. It may now serve a different academic, office, or support function, so its current use should be verified before listing specific departments or services.", "old science building former academic classrooms labs campus"],
  ["Jack S. Brayboy Gymnasium", "Athletics", 35.2428631, -80.8544711, "Jack S. Brayboy Gymnasium is a major indoor athletic facility at JCSU. It supports basketball, physical education, campus events, athletic activities, and indoor recreation. The building includes a main playing floor, seating areas, offices, classrooms, locker rooms, equipment areas, and access to the pool area.", "brayboy gym jack s gymnasium basketball athletics physical education locker room campus events indoor sports"],
  ["Jack S. Brayboy HealthPlex", "Athletics", 35.2427885, -80.8539859, "The HealthPlex Center is a fitness, wellness, and research facility connected to student health and physical activity. It includes exercise and weight-lifting equipment, a group fitness room, multipurpose space, locker rooms, showers, an examination room, offices, and reception area.", "healthplex center fitness gym workout exercise weight lifting wellness yoga pilates locker room showers"],
  ["Athletic Support Hall", "Athletics", 35.242707, -80.8534308, "Athletic Support Hall is a campus building connected to athletics support and administrative functions. It may be used for athletics operations, staff offices, team support, or related services.", "athletic support hall athletics office sports administration team coaches equipment"],
  ["Student Athlete Achievement Center", "Athletics", 35.2433713, -80.852759, "The Student Athlete Achievement Center supports student-athletes with academic success, advising, studying, meetings, and athletic department support. It is useful for athletes looking for academic resources connected to athletics.", "student athlete achievement center support athletes academic advising studying athletics golden bulls"],
  ["Tennis Court", "Athletics", 35.2442725, -80.8544534, "The Tennis Court is an outdoor athletics and recreation space used for tennis, practice, physical activity, and student recreation.", "tennis court outdoor recreation athletics student practice"],
  ["Basketball Court #1", "Athletics", 35.2438037, -80.8545822, "Basketball Court #1 is an outdoor recreation and athletics space used for basketball, practice, informal games, student recreation, and campus activity.", "basketball court outdoor recreation athletics student practice pickup games"],
  ["Track and Field (Throwers)", "Athletics", 35.244922, -80.8538285, "The Throwing Area is an athletics space used for throwing events and track and field practice. It may support events such as shot put, discus, hammer, or javelin depending on campus setup and team use.", "track and field throwers throws area shot put discus hammer javelin athletics practice"],
  ["Basketball Court #2", "Athletics", 35.2433548, -80.8591884, "Located outside of Duke Hall. Basketball Court #2 is an outdoor recreation and athletics space used for basketball, practice, informal games, student recreation, and campus activity.", "basketball court outdoor recreation athletics student practice pickup games"],
  ["Administrative Cottage #1 (Custodial)", "Campus Services", 35.2453412, -80.8567965, "Administrative Cottage #1 is used for university administrative or staff office functions. Students may visit this location for support services, meetings, or university business depending on the office currently assigned to the building.", "administrative cottage 1 admin office staff campus services university"],
  ["Administrative Cottage #2 (Facilities)", "Campus Services", 35.24549, -80.8567858, "Administrative Cottage #2 is used for university administrative or staff office functions. Students may visit this location for support services, meetings, or university business depending on the office currently assigned to the building.", "administrative cottage 2 admin office staff campus services university"],
  ["Administrative Cottage #4 (Campus Police)", "Campus Services", 35.2435077, -80.8552996, "Campus Security / Public Safety supports campus safety, emergency response, lost and found, incident reporting, and student safety concerns. Students should use this marker to locate safety support on campus.", "campus security public safety police emergency lost and found report office"],
  ["University Auxiliary Hall #1 (EHSC High School)", "Campus Services", 35.2462352, -80.8549456, "University Auxiliary Hall #1 is an auxiliary campus building associated with EHSC High School. It is part of the wider JCSU campus area but should be marked separately from regular university academic buildings, residence halls, and student services.", "university auxiliary hall 1 ehsc high school partner campus building"],
  ["Administrative Cottage #3 (Counseling Center)", "Campus Services", 35.244772, -80.8578928, "Administrative Cottage #3 is used for university administrative or staff office functions. Students may visit this location for support services, meetings, or university business depending on the office currently assigned to the building.", "administrative cottage 3 admin office staff campus services university"],
  ["Violet Washington Cottage", "Campus Services", 35.244899, -80.8577936, "Violet Washington Cottage is a campus cottage used for university office or auxiliary functions. Students may visit this location for campus services, meetings, or administrative support depending on the office currently assigned to the building.", "violet washington cottage administrative office auxiliary campus services staff university"],
  ["George E. Davis Cottage", "Campus Services", 35.2447647, -80.8587293, "George E. Davis Cottage is a campus cottage used for university office or auxiliary functions. Students may visit this location for campus services, meetings, or administrative support depending on the office currently assigned to the building.", "george e davis cottage administrative office auxiliary campus services staff university"],
  ["Andrew Carnegie Hall", "Campus Services", 35.2428315, -80.8566423, "Carnegie Hall formerly served as the campus library and now supports the Smith Institute for Research, Career Development, and Postgraduate Readiness. Students may use this location for career preparation, research support, and post-graduation planning.", "carnegie hall smith institute career development research postgraduate readiness internships jobs resume support"],
  ["Johnson C. Smith Cottage (Human Resources)", "Campus Services", 35.2421504, -80.8560453, "Johnson C. Smith Cottage is an administrative campus building that houses Human Resources. Students, faculty, and staff may use this location for employment-related services, hiring paperwork, work-study or campus job questions, benefits support, and other HR-related needs.", "johnson c smith cottage human resources hr employment campus jobs work study hiring paperwork staff support benefits administrative office"],
  ["Administrative Cottage #5 (Faculty Hall )", "Campus Services", 35.241994, -80.8550484, "Faculty Hall is a campus support building used for faculty, staff, meetings, and university-related functions. It may include faculty work areas, meeting rooms, and spaces for academic or administrative support.", "faculty hall offices staff meeting rooms academic support campus services"],
  ["Edward Crutchfield Cottage", "Campus Services", 35.2417373, -80.8552376, "Edward J. Crutchfield Hall, also known as Crutchfield Cottage, is listed as an administrative campus building. Students may visit this location for university office functions, meetings, or administrative support depending on the office currently assigned to the building.", "edward j crutchfield hall cottage ejch administration administrative office staff campus services"],
  ["Henry J. Biddle Hall", "Campus Services", 35.2435353, -80.8568749, "Also known as the Office of Admission. Basement Level: Housing Support Office Campus Pantry / Student Pantry Floor 1: Office of Admissions Floor 2: Financial Aid Floor 3: Student Accounts", "henry j biddle hall office of admission admissions housing residence life pantry student groceries food assistance financial aid fafsa scholarships accounts billing tuition payments"],
  ["JCSU Health Center", "Campus Services", 35.2437986, -80.8566022, "The JCSU Health Center provides confidential student health care services through Atrium Health. It is located inside the Mary Joyce Taylor Crisp Student Union, allowing students to access health services on campus. Located In: Mary Joyce Taylor Crisp Student Union", "health center clinic doctor nurse atrium wellness medical care student sick visit"],
  ["The Block", "Dining and Student Life", 35.2435255, -80.8564366, "The Block is a student-known campus area used as a common reference point, hangout spot, or meeting location. Students may use this location when giving directions, meeting friends, or identifying nearby campus buildings and activities.", "the block student hangout meeting spot campus landmark social area life"],
  ["Cafeteria", "Dining and Student Life", 35.2437796, -80.8562033, "The Cafeteria is a main campus dining location where students can eat meals, gather with friends, and use meal plan services. It is an important daily destination for residential students and commuters.", "cafeteria dining hall food meals meal plan breakfast lunch dinner student"],
  ["KoKoMo's Coffeehouse", "Dining and Student Life", 35.2434115, -80.8572086, "KoKoMo's Coffeehouse is a campus coffee and student gathering location. Students may use this space for coffee, snacks, studying, casual meetings, and social time.", "kokomo's kokomos coffeehouse coffee snacks cafe study spot student hangout dining"],
  ["Mary Joyce Taylor Crisp Memorial Student Union", "Dining and Student Life", 35.2436004, -80.8560014, "The Mary Joyce Taylor Crisp Memorial Student Union is a major student life building on campus. It includes student gathering spaces, dining options, the campus bookstore, and student activity areas. Top Floor: Grimes Lounge Middle Floor / Floor Below Grimes Lounge: Lorraine’s - small soul food buffet / dining area Spelling needs verification Bottom Floor: Bull Pen - student hangout and dining area Pizza Hut - located inside the Bull Pen Campus Bookstore", "student union mary joyce taylor crisp grimes lounge lorraine s loraine soul food buffet dining bull pen pizza hut bookstore campus hangout life"],
  ["Arts Factory", "Dining and Student Life", 35.2385516, -80.859142, "Arts Factory is a creative and cultural venue near Johnson C. Smith University at 1545 W. Trade Street in Charlotte's Historic West End. The building was originally a Griffin Brothers Tire Sales/Griffin Tire property and was renovated into JCSU's Arts Factory, opening around 2010 as the university's first academic facility built outside the main campus. It supported visual and performing arts with classroom space, studios, and a black box theatre. Today, the Arts Factory continues as a local arts and community venue with theatre, exhibitions, performances, workspace, and arts programming connected to West Charlotte's cultural history.", "arts factory jcsu arts factory visual arts performing arts black box theatre theater studio murals west trade street historic west end griffin tire three bone theatre"],
  ["Hardy Liston Hall", "Former / Inactive Housing", 35.2439102, -80.8585233, "Liston Hall is a residence hall named for Dr. Hardy Liston, a former university president. It includes student rooms, lounges, laundry facilities, and recreation space.", "liston hall dorm residence housing laundry lounge"],
  ["Johnson C. Smith Memorial Hall", "Former / Inactive Housing", 35.2431614, -80.8562579, "Johnson C. Smith Memorial Hall was historically used as student housing, but newer university descriptions list it as containing office spaces. Verify its current use before labeling it as housing.", "johnson c smith memorial hall former dorm office space residence life needs verification"],
  ["James H. and Jane M. Berry Hall", "Former / Inactive Housing", 35.2451056, -80.8567475, "Berry Hall was historically listed as a residence hall located toward the northern end of campus. Its current housing status should be verified before marking it as active or abandoned.", "berry hall former dorm residence inactive housing needs verification"],
  ["Myers Hall", "Housing", 35.2445983, -80.8570225, "Myers Hall is an active residence hall currently listed by JCSU housing for freshman male students. Use this marker for students looking for freshman housing, move-in directions, or residence life information.", "myers hall dorm residence freshman males housing life move in"],
  ["New Residence Hall", "Housing", 35.2448625, -80.8550468, "New Residence Hall is a co-ed residential complex with single-room occupancy in a townhouse-style layout. Units include bedrooms, bathrooms, living room, kitchenette, dining area, laundry facilities, computer room, community room, and reading room.", "new residence hall dorm housing suites townhouse co ed"],
  ["Wilbert Greenfield Residence Hall", "Housing", 35.2442821, -80.855477, "Greenfield Hall is an active residence hall currently listed for freshman female students. Use this marker for students looking for freshman housing, move-in directions, or Residence Life information.", "greenfield hall wilbert dorm residence freshman females women s housing life move in"],
  ["Mosaic Village", "Housing", 35.2396087, -80.8587225, "Mosaic Village is a mixed-use student housing complex with apartments, graduate housing, retail space, parking, outdoor seating, and a rooftop terrace view of Charlotte.", "mosaic village the mo apartments student housing graduate parking deck"],
  ["Sanders Hall", "Housing", 35.2443937, -80.8586631, "Sanders Hall is a residence hall with student rooms, a kitchen, lobby, study room, and laundry facilities. It has historically housed freshman male students.", "sanders hall saunders dorm freshman housing residence laundry study room"],
  ["James B. Duke Memorial Hall", "Housing", 35.2441251, -80.8590338, "Duke Hall is a renovated co-ed honors residence hall. It has suite-style housing with two-bedroom suites, kitchens, private baths, Wi-Fi, laundry facilities, classrooms, and a meeting room.", "duke hall honors residence dorm housing suites co ed"],
  ["Hartley Wood Hall", "Housing", 35.2452333, -80.8560886, "Hartley Woods Hall is a campus building connected to arts, performance, academic, or event-related activity. It should be listed as an academic or arts-related building rather than student housing unless Residence Life confirms it is currently used as a dorm.", "hartley woods hall arts performance academic building events music theater campus"],
  ["Mary A. Carter Hall", "Housing", 35.2443682, -80.8561385, "Carter Hall is a historic residence hall originally built in 1896. The building was modernized inside while keeping its historic exterior. It includes student living space and recreation areas.", "carter hall dorm residence housing historic"],
  ["Old Central Steam Plant", "Landmarks", 35.2435012, -80.8549214, "The Old Central Steam Plant is a historic campus utility building and recognizable landmark. It is not a typical student destination, but it can help with wayfinding and campus orientation.", "old central steam plant utility building facilities landmark campus"],
  ["Physical Plant #3", "Landmarks", 35.2419565, -80.856696, "Physical Plant #3 is a campus facilities building used for maintenance, operations, and physical plant support. This location is mainly for staff and campus operations rather than general student services.", "physical plant 3 facilities maintenance operations campus services staff service building"],
  ["Physical Plant #2", "Landmarks", 35.2418302, -80.8567188, "Physical Plant #2 is a campus facilities building used for maintenance, operations, and physical plant support. This location is mainly for staff and campus operations rather than general student services.", "physical plant 2 facilities maintenance operations campus services staff service building"],
  ["Jane M. Smith Hall (Chapel)", "Landmarks", 35.2419091, -80.8575869, "Memorial Church is a campus religious life and event space. It can serve as a landmark for navigation and may be used for worship, ceremonies, meetings, or special campus events.", "memorial church chapel worship religious life events ceremony landmark"],
  ["Entrance #1", "Parking and Transportation", 35.2445557, -80.8575333, "Entrance #1 is a campus entry point used for navigating onto or around JCSU. This marker helps students, visitors, and drivers identify access points to campus.", "entrance campus gate access point driving directions"],
  ["Entrance #2", "Parking and Transportation", 35.2433066, -80.8580289, "Entrance #2 is a campus entry point used for navigating onto or around JCSU. This marker helps students, visitors, and drivers identify access points to campus.", "entrance campus gate access point driving directions"],
  ["Public Parking", "Parking and Transportation", 35.2421613, -80.8543043, "Public Parking is a visitor-accessible parking area near campus. Visitors should check posted signs, time limits, payment requirements, and campus parking rules before leaving their vehicle.", "public parking visitor guest lot campus visitors"],
  ["Faculty Parking", "Parking and Transportation", 35.2423836, -80.8579673, "Student Parking is a campus parking area for students with the proper JCSU parking decal or permission. Students should follow posted signs and campus parking rules.", "student parking lot decal permit commuter car"],
  ["Faculty Parking", "Parking and Transportation", 35.2416051, -80.8570855, "Faculty Parking is a campus parking area for faculty and staff with the proper JCSU parking decal or permission. Students and visitors should check posted signs before parking here.", "faculty parking staff lot decal permit"],
  ["Faculty Parking", "Parking and Transportation", 35.2418184, -80.8565133, "Faculty Parking is a campus parking area for faculty and staff with the proper JCSU parking decal or permission. Students and visitors should check posted signs before parking here.", "faculty parking staff lot decal permit"],
  ["Faculty Parking", "Parking and Transportation", 35.2415435, -80.8559616, "Faculty Parking is a campus parking area for faculty and staff with the proper JCSU parking decal or permission. Students and visitors should check posted signs before parking here.", "faculty parking staff lot decal permit"],
  ["Faculty Parking", "Parking and Transportation", 35.2416077, -80.8555508, "Faculty Parking is a campus parking area for faculty and staff with the proper JCSU parking decal or permission. Students and visitors should check posted signs before parking here.", "faculty parking staff lot decal permit"],
  ["Faculty Parking", "Parking and Transportation", 35.2424072, -80.8553327, "Faculty Parking is a campus parking area for faculty and staff with the proper JCSU parking decal or permission. Students and visitors should check posted signs before parking here.", "faculty parking staff lot decal permit"],
  ["Student Parking", "Parking and Transportation", 35.2450371, -80.8557988, "Student Parking is a campus parking area for students with the proper JCSU parking decal or permission. Students should follow posted signs and campus parking rules.", "student parking lot decal permit commuter car"],
  ["Student Parking", "Parking and Transportation", 35.2443228, -80.8591782, "Student Parking is a campus parking area for students with the proper JCSU parking decal or permission. Students should follow posted signs and campus parking rules.", "student parking lot decal permit commuter car"],
  ["Faculty/Student Parking", "Parking and Transportation", 35.2448025, -80.8590441, "This parking area is available for both students and faculty with the proper JCSU parking decal, permit, or campus authorization. Drivers should follow posted signs and campus parking rules before parking.", "student parking faculty staff shared lot decal permit commuter campus"],
  ["Faculty/Student Parking", "Parking and Transportation", 35.243703, -80.8591722, "This parking area is available for both students and faculty with the proper JCSU parking decal, permit, or campus authorization. Drivers should follow posted signs and campus parking rules before parking.", "student parking faculty staff shared lot decal permit commuter campus"],
  ["Student Parking", "Parking and Transportation", 35.2455213, -80.854893, "Student Parking is a campus parking area for students with the proper JCSU parking decal or permission. Students should follow posted signs and campus parking rules.", "student parking lot decal permit commuter car"]
].map(([name, layer, lat, lng, description, keywordText]) => ({
  name,
  layer,
  category: categoryByLayer[layer] || layer,
  description,
  keywords: keywordText.split(" "),
  lat,
  lng,
  routeAccessPoints: routeAccessPointsByLocation[name] || null
}));
