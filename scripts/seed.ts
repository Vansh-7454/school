import * as dotenv from "dotenv";
import path from "path";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/aurelia_school";

// Inline schemas for standalone seeding reliability
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher", "parent"], required: true },
  },
  { timestamps: true }
);

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["Academic", "Sports", "Cultural", "Community"],
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    category: { type: String, required: true },
    important: { type: Boolean, default: false },
    attachmentLabel: { type: String },
  },
  { timestamps: true }
);

const GalleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Sports", "Arts", "Science", "Campus", "Events"],
      required: true,
    },
    caption: { type: String, required: true },
    artVariant: { type: String, required: true },
    aspect: {
      type: String,
      enum: ["portrait", "landscape", "square"],
      default: "landscape",
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    body: { type: [String], required: true },
    category: {
      type: String,
      enum: ["Achievements", "Campus News", "Announcements", "Student Voices"],
      required: true,
    },
    author: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    readTime: { type: String, default: "4 min read" },
  },
  { timestamps: true }
);

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    guardianUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const TimetableSlotSchema = new mongoose.Schema(
  {
    grade: { type: String, required: true },
    section: { type: String, required: true },
    day: { type: String, required: true },
    period: { type: Number, required: true },
    time: { type: String, required: true },
    subject: { type: String, required: true },
    teacherName: { type: String, required: true },
    room: { type: String, required: true },
  },
  { timestamps: true }
);

const AssignmentSchema = new mongoose.Schema(
  {
    grade: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Submitted", "Graded"], default: "Pending" },
    gradeResult: { type: String },
  },
  { timestamps: true }
);

const AttendanceRecordSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Late", "Excused", "Absent"], default: "Present" },
    remarks: { type: String },
  },
  { timestamps: true }
);

const ResultSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    term: { type: String, required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    maxMarks: { type: Number, required: true, default: 100 },
    grade: { type: String, required: true },
    teacherRemarks: { type: String },
  },
  { timestamps: true }
);

const TeacherClassSchema = new mongoose.Schema(
  {
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    studentCount: { type: Number, required: true, default: 20 },
    room: { type: String, required: true },
  },
  { timestamps: true }
);

const AnnouncementSchema = new mongoose.Schema(
  {
    audience: { type: String, enum: ["all", "student", "teacher", "parent"], required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
    priority: { type: String, enum: ["normal", "urgent"], default: "normal" },
    author: { type: String, default: "Head of School Office" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
const Notice = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
const GalleryItem =
  mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);
const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);
const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);
const TimetableSlot =
  mongoose.models.TimetableSlot || mongoose.model("TimetableSlot", TimetableSlotSchema);
const Assignment =
  mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);
const AttendanceRecord =
  mongoose.models.AttendanceRecord || mongoose.model("AttendanceRecord", AttendanceRecordSchema);
const Result = mongoose.models.Result || mongoose.model("Result", ResultSchema);
const TeacherClass =
  mongoose.models.TeacherClass || mongoose.model("TeacherClass", TeacherClassSchema);
const Announcement =
  mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);

// Reference Today: 2026-09-29
const EVENTS_SEED = [
  // 3 Past Events
  {
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

  // 5 Upcoming Events
  {
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

const NOTICES_SEED = [
  {
    title: "2026 Cambridge IGCSE & IB Diploma Results Gala",
    slug: "cambridge-igcse-ib-results-gala-2026",
    body: "We celebrate an exceptional examination cycle. 98.4% of Aurelia scholars scored in the global 90th percentile, with an average IB Diploma score of 39.4 points. All graduating sixth formers secured their first-choice Russell Group or Ivy League matriculation offers.",
    date: new Date("2026-09-15"),
    category: "Academics",
    important: true,
    attachmentLabel: "Examination-Cohort-Report-2026.pdf",
  },
  {
    title: "Michaelmas Term Parent-Teacher Consultations & Portal Booking",
    slug: "parent-teacher-consultations-michaelmas-2026",
    body: "The digital appointment scheduler is open on the parent portal for Michaelmas term progress consultations. Parents may book 15-minute consultations with subject teachers, form tutors, and house masters across October 20 to 22.",
    date: new Date("2026-09-22"),
    category: "General",
    important: false,
    attachmentLabel: "Consultation-Schedule-Guide.pdf",
  },
  {
    title: "Cavendish Innovation Pavilion: Robotics & STEM Wing Unveiling",
    slug: "cavendish-innovation-pavilion-unveiling",
    body: "Following 14 months of construction, the £6.2M Cavendish Innovation Pavilion opens this term. The facility houses high-precision CNC routers, 24 automated wet-lab workstations, a cleanroom for semiconductor studies, and high-altitude weather telemetry.",
    date: new Date("2026-09-26"),
    category: "Campus Facilities",
    important: true,
    attachmentLabel: "STEM-Pavilion-Prospectus.pdf",
  },
  {
    title: "Lord Mountbatten Aquatic Centre Reopening & Swim Timetable",
    slug: "aquatic-centre-reopening-timetable",
    body: "Modernisation of the 50-metre competition pool, biometric dive sensors, and UV water purifiers is complete. Early morning lane swimming opens Tuesday at 06:15 AM for registered varsity and amateur squad members.",
    date: new Date("2026-09-28"),
    category: "Sports",
    important: false,
    attachmentLabel: "Aquatic-Timetable-Autumn-2026.pdf",
  },
  {
    title: "Scholarship & Bursary Applications Open for 2027/28",
    slug: "scholarship-bursary-applications-2027",
    body: "The Board of Governors announces open applications for Academic, STEM Innovation, and Music Conservatoire scholarships for students entering Years 7, 9, and 12. Means-tested bursary assistance covering up to 100% of fees is available.",
    date: new Date("2026-10-01"),
    category: "Admissions",
    important: true,
    attachmentLabel: "Scholarship-Regulations-2027.pdf",
  },
  {
    title: "Aurelia Model United Nations (AureliaMUN 2026) Delegate Selection",
    slug: "aureliamun-2026-delegate-selection",
    body: "Auditions and speech submissions for the 18-member delegation representing Aurelia at the European Youth Parliament in Strasbourg and THIMUN The Hague are now open to scholars in Years 10 through 13.",
    date: new Date("2026-10-04"),
    category: "Student Life",
    important: false,
    attachmentLabel: "MUN-Application-Dossier.pdf",
  },
  {
    title: "Autumn Term Co-Curricular Society Registration Open",
    slug: "autumn-co-curricular-registration-2026",
    body: "Over 40 student-led societies—including Aeronautical Drone Lab, Shakespearean Players, Fencing Academy, and Quantum Computing Guild—are accepting member sign-ups through Friday on the internal student portal.",
    date: new Date("2026-10-08"),
    category: "Student Life",
    important: false,
    attachmentLabel: "Societies-Directory-2026.pdf",
  },
  {
    title: "Campus Traffic & School Coach Route Modifications",
    slug: "campus-traffic-coach-routes-2026",
    body: "To support our ongoing clean-air initiative, all vehicle entry for morning drop-off is channeled through the West Gate security kiosk. Bus Routes 4 and 11 have adjusted stop timings by 8 minutes to mitigate High Street Kensington traffic.",
    date: new Date("2026-10-12"),
    category: "Administrative",
    important: false,
    attachmentLabel: "Coach-Route-Map-Update.pdf",
  },
  {
    title: "Winter Term Boarding Exeat & Holiday Closure Notice",
    slug: "winter-boarding-exeat-schedule-2026",
    body: "Residential houses will close for the Michaelmas half-term break on Friday 24th October at 16:30 and reopen on Sunday 2nd November at 14:00. Airport transfer coaches must be reserved at least one week in advance.",
    date: new Date("2026-10-16"),
    category: "Boarding",
    important: false,
    attachmentLabel: "Boarding-Exeat-Protocol.pdf",
  },
  {
    title: "Mandatory Health & Immunization Verification Update",
    slug: "health-immunization-verification-update-2026",
    body: "In accordance with UK Public Health guidelines for international collegiate institutions, all incoming day and boarding pupils must confirm updated immunization records via the school health portal by October 30th.",
    date: new Date("2026-10-20"),
    category: "Health & Wellbeing",
    important: true,
    attachmentLabel: "Medical-Consent-Form.pdf",
  },
];

const ARTICLES_SEED = [
  {
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
    title: "The Architecture of Curiosity: Inside the New Cavendish Innovation Pavilion",
    slug: "architecture-of-curiosity-cavendish-pavilion",
    excerpt:
      "A photographic architectural tour of our new £6.2M STEM complex blending Georgian stone heritage with carbon-neutral design.",
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

const GALLERY_SEED = [
  // 24 Items across Sports, Arts, Science, Campus, Events with varied aspect ratios
  {
    title: "Morning Scull on Serpentine Lake",
    category: "Sports",
    caption:
      "The Senior Varsity rowing squad slices through golden morning mist during pre-dawn regatta trials.",
    artVariant: "regatta",
    aspect: "landscape",
    date: new Date("2026-09-20"),
  },
  {
    title: "Cavendish Astronomical Observatory",
    category: "Science",
    caption:
      "Students observe the rings of Saturn through our 14-inch Schmidt-Cassegrain telescope beneath clear London skies.",
    artVariant: "observatory",
    aspect: "portrait",
    date: new Date("2026-09-18"),
  },
  {
    title: "Great Acoustic Hall Symphony Recital",
    category: "Arts",
    caption:
      "The 80-piece Aurelia Symphony Orchestra performs Beethoven's 9th Symphony under vaulted acoustic shells.",
    artVariant: "orchestra",
    aspect: "landscape",
    date: new Date("2026-09-15"),
  },
  {
    title: "Autonomous Robotics & Mechatronics Lab",
    category: "Science",
    caption:
      "Engineering scholars fine-tune pneumatic actuators and computer vision neural nets in the robotics workshop.",
    artVariant: "robotics",
    aspect: "square",
    date: new Date("2026-09-12"),
  },
  {
    title: "Bodleian-Style College Library",
    category: "Campus",
    caption:
      "Quiet afternoon scholarship in the Great Library with brass reading lamps and three storeys of archival volumes.",
    artVariant: "library",
    aspect: "portrait",
    date: new Date("2026-09-08"),
  },
  {
    title: "St. Jude’s Quadrangle at Golden Hour",
    category: "Campus",
    caption:
      "Historic Georgian brickwork, stone balustrades, and manicured central lawns bathed in autumnal late afternoon sun.",
    artVariant: "quadrangle",
    aspect: "landscape",
    date: new Date("2026-09-05"),
  },
  {
    title: "Varsity Fencing Épée Championship",
    category: "Sports",
    caption:
      "Speed, chivalry, and split-second blade precision on the championship piste during inter-school bouts.",
    artVariant: "fencing",
    aspect: "square",
    date: new Date("2026-08-28"),
  },
  {
    title: "Botanical Glasshouse & Living Ecosystem",
    category: "Science",
    caption:
      "Student horticulturists cultivate endangered orchids, hydroponic herbs, and micro-algae photobioreactors.",
    artVariant: "botany",
    aspect: "portrait",
    date: new Date("2026-08-20"),
  },
  {
    title: "Shakespeare on the Lawn: The Tempest",
    category: "Arts",
    caption:
      "The Aurelia Drama Guild performs Prospero's island revels under theatrical lanterns in the Rose Garden.",
    artVariant: "drama",
    aspect: "landscape",
    date: new Date("2026-08-14"),
  },
  {
    title: "Advanced Organic Synthesis Lab",
    category: "Science",
    caption:
      "Senior chemistry students run fractional distillation and rotary evaporation inside laminar flow hoods.",
    artVariant: "chemistry",
    aspect: "square",
    date: new Date("2026-08-04"),
  },
  {
    title: "Olympic Aquatic Center 50m Pool",
    category: "Sports",
    caption:
      "Underwater light caustics and Olympic lane lines during the annual Inter-House Swimming Gala.",
    artVariant: "swimming",
    aspect: "landscape",
    date: new Date("2026-07-25"),
  },
  {
    title: "Fine Art Atelier: Flemish Oil Study",
    category: "Arts",
    caption:
      "Mastery of anatomical proportion and natural light through layered oil techniques on Belgian linen.",
    artVariant: "fine-art",
    aspect: "portrait",
    date: new Date("2026-07-15"),
  },
  {
    title: "Model United Nations General Assembly",
    category: "Events",
    caption:
      "Delegates debate international humanitarian treaties and climate mitigation in our mock UN chamber.",
    artVariant: "diplomacy",
    aspect: "landscape",
    date: new Date("2026-07-08"),
  },
  {
    title: "Pure Mathematics & Knot Theory Proofs",
    category: "Science",
    caption:
      "Harkness seminar derivations visualizing the Poincaré conjecture and multidimensional topology.",
    artVariant: "mathematics",
    aspect: "square",
    date: new Date("2026-06-25"),
  },
  {
    title: "Aeronautics & Drone Wind Tunnel",
    category: "Science",
    caption:
      "Testing laminar airflow and boundary layer drag on custom 3D-printed carbon fiber aerodynamic foils.",
    artVariant: "aerospace",
    aspect: "landscape",
    date: new Date("2026-06-18"),
  },
  {
    title: "Chapel Choir Evensong Rehearsal",
    category: "Arts",
    caption:
      "Choral polyphony and pure treble harmonies resonating off centuries-old limestone arches.",
    artVariant: "choir",
    aspect: "portrait",
    date: new Date("2026-06-10"),
  },
  {
    title: "Grandmasters Chess Tournament",
    category: "Campus",
    caption:
      "Intense concentration over Staunton rosewood boards in the historic Cloisters reading salon.",
    artVariant: "chess",
    aspect: "square",
    date: new Date("2026-05-30"),
  },
  {
    title: "Commencement Twilight Celebrations",
    category: "Events",
    caption:
      "Graduating sixth-form scholars toss ceremonial velvet caps into the evening sky as bagpipes play.",
    artVariant: "commencement",
    aspect: "landscape",
    date: new Date("2026-05-22"),
  },
  {
    title: "All-Collegiate Parliamentary Debate",
    category: "Events",
    caption:
      "Rhetoric, rebuttal, and spontaneous wit during the Oxford-style debate cup in Founders Hall.",
    artVariant: "debating",
    aspect: "portrait",
    date: new Date("2026-05-12"),
  },
  {
    title: "Additive Fabrication & Makerspace Hub",
    category: "Science",
    caption:
      "Precision laser cutters and five-axis CNC routers creating student-designed mechanical prosthetic prototypes.",
    artVariant: "makerspace",
    aspect: "square",
    date: new Date("2026-05-02"),
  },
  {
    title: "Equestrian Show Jumping Derby",
    category: "Sports",
    caption:
      "Equestrian Society riders clear triple-bar obstacles in the Surrey Hills equestrian reserve.",
    artVariant: "equestrian",
    aspect: "landscape",
    date: new Date("2026-04-20"),
  },
  {
    title: "Deep Space Astrophotography Gallery",
    category: "Science",
    caption:
      "Long-exposure hydrogen-alpha composite of the Orion Nebula captured from our rural field station.",
    artVariant: "astronomy",
    aspect: "portrait",
    date: new Date("2026-04-10"),
  },
  {
    title: "Lord Mountbatten Athletics Track",
    category: "Sports",
    caption:
      "Sprinters test acceleration on the eight-lane Olympic red synthetic track during morning fitness drills.",
    artVariant: "athletics",
    aspect: "landscape",
    date: new Date("2026-03-28"),
  },
  {
    title: "St. Jude’s Chapel Stained Glass Light",
    category: "Campus",
    caption:
      "Prismatic ruby and sapphire light patterns cast across medieval flagstones during morning meditation.",
    artVariant: "chapel",
    aspect: "square",
    date: new Date("2026-03-15"),
  },
];

async function seedDatabase() {
  console.log("🌱 Starting Aurelia International School Phase 5 Database Seeding...");
  console.log(`📡 Connecting to MongoDB: ${MONGODB_URI.replace(/\/\/.*@/, "//***:***@")}`);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected successfully to MongoDB.");

    // Clean existing records (idempotent)
    await Promise.all([
      User.deleteMany({}),
      Event.deleteMany({}),
      Notice.deleteMany({}),
      GalleryItem.deleteMany({}),
      Article.deleteMany({}),
      Student.deleteMany({}),
      TimetableSlot.deleteMany({}),
      Assignment.deleteMany({}),
      AttendanceRecord.deleteMany({}),
      Result.deleteMany({}),
      TeacherClass.deleteMany({}),
      Announcement.deleteMany({}),
    ]);
    console.log("Cleaned existing collections.");

    // 1. Seed Users
    const saltRounds = 10;
    const defaultPassword = "Password123!";
    const passwordHash = await bcrypt.hash(defaultPassword, saltRounds);

    const users = [
      {
        name: "Eleanor Vance",
        email: "eleanor.vance@student.aureliaschool.org",
        passwordHash,
        role: "student",
      },
      {
        name: "Dr. Alistair Sterling",
        email: "a.sterling@faculty.aureliaschool.org",
        passwordHash,
        role: "teacher",
      },
      {
        name: "Claire Montgomery",
        email: "claire.montgomery@parent.aureliaschool.org",
        passwordHash,
        role: "parent",
      },
    ];
    const insertedUsers = await User.insertMany(users);
    console.log(`Created ${insertedUsers.length} demo users`);

    const studentUser = insertedUsers[0];
    const teacherUser = insertedUsers[1];
    const parentUser = insertedUsers[2];

    // 2. Seed 8 Events
    const insertedEvents = await Event.insertMany(EVENTS_SEED);
    console.log(`Created ${insertedEvents.length} events (3 past, 5 upcoming)`);

    // 3. Seed 10 Notices
    const insertedNotices = await Notice.insertMany(NOTICES_SEED);
    console.log(`Created ${insertedNotices.length} notices`);

    // 4. Seed 8 Articles
    const insertedArticles = await Article.insertMany(ARTICLES_SEED);
    console.log(`Created ${insertedArticles.length} articles`);

    // 5. Seed 24 Gallery Items
    const insertedGallery = await GalleryItem.insertMany(GALLERY_SEED);
    console.log(`Created ${insertedGallery.length} gallery items`);

    // 6. Seed Student Profile (linking Eleanor Vance to parent Claire Montgomery)
    const insertedStudent = await Student.create({
      userId: studentUser._id,
      grade: "Year 12",
      section: "Cavendish House",
      rollNo: "AIS-2026-084",
      guardianUserId: parentUser._id,
    });
    console.log("Created demo student profile for Eleanor Vance");

    // 7. Seed Timetable Slots (Weekly Schedule)
    const TIMETABLE_SEEDS = [
      // Monday
      { grade: "Year 12", section: "Cavendish House", day: "Monday", period: 1, time: "08:30 - 09:30", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
      { grade: "Year 12", section: "Cavendish House", day: "Monday", period: 2, time: "09:35 - 10:35", subject: "Advanced Physics", teacherName: "Dr. Helena Zhang", room: "Science Lab 3" },
      { grade: "Year 12", section: "Cavendish House", day: "Monday", period: 3, time: "10:55 - 11:55", subject: "English Literature", teacherName: "Mr. Julian Croft", room: "Library Quad 12" },
      { grade: "Year 12", section: "Cavendish House", day: "Monday", period: 4, time: "12:00 - 13:00", subject: "Inorganic Chemistry", teacherName: "Dr. Marcus Vance", room: "Chemistry Lab 1" },
      { grade: "Year 12", section: "Cavendish House", day: "Monday", period: 5, time: "14:00 - 15:00", subject: "Computer Science & AI", teacherName: "Ms. Sophia Chen", room: "Turing Suite" },
      // Tuesday
      { grade: "Year 12", section: "Cavendish House", day: "Tuesday", period: 1, time: "08:30 - 09:30", subject: "Advanced Physics", teacherName: "Dr. Helena Zhang", room: "Science Lab 3" },
      { grade: "Year 12", section: "Cavendish House", day: "Tuesday", period: 2, time: "09:35 - 10:35", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
      { grade: "Year 12", section: "Cavendish House", day: "Tuesday", period: 3, time: "10:55 - 11:55", subject: "World History: 19th Century", teacherName: "Dr. Arthur Pendelton", room: "Humanities 102" },
      { grade: "Year 12", section: "Cavendish House", day: "Tuesday", period: 4, time: "12:00 - 13:00", subject: "French Language Seminar", teacherName: "Mme. Camille Laurent", room: "Language Wing 05" },
      { grade: "Year 12", section: "Cavendish House", day: "Tuesday", period: 5, time: "14:00 - 15:30", subject: "Rowing & Serpentine Athletics", teacherName: "Coach Marcus Thorne", room: "Sports Pavilion" },
      // Wednesday
      { grade: "Year 12", section: "Cavendish House", day: "Wednesday", period: 1, time: "08:30 - 09:30", subject: "English Literature", teacherName: "Mr. Julian Croft", room: "Library Quad 12" },
      { grade: "Year 12", section: "Cavendish House", day: "Wednesday", period: 2, time: "09:35 - 10:35", subject: "Computer Science & AI", teacherName: "Ms. Sophia Chen", room: "Turing Suite" },
      { grade: "Year 12", section: "Cavendish House", day: "Wednesday", period: 3, time: "10:55 - 11:55", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
      { grade: "Year 12", section: "Cavendish House", day: "Wednesday", period: 4, time: "12:00 - 13:00", subject: "House Assembly & Ethics", teacherName: "Housemaster Dr. Sterling", room: "Great Hall" },
      // Thursday
      { grade: "Year 12", section: "Cavendish House", day: "Thursday", period: 1, time: "08:30 - 09:30", subject: "Inorganic Chemistry", teacherName: "Dr. Marcus Vance", room: "Chemistry Lab 1" },
      { grade: "Year 12", section: "Cavendish House", day: "Thursday", period: 2, time: "09:35 - 10:35", subject: "Advanced Physics Lab", teacherName: "Dr. Helena Zhang", room: "Science Lab 3" },
      { grade: "Year 12", section: "Cavendish House", day: "Thursday", period: 3, time: "10:55 - 11:55", subject: "French Language Seminar", teacherName: "Mme. Camille Laurent", room: "Language Wing 05" },
      { grade: "Year 12", section: "Cavendish House", day: "Thursday", period: 4, time: "12:00 - 13:00", subject: "Independent Research (EPQ)", teacherName: "Dr. Alistair Sterling", room: "Study Centre" },
      // Friday
      { grade: "Year 12", section: "Cavendish House", day: "Friday", period: 1, time: "08:30 - 09:30", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
      { grade: "Year 12", section: "Cavendish House", day: "Friday", period: 2, time: "09:35 - 10:35", subject: "Choral Music & Orchestral", teacherName: "Maestro David O'Connor", room: "Chapel Organ Loft" },
      { grade: "Year 12", section: "Cavendish House", day: "Friday", period: 3, time: "10:55 - 11:55", subject: "World History: 19th Century", teacherName: "Dr. Arthur Pendelton", room: "Humanities 102" },
      { grade: "Year 12", section: "Cavendish House", day: "Friday", period: 4, time: "12:00 - 13:00", subject: "Robotics & Engineering", teacherName: "Ms. Sophia Chen", room: "Turing Suite" },
    ];
    await TimetableSlot.insertMany(TIMETABLE_SEEDS);
    console.log(`Created ${TIMETABLE_SEEDS.length} timetable slots`);

    // 8. Seed Coursework Assignments
    const ASSIGNMENTS_SEEDS = [
      {
        grade: "Year 12",
        section: "Cavendish House",
        subject: "Pure Mathematics",
        title: "Integration by Parts & Differential Equations Problem Set 4",
        dueDate: new Date("2026-10-04T17:00:00Z"),
        status: "Pending",
      },
      {
        grade: "Year 12",
        section: "Cavendish House",
        subject: "Advanced Physics",
        title: "Quantum Wavepackets & Photoelectric Effect Lab Report",
        dueDate: new Date("2026-10-07T16:00:00Z"),
        status: "Pending",
      },
      {
        grade: "Year 12",
        section: "Cavendish House",
        subject: "English Literature",
        title: "Comparative Essay: Milton's Paradise Lost vs Romantic Sublime",
        dueDate: new Date("2026-10-12T23:59:00Z"),
        status: "Pending",
      },
      {
        grade: "Year 12",
        section: "Cavendish House",
        subject: "Computer Science",
        title: "Implementation of Dijkstra's Algorithm in TypeScript",
        dueDate: new Date("2026-09-24T18:00:00Z"),
        status: "Graded",
        gradeResult: "98% (A*)",
      },
      {
        grade: "Year 12",
        section: "Cavendish House",
        subject: "Inorganic Chemistry",
        title: "Transition Metal Ligand Exchange Energetics Calculation",
        dueDate: new Date("2026-09-20T17:00:00Z"),
        status: "Submitted",
        gradeResult: "Pending Review",
      },
    ];
    await Assignment.insertMany(ASSIGNMENTS_SEEDS);
    console.log(`Created ${ASSIGNMENTS_SEEDS.length} academic assignments`);

    // 9. Seed Attendance Records for Eleanor Vance
    const baseDate = new Date("2026-09-29T08:00:00Z");
    const ATTENDANCE_SEEDS = [];
    for (let i = 0; i < 24; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() - i);
      const day = d.getDay();
      if (day === 0 || day === 6) continue;

      let status = "Present";
      let remarks = "On time (Cavendish Quad registration)";
      if (i === 12) {
        status = "Excused";
        remarks = "Cambridge University Masterclass visit";
      } else if (i === 19) {
        status = "Late";
        remarks = "Arrived 08:38 (Piccadilly Line delay)";
      }

      ATTENDANCE_SEEDS.push({
        studentId: insertedStudent._id,
        date: d,
        status,
        remarks,
      });
    }
    await AttendanceRecord.insertMany(ATTENDANCE_SEEDS);
    console.log(`Created ${ATTENDANCE_SEEDS.length} attendance records`);

    // 10. Seed Exam & Term Results for Eleanor Vance
    const RESULTS_SEEDS = [
      { studentId: insertedStudent._id, term: "Michaelmas Term 2026", subject: "Pure Mathematics", marks: 96, maxMarks: 100, grade: "A*", teacherRemarks: "Flawless analytical proofs and outstanding calculus application." },
      { studentId: insertedStudent._id, term: "Michaelmas Term 2026", subject: "Advanced Physics", marks: 94, maxMarks: 100, grade: "A*", teacherRemarks: "Exceptional laboratory precision and mathematical modeling." },
      { studentId: insertedStudent._id, term: "Michaelmas Term 2026", subject: "English Literature", marks: 89, maxMarks: 100, grade: "A", teacherRemarks: "Eloquent rhetorical structuring and perceptive close reading." },
      { studentId: insertedStudent._id, term: "Michaelmas Term 2026", subject: "Inorganic Chemistry", marks: 91, maxMarks: 100, grade: "A*", teacherRemarks: "Rigorous stereochemical mastery and clear spectroscopy write-ups." },
      { studentId: insertedStudent._id, term: "Michaelmas Term 2026", subject: "Computer Science", marks: 99, maxMarks: 100, grade: "A*", teacherRemarks: "Top of the cohort in algorithmic complexity and graph traversal." },
      { studentId: insertedStudent._id, term: "Michaelmas Term 2026", subject: "French Language", marks: 87, maxMarks: 100, grade: "A", teacherRemarks: "Confident oral fluency and sophisticated grammatical register." },
    ];
    await Result.insertMany(RESULTS_SEEDS);
    console.log(`Created ${RESULTS_SEEDS.length} academic results`);

    // 11. Seed Teacher Classes for Dr. Alistair Sterling
    const TEACHER_CLASSES_SEEDS = [
      { teacherId: teacherUser._id, grade: "Year 12", section: "Cavendish House", subject: "Pure Mathematics (A-Level)", studentCount: 22, room: "Cavendish 204" },
      { teacherId: teacherUser._id, grade: "Year 13", section: "Somerset House", subject: "Further Mathematics & Mechanics", studentCount: 18, room: "Cavendish 206" },
      { teacherId: teacherUser._id, grade: "Year 11", section: "Wellington House", subject: "IGCSE Accelerated Mathematics", studentCount: 26, room: "Main Quad 108" },
      { teacherId: teacherUser._id, grade: "Year 12", section: "House Advisory", subject: "Cavendish Pastoral Tutorial", studentCount: 19, room: "Cavendish Common Rm" },
    ];
    await TeacherClass.insertMany(TEACHER_CLASSES_SEEDS);
    console.log(`Created ${TEACHER_CLASSES_SEEDS.length} teacher class allocations`);

    // 12. Seed Segmented Portal Announcements
    const ANNOUNCEMENTS_SEEDS = [
      {
        audience: "all",
        title: "Michaelmas Term Mid-Session Academic Review & House Regatta",
        body: "All tutorial groups will assemble in the Great Hall this Friday afternoon for house standings updates ahead of the Thames Regatta.",
        date: new Date("2026-09-28T09:00:00Z"),
        priority: "normal",
        author: "Head of School Office",
      },
      {
        audience: "student",
        title: "Cavendish Library 24-Hour Reading Room Extension",
        body: "Sixth Form pupils may now access the North Wing study cubicles until 22:00 on weekdays using their biometric house credentials.",
        date: new Date("2026-09-27T11:30:00Z"),
        priority: "normal",
        author: "Chief Librarian Mrs. Hawthorne",
      },
      {
        audience: "teacher",
        title: "Autumn Term UCAS & Oxbridge Prediction Portals Open",
        body: "Please ensure all Year 13 teacher references and predicted grades are submitted through the faculty portal by Friday 9 October.",
        date: new Date("2026-09-26T14:00:00Z"),
        priority: "urgent",
        author: "Director of Studies Dr. Sterling",
      },
      {
        audience: "parent",
        title: "Sixth Form Parents' Academic Consultation Evening (15 October)",
        body: "Appointments for meeting subject masters and house tutors will open for booking on Monday morning via the parent portal.",
        date: new Date("2026-09-25T16:00:00Z"),
        priority: "normal",
        author: "Dean of Academics",
      },
    ];
    await Announcement.insertMany(ANNOUNCEMENTS_SEEDS);
    console.log(`Created ${ANNOUNCEMENTS_SEEDS.length} portal announcements`);

    console.log("\nDatabase seeded successfully!");
  } catch (error: any) {
    if (error.name === "MongooseServerSelectionError") {
      console.warn("\n⚠️  NOTE: Could not connect to local MongoDB server.");
      console.warn("   Make sure MongoDB is running locally or provide a valid MONGODB_URI in .env.local.");
      console.warn("   The seed script, fallback data, and models are fully configured.");
    } else {
      console.error("Seeding error:", error);
    }
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedDatabase();
