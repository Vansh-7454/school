import connectToDatabase from "./db";
import {
  Event,
  Notice,
  GalleryItem,
  Article,
  type IEvent,
  type INotice,
  type IGalleryItem,
  type IArticle,
} from "@/models";

// Static Fallback Data
export const STATIC_EVENTS: Array<Omit<Partial<IEvent>, "_id"> & { _id: string; slug: string }> = [
  {
    _id: "evt-1",
    title: "Cambridge International Olympiad Honours Ceremony",
    slug: "cambridge-olympiad-honours-2026",
    category: "Academic",
    date: new Date("2026-06-18T14:00:00Z"),
    time: "02:00 PM – 05:00 PM",
    location: "Great Acoustic Hall",
    summary:
      "Honouring Aurelia scholars who earned Top in the World medals across Chemistry, Advanced Mathematics, and Latin.",
    description:
      "A grand annual congregation welcoming distinguished academics, parents, and alumni to confer international Olympiad citations on 34 Aurelia laureates.",
    longDescription:
      "The Cambridge International Olympiad Honours Ceremony remains our flagship intellectual celebration. Scholars from Years 10 through 13 who placed in the top 1% internationally across global STEM, Classical Languages, and Humanities Olympiads received university fellowship sponsorships and silver laurel pins from guest speaker Prof. Dame Fiona Macleod of Cambridge University.",
    featured: false,
  },
  {
    _id: "evt-2",
    title: "Serpentine Regatta & Inter-House Sculling Finals",
    slug: "serpentine-regatta-finals-2026",
    category: "Sports",
    date: new Date("2026-07-04T09:00:00Z"),
    time: "09:00 AM – 03:30 PM",
    location: "Aurelia Boathouse & Serpentine Reach",
    summary:
      "Four houses competed in eight-oar carbon shells along the 2,000m Olympic course before a cheering crowd of 1,200 spectators.",
    description:
      "A thrilling summer sports tradition with traditional strawberries, Pimms, brass band fanfare, and rigorous athletic competition on the water.",
    longDescription:
      "The 2026 Serpentine Regatta witnessed Cavendish House breaking a twelve-year record in the Senior Eights final, edging out Grosvenor House by a thrilling quarter-canvas margin. Over 1,200 family members gathered along the banks enjoying chamber brass music and picnic hampers prepared by our culinary team.",
    featured: false,
  },
  {
    _id: "evt-3",
    title: "Summer Choral Evensong & Bach Cantatas",
    slug: "summer-choral-evensong-2026",
    category: "Cultural",
    date: new Date("2026-09-12T17:30:00Z"),
    time: "05:30 PM – 07:45 PM",
    location: "St. Jude’s College Chapel",
    summary:
      "The Aurelia Consort joined the London Baroque Players in performing Bach’s Magnificat under vaulted gothic stonework.",
    description:
      "A transcendent evening of sacred polyphony, solo treble arias, and candlelit reflection marking the beginning of the Michaelmas term.",
    longDescription:
      "Directed by Dr. Julian Callow, the Chapel Consort presented a transcendent recital of sacred baroque polyphony, culminating in J.S. Bach's Magnificat in D major. Accompanying student soloists was the London Baroque Soloists ensemble playing on authentic period instruments.",
    featured: false,
  },
  {
    _id: "evt-4",
    title: "Autumn Open Morning & Campus Experience",
    slug: "autumn-open-morning-2026",
    category: "Community",
    date: new Date("2026-10-14T09:30:00Z"),
    time: "09:30 AM – 01:00 PM",
    location: "Historic Quadrangle & Great Hall",
    summary:
      "Prospective families tour 45 acres of collegiate grounds, observe live robotics seminars, and converse with senior leadership.",
    description:
      "Our premier open event for families seeking 2027/28 admissions, featuring interactive subject demonstrations, student ambassador tours, and headmaster keynote.",
    longDescription:
      "Discover the rhythm of an Aurelia day. Prospective scholars and parents explore our advanced wet-laboratories, fine art studios, Olympic athletic pavilion, and boarding residences. Head of School Dame Margaret Thorne presents the educational vision of intellectual courage, followed by informal Q&A coffee in the Cloisters.",
    featured: true,
  },
  {
    _id: "evt-5",
    title: "International Cultural & Culinary Heritage Gala",
    slug: "international-cultural-gala-2026",
    category: "Cultural",
    date: new Date("2026-11-02T16:00:00Z"),
    time: "04:00 PM – 08:30 PM",
    location: "Founders Lawn & Conservatory Atrium",
    summary:
      "A vibrant celebration of our 68 represented nationalities with global culinary pavilions, traditional dance, and student world music.",
    description:
      "An annual community spectacle highlighting the rich international diversity of Aurelia through authentic gastronomy and folkloric performances.",
    longDescription:
      "Every autumn our campus transforms into a world festival. Parents and students curate 68 national stalls serving authentic regional dishes, while our amphitheatre hosts traditional dance, Japanese Taiko drumming, flamenco guitarists, and an international costume procession celebrating unity through diversity.",
    featured: true,
  },
  {
    _id: "evt-6",
    title: "Symposium on Ethics, Quantum Tech & Artificial Intelligence",
    slug: "symposium-ethics-quantum-ai-2026",
    category: "Academic",
    date: new Date("2026-11-18T13:30:00Z"),
    time: "01:30 PM – 05:30 PM",
    location: "Cavendish Innovation Auditorium",
    summary:
      "Keynote addresses from Oxford researchers and AI ethicists, followed by student debate panels examining technological frontiers.",
    description:
      "Secondary students present peer-reviewed original hypotheses alongside leading university researchers in computing and biomedical ethics.",
    longDescription:
      "Co-hosted by the Aurelia Computer Science Society and Oxford University’s Institute for Ethics in AI, this half-day symposium convenes keynote lecturers, venture technologists, and senior student researchers to interrogate algorithmic transparency, quantum cryptography, and biotechnology policy.",
    featured: false,
  },
  {
    _id: "evt-7",
    title: "Annual Candlelight Festival of Lessons & Carols",
    slug: "festival-lessons-and-carols-2026",
    category: "Cultural",
    date: new Date("2026-12-10T18:30:00Z"),
    time: "06:30 PM – 09:15 PM",
    location: "Aurelia Chapel & Great Nave",
    summary:
      "A traditional nine lessons choral celebration featuring 120 choristers, brass fanfare, and candlelight procession.",
    description:
      "A beloved winter tradition dating back to our founding year. Formal evening attire with festive reception in the Old Library.",
    longDescription:
      "Illuminated solely by 1,000 beeswax candles, the Great Nave welcomes students, governors, and alumni for the timeless Festival of Lessons and Carols. Featuring classic hymns, readings in five languages, and the premiere of a new choral commission composed by our Year 12 music scholar.",
    featured: false,
  },
  {
    _id: "evt-8",
    title: "Ivy League & Oxbridge Universities Colloquium 2027",
    slug: "ivy-league-oxbridge-colloquium-2027",
    category: "Academic",
    date: new Date("2027-01-16T10:00:00Z"),
    time: "10:00 AM – 04:00 PM",
    location: "Millennium Hall & Exhibition Centre",
    summary:
      "Senior admissions deans from Harvard, MIT, Oxford, Cambridge, and Stanford conduct admissions masterclasses and essay workshops.",
    description:
      "An intensive pre-university conference designed to prepare Years 11 and 12 scholars for premier global university matriculation.",
    longDescription:
      "Aurelia’s Higher Education Department hosts 24 top international universities for interactive roundtables, mock interview critiques, and masterclasses on admissions essays. Open to all senior Aurelia students and invited partner school delegations across Greater London.",
    featured: false,
  },
];

export const STATIC_NOTICES: Array<Omit<Partial<INotice>, "_id"> & { _id: string; slug: string }> = [
  {
    _id: "not-1",
    title: "2026 Cambridge IGCSE & IB Diploma Results Gala",
    slug: "cambridge-igcse-ib-results-gala-2026",
    body: "We celebrate an exceptional examination cycle. 98.4% of Aurelia scholars scored in the global 90th percentile, with an average IB Diploma score of 39.4 points. All graduating sixth formers secured their first-choice Russell Group or Ivy League matriculation offers.",
    date: new Date("2026-09-15"),
    category: "Academics",
    important: true,
    attachmentLabel: "Examination-Cohort-Report-2026.pdf",
  },
  {
    _id: "not-2",
    title: "Michaelmas Term Parent-Teacher Consultations & Portal Booking",
    slug: "parent-teacher-consultations-michaelmas-2026",
    body: "The digital appointment scheduler is open on the parent portal for Michaelmas term progress consultations. Parents may book 15-minute consultations with subject teachers, form tutors, and house masters across October 20 to 22.",
    date: new Date("2026-09-22"),
    category: "General",
    important: false,
    attachmentLabel: "Consultation-Schedule-Guide.pdf",
  },
  {
    _id: "not-3",
    title: "Cavendish Innovation Pavilion: Robotics & STEM Wing Unveiling",
    slug: "cavendish-innovation-pavilion-unveiling",
    body: "Following 14 months of construction, the ₹65 Crore Cavendish Innovation Pavilion opens this term. The facility houses high-precision CNC routers, 24 automated wet-lab workstations, a cleanroom for semiconductor studies, and high-altitude weather telemetry.",
    date: new Date("2026-09-26"),
    category: "Campus Facilities",
    important: true,
    attachmentLabel: "STEM-Pavilion-Prospectus.pdf",
  },
  {
    _id: "not-4",
    title: "Lord Mountbatten Aquatic Centre Reopening & Swim Timetable",
    slug: "aquatic-centre-reopening-timetable",
    body: "Modernisation of the 50-metre competition pool, biometric dive sensors, and UV water purifiers is complete. Early morning lane swimming opens Tuesday at 06:15 AM for registered varsity and amateur squad members.",
    date: new Date("2026-09-28"),
    category: "Sports",
    important: false,
    attachmentLabel: "Aquatic-Timetable-Autumn-2026.pdf",
  },
  {
    _id: "not-5",
    title: "Scholarship & Bursary Applications Open for 2027/28",
    slug: "scholarship-bursary-applications-2027",
    body: "The Board of Governors announces open applications for Academic, STEM Innovation, and Music Conservatoire scholarships for students entering Years 7, 9, and 12. Means-tested bursary assistance covering up to 100% of fees is available.",
    date: new Date("2026-10-01"),
    category: "Admissions",
    important: true,
    attachmentLabel: "Scholarship-Regulations-2027.pdf",
  },
  {
    _id: "not-6",
    title: "Aurelia Model United Nations (AureliaMUN 2026) Delegate Selection",
    slug: "aureliamun-2026-delegate-selection",
    body: "Auditions and speech submissions for the 18-member delegation representing Aurelia at the European Youth Parliament in Strasbourg and THIMUN The Hague are now open to scholars in Years 10 through 13.",
    date: new Date("2026-10-04"),
    category: "Student Life",
    important: false,
    attachmentLabel: "MUN-Application-Dossier.pdf",
  },
  {
    _id: "not-7",
    title: "Autumn Term Co-Curricular Society Registration Open",
    slug: "autumn-co-curricular-registration-2026",
    body: "Over 40 student-led societies—including Aeronautical Drone Lab, Shakespearean Players, Fencing Academy, and Quantum Computing Guild—are accepting member sign-ups through Friday on the internal student portal.",
    date: new Date("2026-10-08"),
    category: "Student Life",
    important: false,
    attachmentLabel: "Societies-Directory-2026.pdf",
  },
  {
    _id: "not-8",
    title: "Campus Traffic & School Coach Route Modifications",
    slug: "campus-traffic-coach-routes-2026",
    body: "To support our ongoing clean-air initiative, all vehicle entry for morning drop-off is channeled through the West Gate security kiosk. Bus Routes 4 and 11 have adjusted stop timings by 8 minutes to mitigate High Street Kensington traffic.",
    date: new Date("2026-10-12"),
    category: "Administrative",
    important: false,
    attachmentLabel: "Coach-Route-Map-Update.pdf",
  },
  {
    _id: "not-9",
    title: "Winter Term Boarding Exeat & Holiday Closure Notice",
    slug: "winter-boarding-exeat-schedule-2026",
    body: "Residential houses will close for the Michaelmas half-term break on Friday 24th October at 16:30 and reopen on Sunday 2nd November at 14:00. Airport transfer coaches must be reserved at least one week in advance.",
    date: new Date("2026-10-16"),
    category: "Boarding",
    important: false,
    attachmentLabel: "Boarding-Exeat-Protocol.pdf",
  },
  {
    _id: "not-10",
    title: "Mandatory Health & Immunization Verification Update",
    slug: "health-immunization-verification-update-2026",
    body: "In accordance with UK Public Health guidelines for international collegiate institutions, all incoming day and boarding pupils must confirm updated immunization records via the school health portal by October 30th.",
    date: new Date("2026-10-20"),
    category: "Health & Wellbeing",
    important: true,
    attachmentLabel: "Medical-Consent-Form.pdf",
  },
];

export const STATIC_ARTICLES: Array<Omit<Partial<IArticle>, "_id"> & { _id: string; slug: string }> = [
  {
    _id: "art-1",
    title: "Aurelia Robotics League Crowned World Champions in Tokyo",
    slug: "aurelia-robotics-world-champions-tokyo",
    excerpt:
      "Our student mechatronics team won the international FIRST Robotics Global Championship with an autonomous parcel-sorting bot.",
    category: "Achievements",
    author: "Dr. Marcus Vance, Head of STEM",
    publishedAt: new Date("2026-09-18"),
    featured: true,
    readTime: "5 min read",
    body: [
      "In an exhilarating display of algorithmic precision and mechatronic grit, Aurelia International School’s senior robotics team, 'The Aurelia Cygnus', captured the First Place Championship trophy at the 2026 International Youth Robotics Olympiad in Tokyo, Japan.",
      "Competing against 140 premier preparatory academies from 48 nations, the five-member team—comprising Year 11 and 12 scholars—designed and fabricated an autonomous pneumatic robot capable of multi-spectral object classification and high-speed sorting under strict 0.05-second latency constraints.",
      "The victory caps ten months of rigorous prototyping inside the Cavendish STEM Makerspace. In addition to the grand championship, Aurelia was awarded the prestigious Turing Ethical AI Ribbon for releasing their entire software framework as open-source documentation for developing schools worldwide.",
      "‘This milestone demonstrates what happens when foundational scientific theory is matched with fearless creative execution,’ remarked Head of School Dame Margaret Thorne upon the team’s triumphant return to Heathrow.",
    ],
  },
  {
    _id: "art-2",
    title: "The Architecture of Curiosity: Inside the New Cavendish Innovation Pavilion",
    slug: "architecture-of-curiosity-cavendish-pavilion",
    excerpt:
      "A photographic architectural tour of our new ₹65 Crore STEM complex blending Georgian stone heritage with carbon-neutral design.",
    category: "Campus News",
    author: "Helena Rostova, Director of Development",
    publishedAt: new Date("2026-09-24"),
    featured: false,
    readTime: "4 min read",
    body: [
      "When Sir Christopher Wren laid out plans for scholarly quadrangles in seventeenth-century Britain, he understood that architecture quietly sculpts the mind. Three centuries later, Aurelia’s new Cavendish Innovation Pavilion honors that lineage while leaping into the future.",
      "Rising three storeys beside the Serpentine Waterway, the building is wrapped in high-efficiency triple-glazed glass curtains and locally quarried Portland stone. Solar geothermal piles heat the facility passively, making it the first net-zero educational science pavilion in Greater London.",
      "Within its walls, boundaries between disciplines dissolve. The robotics bay opens directly onto an organic wet-laboratory, allowing environmental scientists to deploy autonomous telemetry drones directly into campus wetlands.",
      "‘We did not design classrooms; we built discovery incubators,’ explained lead architect Julian Davenport. ‘Every surface, from writable electrostatic walls to acoustic isolation pods, invites spontaneous inquiry.’",
    ],
  },
  {
    _id: "art-3",
    title: "Student Voice: Why Civil Disagreement is Our Greatest Academic Superpower",
    slug: "student-voice-civil-disagreement-superpower",
    excerpt:
      "Head Prefect Maya Al-Mansoor reflects on how Harkness discussion tables cultivate intellectual humility and moral spine.",
    category: "Student Voices",
    author: "Maya Al-Mansoor, Head Prefect (Year 13)",
    publishedAt: new Date("2026-09-26"),
    featured: false,
    readTime: "6 min read",
    body: [
      "At Aurelia, our seminar tables are round for a deliberate reason: there is no head of the table, no pulpit from which received wisdom is dispensed unchallenged. Around our Harkness tables, sixteen scholars sit as intellectual equals.",
      "In a world where digital discourse too often collapses into polarized echo chambers, the ability to sit across from a peer, listen deeply to an ideological opponent, and dissect ideas rather than character is nothing short of revolutionary.",
      "Last term in our Theory of Knowledge seminar, we spent two hours interrogating the ethics of sovereign genetic editing. Perspectives spanned utilitarian biology, deontological philosophy, and religious tradition. No voices were raised; no minds remained unchanged.",
      "Civil disagreement does not mean passive compromise. It means sharpening our convictions against the whetstone of rigorous critique. That is the true gift Aurelia gives to every scholar who passes through its gates.",
    ],
  },
  {
    _id: "art-4",
    title: "Conserving the Classics: The Aurelia Choir Records Medieval Polyphony at Salisbury",
    slug: "aurelia-choir-records-salisbury-cathedral",
    excerpt:
      "A 60-voice student consort joined sound engineers to record rarely heard 15th-century choral manuscripts in 8-second cathedral acoustics.",
    category: "Achievements",
    author: "Dr. Julian Callow, Director of Music",
    publishedAt: new Date("2026-09-10"),
    featured: false,
    readTime: "4 min read",
    body: [
      "Over four misty dawns at Salisbury Cathedral, sixty choristers of the Aurelia Consort stood beneath the tallest stone spire in Britain, reviving forgotten polyphonic masterworks preserved only in the British Library's Cottonian manuscripts.",
      "Recorded by Grammy-winning classical producers using custom binaural microphones, the album features motets by John Dunstaple and Robert Fayrfax that had not been heard in acoustic performance for nearly six centuries.",
      "‘Singing in eight seconds of natural stone reverberation requires incredible breath control and listening discipline,’ said lead treble soloist Arthur Pendelton (Year 9). ‘Every note feels like it floats in timeless air.’",
      "The recording will be released internationally on Deutsche Grammophon’s youth imprint this November, with proceeds funding choral scholarships for underprivileged young vocalists.",
    ],
  },
  {
    _id: "art-5",
    title: "From Kensington to Oxford: 32 Scholars Secure Early Oxbridge & Ivy League Offers",
    slug: "32-scholars-early-oxbridge-ivy-league-offers",
    excerpt:
      "A record-breaking year for our sixth-form cohort, with admissions letters arriving from Oxford, Cambridge, Yale, Princeton, and Columbia.",
    category: "Announcements",
    author: "Admissions Secretariat",
    publishedAt: new Date("2026-08-30"),
    featured: false,
    readTime: "3 min read",
    body: [
      "Aurelia International School is immensely proud to announce that 32 members of our graduating class have received early admissions offers and full academic scholarships from the world’s most selective universities.",
      "Nineteen scholars secured offers at Oxford and Cambridge across disciplines including Philosophy, Politics & Economics (PPE), Natural Sciences, Architecture, and Oriental Studies. A further thirteen were accepted to Ivy League institutions including Yale, Princeton, Columbia, and Brown.",
      "These offers reflect years of sustained scholarly passion, sustained community service, and independent capstone research defended before faculty panels.",
      "‘We congratulate each scholar, their families, and our dedicated university counseling team who walk alongside every student throughout the rigorous selection journey,’ said Head of Academics Dr. Siobhan O’Connor.",
    ],
  },
  {
    _id: "art-6",
    title: "The Rewilding of St. Jude’s: Student Biologists Restore Historic Kensington Wetlands",
    slug: "rewilding-st-judes-student-biologists-wetlands",
    excerpt:
      "How an IB Environmental Systems project blossomed into an accredited urban nature reserve supporting native otters and endangered waterfowl.",
    category: "Campus News",
    author: "Liam Henderson (Year 12) & Eco-Guild",
    publishedAt: new Date("2026-08-15"),
    featured: false,
    readTime: "5 min read",
    body: [
      "Three years ago, the southern boundary of our campus was a neglected drainage canal. Today, it is the St. Jude’s Urban Nature Reserve—a thriving sanctuary of kingfishers, native water voles, and over forty species of indigenous flora.",
      "What began as a collaborative Year 11 IB fieldwork exercise has evolved into a year-round, student-led conservation laboratory. Scholars monitor water purity using automated telemetry, plant yellow flag irises to filter runoff, and maintain camera traps.",
      "Last month, the London Wildlife Trust officially granted the site accredited Nature Reserve status, making Aurelia the only school in central London to steward a recognized metropolitan biodiversity refuge.",
      "‘Conservation cannot simply be studied on a whiteboard,’ says biology teacher Mrs. Laura Thorne. ‘When young people dig their boots into the mud, ecology becomes personal and permanent.’",
    ],
  },
  {
    _id: "art-7",
    title: "Aurelia Girls’ 1st VIII Wins Gold at the National Schools Regatta",
    slug: "girls-first-eight-gold-national-regatta",
    excerpt:
      "A masterclass in synchronized power and tactical pacing propels our senior rowing crew to historic national glory on Dorney Lake.",
    category: "Achievements",
    author: "Coach Simon Sterling",
    publishedAt: new Date("2026-07-28"),
    featured: false,
    readTime: "4 min read",
    body: [
      "In a scintillating final that had spectators on their feet at Dorney Lake, the Aurelia Girls’ 1st VIII sculling crew won the Princess Elizabeth Challenge Trophy at the 2026 National Schools Regatta.",
      "Coxed by Year 11 scholar Sofia Chen, the crew executed a daring tactical plan: holding a composed 34-stroke rate through the headwinds before unleashing an electrifying 39-stroke sprint across the final 400 metres.",
      "They crossed the finish line 1.8 seconds clear of their rivals, recording the fastest schoolgirl time in the regatta’s 84-year history.",
      "‘Our rowers wake up at 05:45 AM through winter sleet and summer heat,’ noted Director of Sport Capt. James Bennett. ‘This gold medal is the direct fruit of unyielding commitment and mutual trust.’",
    ],
  },
  {
    _id: "art-8",
    title: "Letters from the East End: Our Year 10 Outreach Literacy Partnership",
    slug: "letters-from-east-end-literacy-outreach",
    excerpt:
      "Aurelia students partner with local community libraries to provide 3,000 hours of peer literacy mentoring and multilingual book drives.",
    category: "Student Voices",
    author: "Elena Rostova (Year 10)",
    publishedAt: new Date("2026-07-10"),
    featured: false,
    readTime: "4 min read",
    body: [
      "Every Saturday morning, a yellow Aurelia minibus pulls up outside the Whitechapel Community Library. Inside, sixteen of us sit side by side with young primary pupils, opening copies of classic literature and bilingual illustrated stories.",
      "The Aurelia Literacy Initiative began two years ago with a simple goal: ensuring that every child in our wider city has access to books and patient, joyful one-on-one reading guidance.",
      "To date, our students have dedicated more than 3,000 volunteer hours and collected 4,500 curated hardcovers through our annual campus book drives.",
      "‘When a seven-year-old child looks up at you with wide eyes after decoding their first full chapter alone, privilege ceases to be an abstract concept—it becomes a solemn responsibility to serve,’ writes Year 10 mentor Elena.",
    ],
  },
];

export const STATIC_GALLERY_ITEMS: Array<Omit<Partial<IGalleryItem>, "_id"> & { _id: string }> = [
  {
    _id: "gal-1",
    title: "Morning Scull on Serpentine Lake",
    category: "Sports",
    caption:
      "The Senior Varsity rowing squad slices through golden morning mist during pre-dawn regatta trials.",
    artVariant: "regatta",
    aspect: "landscape",
    date: new Date("2026-09-20"),
  },
  {
    _id: "gal-2",
    title: "Cavendish Astronomical Observatory",
    category: "Science",
    caption:
      "Students observe the rings of Saturn through our 14-inch Schmidt-Cassegrain telescope beneath clear London skies.",
    artVariant: "observatory",
    aspect: "portrait",
    date: new Date("2026-09-18"),
  },
  {
    _id: "gal-3",
    title: "Great Acoustic Hall Symphony Recital",
    category: "Arts",
    caption:
      "The 80-piece Aurelia Symphony Orchestra performs Beethoven's 9th Symphony under vaulted acoustic shells.",
    artVariant: "orchestra",
    aspect: "landscape",
    date: new Date("2026-09-15"),
  },
  {
    _id: "gal-4",
    title: "Autonomous Robotics & Mechatronics Lab",
    category: "Science",
    caption:
      "Engineering scholars fine-tune pneumatic actuators and computer vision neural nets in the robotics workshop.",
    artVariant: "robotics",
    aspect: "square",
    date: new Date("2026-09-12"),
  },
  {
    _id: "gal-5",
    title: "Bodleian-Style College Library",
    category: "Campus",
    caption:
      "Quiet afternoon scholarship in the Great Library with brass reading lamps and three storeys of archival volumes.",
    artVariant: "library",
    aspect: "portrait",
    date: new Date("2026-09-08"),
  },
  {
    _id: "gal-6",
    title: "St. Jude’s Quadrangle at Golden Hour",
    category: "Campus",
    caption:
      "Historic Georgian brickwork, stone balustrades, and manicured central lawns bathed in autumnal late afternoon sun.",
    artVariant: "quadrangle",
    aspect: "landscape",
    date: new Date("2026-09-05"),
  },
  {
    _id: "gal-7",
    title: "Varsity Fencing Épée Championship",
    category: "Sports",
    caption:
      "Speed, chivalry, and split-second blade precision on the championship piste during inter-school bouts.",
    artVariant: "fencing",
    aspect: "square",
    date: new Date("2026-08-28"),
  },
  {
    _id: "gal-8",
    title: "Botanical Glasshouse & Living Ecosystem",
    category: "Science",
    caption:
      "Student horticulturists cultivate endangered orchids, hydroponic herbs, and micro-algae photobioreactors.",
    artVariant: "botany",
    aspect: "portrait",
    date: new Date("2026-08-20"),
  },
  {
    _id: "gal-9",
    title: "Shakespeare on the Lawn: The Tempest",
    category: "Arts",
    caption:
      "The Aurelia Drama Guild performs Prospero's island revels under theatrical lanterns in the Rose Garden.",
    artVariant: "drama",
    aspect: "landscape",
    date: new Date("2026-08-14"),
  },
  {
    _id: "gal-10",
    title: "Advanced Organic Synthesis Lab",
    category: "Science",
    caption:
      "Senior chemistry students run fractional distillation and rotary evaporation inside laminar flow hoods.",
    artVariant: "chemistry",
    aspect: "square",
    date: new Date("2026-08-04"),
  },
  {
    _id: "gal-11",
    title: "Olympic Aquatic Center 50m Pool",
    category: "Sports",
    caption:
      "Underwater light caustics and Olympic lane lines during the annual Inter-House Swimming Gala.",
    artVariant: "swimming",
    aspect: "landscape",
    date: new Date("2026-07-25"),
  },
  {
    _id: "gal-12",
    title: "Fine Art Atelier: Flemish Oil Study",
    category: "Arts",
    caption:
      "Mastery of anatomical proportion and natural light through layered oil techniques on Belgian linen.",
    artVariant: "fine-art",
    aspect: "portrait",
    date: new Date("2026-07-15"),
  },
  {
    _id: "gal-13",
    title: "Model United Nations General Assembly",
    category: "Events",
    caption:
      "Delegates debate international humanitarian treaties and climate mitigation in our mock UN chamber.",
    artVariant: "diplomacy",
    aspect: "landscape",
    date: new Date("2026-07-08"),
  },
  {
    _id: "gal-14",
    title: "Pure Mathematics & Knot Theory Proofs",
    category: "Science",
    caption:
      "Harkness seminar derivations visualizing the Poincaré conjecture and multidimensional topology.",
    artVariant: "mathematics",
    aspect: "square",
    date: new Date("2026-06-25"),
  },
  {
    _id: "gal-15",
    title: "Aeronautics & Drone Wind Tunnel",
    category: "Science",
    caption:
      "Testing laminar airflow and boundary layer drag on custom 3D-printed carbon fiber aerodynamic foils.",
    artVariant: "aerospace",
    aspect: "landscape",
    date: new Date("2026-06-18"),
  },
  {
    _id: "gal-16",
    title: "Chapel Choir Evensong Rehearsal",
    category: "Arts",
    caption:
      "Choral polyphony and pure treble harmonies resonating off centuries-old limestone arches.",
    artVariant: "choir",
    aspect: "portrait",
    date: new Date("2026-06-10"),
  },
  {
    _id: "gal-17",
    title: "Grandmasters Chess Tournament",
    category: "Campus",
    caption:
      "Intense concentration over Staunton rosewood boards in the historic Cloisters reading salon.",
    artVariant: "chess",
    aspect: "square",
    date: new Date("2026-05-30"),
  },
  {
    _id: "gal-18",
    title: "Commencement Twilight Celebrations",
    category: "Events",
    caption:
      "Graduating sixth-form scholars toss ceremonial velvet caps into the evening sky as bagpipes play.",
    artVariant: "commencement",
    aspect: "landscape",
    date: new Date("2026-05-22"),
  },
  {
    _id: "gal-19",
    title: "All-Collegiate Parliamentary Debate",
    category: "Events",
    caption:
      "Rhetoric, rebuttal, and spontaneous wit during the Oxford-style debate cup in Founders Hall.",
    artVariant: "debating",
    aspect: "portrait",
    date: new Date("2026-05-12"),
  },
  {
    _id: "gal-20",
    title: "Additive Fabrication & Makerspace Hub",
    category: "Science",
    caption:
      "Precision laser cutters and five-axis CNC routers creating student-designed mechanical prosthetic prototypes.",
    artVariant: "makerspace",
    aspect: "square",
    date: new Date("2026-05-02"),
  },
  {
    _id: "gal-21",
    title: "Equestrian Show Jumping Derby",
    category: "Sports",
    caption:
      "Equestrian Society riders clear triple-bar obstacles in the Surrey Hills equestrian reserve.",
    artVariant: "equestrian",
    aspect: "landscape",
    date: new Date("2026-04-20"),
  },
  {
    _id: "gal-22",
    title: "Deep Space Astrophotography Gallery",
    category: "Science",
    caption:
      "Long-exposure hydrogen-alpha composite of the Orion Nebula captured from our rural field station.",
    artVariant: "astronomy",
    aspect: "portrait",
    date: new Date("2026-04-10"),
  },
  {
    _id: "gal-23",
    title: "Lord Mountbatten Athletics Track",
    category: "Sports",
    caption:
      "Sprinters test acceleration on the eight-lane Olympic red synthetic track during morning fitness drills.",
    artVariant: "athletics",
    aspect: "landscape",
    date: new Date("2026-03-28"),
  },
  {
    _id: "gal-24",
    title: "St. Jude’s Chapel Stained Glass Light",
    category: "Campus",
    caption:
      "Prismatic ruby and sapphire light patterns cast across medieval flagstones during morning meditation.",
    artVariant: "chapel",
    aspect: "square",
    date: new Date("2026-03-15"),
  },
];

// Helper Query Functions

/**
 * Fetch Gallery Items with category filter and pagination
 */
export async function getGalleryItems(params?: {
  category?: string;
  page?: number;
  limit?: number;
}) {
  const category = params?.category && params.category !== "All" ? params.category : undefined;
  const page = Math.max(1, params?.page || 1);
  const limit = Math.max(1, params?.limit || 12);

  try {
    await connectToDatabase();
    const query: Record<string, unknown> = {};
    if (category) query.category = category;

    const count = await GalleryItem.countDocuments(query);
    if (count > 0) {
      const items = await GalleryItem.find(query)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        items: JSON.parse(JSON.stringify(items)),
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    }
  } catch {
    console.warn("MongoDB unavailable for GalleryItem query, using static fallback.");
  }

  // Fallback
  let filtered = [...STATIC_GALLERY_ITEMS];
  if (category) {
    filtered = filtered.filter((i) => i.category === category);
  }
  const total = filtered.length;
  const items = filtered.slice((page - 1) * limit, page * limit);

  return {
    items: JSON.parse(JSON.stringify(items)),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/**
 * Fetch Events with category, timeFilter ("upcoming" | "past" | "all"), and pagination
 */
export async function getEvents(params?: {
  category?: string;
  timeFilter?: "all" | "upcoming" | "past";
  page?: number;
  limit?: number;
}) {
  const category = params?.category && params.category !== "All" ? params.category : undefined;
  const timeFilter = params?.timeFilter || "upcoming";
  const page = Math.max(1, params?.page || 1);
  const limit = Math.max(1, params?.limit || 9);
  const now = new Date("2026-09-29T12:00:00Z");

  try {
    await connectToDatabase();
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (timeFilter === "upcoming") {
      query.date = { $gte: now };
    } else if (timeFilter === "past") {
      query.date = { $lt: now };
    }

    const sortOrder: Record<string, 1 | -1> =
      timeFilter === "upcoming" ? { date: 1 } : { date: -1 };

    const count = await Event.countDocuments(query);
    if (count > 0) {
      const rawEvents = await Event.find(query)
        .sort(sortOrder)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      // Featured event
      const featured = await Event.findOne({ featured: true }).lean();

      return {
        events: JSON.parse(JSON.stringify(rawEvents)),
        featuredEvent: featured ? JSON.parse(JSON.stringify(featured)) : null,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    }
  } catch {
    console.warn("MongoDB unavailable for Event query, using static fallback.");
  }

  // Fallback
  let filtered = [...STATIC_EVENTS];
  if (category) {
    filtered = filtered.filter((e) => e.category === category);
  }
  if (timeFilter === "upcoming") {
    filtered = filtered
      .filter((e) => new Date(e.date!) >= now)
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
  } else if (timeFilter === "past") {
    filtered = filtered
      .filter((e) => new Date(e.date!) < now)
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
  } else {
    filtered.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
  }

  const total = filtered.length;
  const events = filtered.slice((page - 1) * limit, page * limit);
  const featured = STATIC_EVENTS.find((e) => e.featured) || STATIC_EVENTS[3];

  return {
    events: JSON.parse(JSON.stringify(events)),
    featuredEvent: JSON.parse(JSON.stringify(featured)),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/**
 * Fetch a single event by slug
 */
export async function getEventBySlug(slug: string) {
  try {
    await connectToDatabase();
    const evt = await Event.findOne({ slug }).lean();
    if (evt) {
      return JSON.parse(JSON.stringify(evt));
    }
  } catch {
    console.warn(`MongoDB unavailable for Event slug "${slug}", checking fallback.`);
  }

  const fallback = STATIC_EVENTS.find((e) => e.slug === slug);
  return fallback ? JSON.parse(JSON.stringify(fallback)) : null;
}

/**
 * Fetch related events
 */
export async function getRelatedEvents(currentSlug: string, limit = 3) {
  try {
    await connectToDatabase();
    const related = await Event.find({ slug: { $ne: currentSlug } })
      .sort({ date: 1 })
      .limit(limit)
      .lean();
    if (related.length > 0) {
      return JSON.parse(JSON.stringify(related));
    }
  } catch {
    // fallback
  }

  const fallback = STATIC_EVENTS.filter((e) => e.slug !== currentSlug).slice(0, limit);
  return JSON.parse(JSON.stringify(fallback));
}

/**
 * Fetch Notices with search and pagination
 */
export async function getNotices(params?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const search = params?.search?.trim();
  const page = Math.max(1, params?.page || 1);
  const limit = Math.max(1, params?.limit || 10);

  try {
    await connectToDatabase();
    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const count = await Notice.countDocuments(query);
    if (count > 0) {
      const rawNotices = await Notice.find(query)
        .sort({ important: -1, date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        notices: JSON.parse(JSON.stringify(rawNotices)),
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    }
  } catch {
    console.warn("MongoDB unavailable for Notice query, using static fallback.");
  }

  // Fallback
  let filtered = [...STATIC_NOTICES];
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (n) =>
        n.title?.toLowerCase().includes(s) ||
        n.body?.toLowerCase().includes(s) ||
        n.category?.toLowerCase().includes(s)
    );
  }
  filtered.sort((a, b) => {
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;
    return new Date(b.date!).getTime() - new Date(a.date!).getTime();
  });

  const total = filtered.length;
  const notices = filtered.slice((page - 1) * limit, page * limit);

  return {
    notices: JSON.parse(JSON.stringify(notices)),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/**
 * Fetch Articles with category, search and pagination
 */
export async function getArticles(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const category = params?.category && params.category !== "All" ? params.category : undefined;
  const search = params?.search?.trim();
  const page = Math.max(1, params?.page || 1);
  const limit = Math.max(1, params?.limit || 6);

  try {
    await connectToDatabase();
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const count = await Article.countDocuments(query);
    if (count > 0) {
      const rawArticles = await Article.find(query)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      const featured = await Article.findOne({ featured: true }).lean();

      return {
        articles: JSON.parse(JSON.stringify(rawArticles)),
        featuredArticle: featured ? JSON.parse(JSON.stringify(featured)) : null,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    }
  } catch {
    console.warn("MongoDB unavailable for Article query, using static fallback.");
  }

  // Fallback
  let filtered = [...STATIC_ARTICLES];
  if (category) {
    filtered = filtered.filter((a) => a.category === category);
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title?.toLowerCase().includes(s) ||
        a.excerpt?.toLowerCase().includes(s)
    );
  }
  filtered.sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());

  const total = filtered.length;
  const articles = filtered.slice((page - 1) * limit, page * limit);
  const featured = STATIC_ARTICLES.find((a) => a.featured) || STATIC_ARTICLES[0];

  return {
    articles: JSON.parse(JSON.stringify(articles)),
    featuredArticle: JSON.parse(JSON.stringify(featured)),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string) {
  try {
    await connectToDatabase();
    const art = await Article.findOne({ slug }).lean();
    if (art) {
      return JSON.parse(JSON.stringify(art));
    }
  } catch {
    console.warn(`MongoDB unavailable for Article slug "${slug}", checking fallback.`);
  }

  const fallback = STATIC_ARTICLES.find((a) => a.slug === slug);
  return fallback ? JSON.parse(JSON.stringify(fallback)) : null;
}

/**
 * Fetch related articles
 */
export async function getRelatedArticles(currentSlug: string, limit = 3) {
  try {
    await connectToDatabase();
    const related = await Article.find({ slug: { $ne: currentSlug } })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();
    if (related.length > 0) {
      return JSON.parse(JSON.stringify(related));
    }
  } catch {
    // fallback
  }

  const fallback = STATIC_ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, limit);
  return JSON.parse(JSON.stringify(fallback));
}
