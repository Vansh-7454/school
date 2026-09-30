import { connectToDatabase } from "@/lib/db";
import { Student } from "@/models/Student";
import { TimetableSlot } from "@/models/TimetableSlot";
import { Assignment } from "@/models/Assignment";
import { AttendanceRecord } from "@/models/AttendanceRecord";
import { Result } from "@/models/Result";
import { TeacherClass } from "@/models/TeacherClass";
import { Announcement } from "@/models/Announcement";

/* =========================================================================
   STATIC FALLBACK DATA
   ========================================================================= */

export const STATIC_STUDENT_PROFILE = {
  _id: "student-demo-id",
  grade: "Year 12",
  section: "Cavendish House",
  rollNo: "AIS-2026-084",
  house: "Cavendish House",
  advisor: "Dr. Alistair Sterling",
};

export const STATIC_TIMETABLE = [
  // Monday
  { day: "Monday", period: 1, time: "08:30 - 09:30", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
  { day: "Monday", period: 2, time: "09:35 - 10:35", subject: "Advanced Physics", teacherName: "Dr. Helena Zhang", room: "Science Lab 3" },
  { day: "Monday", period: 3, time: "10:55 - 11:55", subject: "English Literature", teacherName: "Mr. Julian Croft", room: "Library Quad 12" },
  { day: "Monday", period: 4, time: "12:00 - 13:00", subject: "Inorganic Chemistry", teacherName: "Dr. Marcus Vance", room: "Chemistry Lab 1" },
  { day: "Monday", period: 5, time: "14:00 - 15:00", subject: "Computer Science & AI", teacherName: "Ms. Sophia Chen", room: "Turing Suite" },
  // Tuesday
  { day: "Tuesday", period: 1, time: "08:30 - 09:30", subject: "Advanced Physics", teacherName: "Dr. Helena Zhang", room: "Science Lab 3" },
  { day: "Tuesday", period: 2, time: "09:35 - 10:35", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
  { day: "Tuesday", period: 3, time: "10:55 - 11:55", subject: "World History: 19th Century", teacherName: "Dr. Arthur Pendelton", room: "Humanities 102" },
  { day: "Tuesday", period: 4, time: "12:00 - 13:00", subject: "French Language Seminar", teacherName: "Mme. Camille Laurent", room: "Language Wing 05" },
  { day: "Tuesday", period: 5, time: "14:00 - 15:30", subject: "Rowing & Serpentine Athletics", teacherName: "Coach Marcus Thorne", room: "Sports Pavilion" },
  // Wednesday
  { day: "Wednesday", period: 1, time: "08:30 - 09:30", subject: "English Literature", teacherName: "Mr. Julian Croft", room: "Library Quad 12" },
  { day: "Wednesday", period: 2, time: "09:35 - 10:35", subject: "Computer Science & AI", teacherName: "Ms. Sophia Chen", room: "Turing Suite" },
  { day: "Wednesday", period: 3, time: "10:55 - 11:55", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
  { day: "Wednesday", period: 4, time: "12:00 - 13:00", subject: "House Assembly & Ethics", teacherName: "Housemaster Dr. Sterling", room: "Great Hall" },
  // Thursday
  { day: "Thursday", period: 1, time: "08:30 - 09:30", subject: "Inorganic Chemistry", teacherName: "Dr. Marcus Vance", room: "Chemistry Lab 1" },
  { day: "Thursday", period: 2, time: "09:35 - 10:35", subject: "Advanced Physics Lab", teacherName: "Dr. Helena Zhang", room: "Science Lab 3" },
  { day: "Thursday", period: 3, time: "10:55 - 11:55", subject: "French Language Seminar", teacherName: "Mme. Camille Laurent", room: "Language Wing 05" },
  { day: "Thursday", period: 4, time: "12:00 - 13:00", subject: "Independent Research (EPQ)", teacherName: "Dr. Alistair Sterling", room: "Study Centre" },
  // Friday
  { day: "Friday", period: 1, time: "08:30 - 09:30", subject: "Pure Mathematics (A-Level)", teacherName: "Dr. Alistair Sterling", room: "Cavendish 204" },
  { day: "Friday", period: 2, time: "09:35 - 10:35", subject: "Choral Music & Orchestral", teacherName: "Maestro David O'Connor", room: "Chapel Organ Loft" },
  { day: "Friday", period: 3, time: "10:55 - 11:55", subject: "World History: 19th Century", teacherName: "Dr. Arthur Pendelton", room: "Humanities 102" },
  { day: "Friday", period: 4, time: "12:00 - 13:00", subject: "Robotics & Engineering", teacherName: "Ms. Sophia Chen", room: "Turing Suite" },
  { day: "Friday", period: 5, time: "14:00 - 15:15", subject: "Debating Union Colloquium", teacherName: "Mr. Julian Croft", room: "Council Chambers" },
];

export const STATIC_ASSIGNMENTS = [
  {
    _id: "asg-1",
    subject: "Pure Mathematics",
    title: "Integration by Parts & Differential Equations Problem Set 4",
    dueDate: new Date("2026-10-04T17:00:00Z"),
    status: "Pending",
    gradeResult: undefined,
  },
  {
    _id: "asg-2",
    subject: "Advanced Physics",
    title: "Quantum Wavepackets & Photoelectric Effect Lab Report",
    dueDate: new Date("2026-10-07T16:00:00Z"),
    status: "Pending",
    gradeResult: undefined,
  },
  {
    _id: "asg-3",
    subject: "English Literature",
    title: "Comparative Essay: Milton's Paradise Lost vs Romantic Sublime",
    dueDate: new Date("2026-10-12T23:59:00Z"),
    status: "Pending",
    gradeResult: undefined,
  },
  {
    _id: "asg-4",
    subject: "Computer Science",
    title: "Implementation of Dijkstra's Algorithm in TypeScript",
    dueDate: new Date("2026-09-24T18:00:00Z"),
    status: "Graded",
    gradeResult: "98% (A*)",
  },
  {
    _id: "asg-5",
    subject: "Inorganic Chemistry",
    title: "Transition Metal Ligand Exchange Energetics Calculation",
    dueDate: new Date("2026-09-20T17:00:00Z"),
    status: "Submitted",
    gradeResult: "Pending Review",
  },
];

export const STATIC_RESULTS = [
  { _id: "res-1", subject: "Pure Mathematics", term: "Michaelmas Term 2026", marks: 96, maxMarks: 100, grade: "A*", teacherRemarks: "Flawless analytical proofs and outstanding calculus application." },
  { _id: "res-2", subject: "Advanced Physics", term: "Michaelmas Term 2026", marks: 94, maxMarks: 100, grade: "A*", teacherRemarks: "Exceptional laboratory precision and mathematical modeling." },
  { _id: "res-3", subject: "English Literature", term: "Michaelmas Term 2026", marks: 89, maxMarks: 100, grade: "A", teacherRemarks: "Eloquent rhetorical structuring and perceptive close reading." },
  { _id: "res-4", subject: "Inorganic Chemistry", term: "Michaelmas Term 2026", marks: 91, maxMarks: 100, grade: "A*", teacherRemarks: "Rigorous stereochemical mastery and clear spectroscopy write-ups." },
  { _id: "res-5", subject: "Computer Science", term: "Michaelmas Term 2026", marks: 99, maxMarks: 100, grade: "A*", teacherRemarks: "Top of the cohort in algorithmic complexity and graph traversal." },
  { _id: "res-6", subject: "French Language", term: "Michaelmas Term 2026", marks: 87, maxMarks: 100, grade: "A", teacherRemarks: "Confident oral fluency and sophisticated grammatical register." },
];

export const STATIC_TEACHER_CLASSES = [
  { _id: "tc-1", grade: "Year 12", section: "Cavendish House", subject: "Pure Mathematics (A-Level)", studentCount: 22, room: "Cavendish 204" },
  { _id: "tc-2", grade: "Year 13", section: "Somerset House", subject: "Further Mathematics & Mechanics", studentCount: 18, room: "Cavendish 206" },
  { _id: "tc-3", grade: "Year 11", section: "Wellington House", subject: "IGCSE Accelerated Mathematics", studentCount: 26, room: "Main Quad 108" },
  { _id: "tc-4", grade: "Year 12", section: "House Advisory", subject: "Cavendish Pastoral Tutorial", studentCount: 19, room: "Cavendish Common Rm" },
];

export const STATIC_ANNOUNCEMENTS = [
  {
    _id: "anc-1",
    audience: "all",
    title: "Michaelmas Term Mid-Session Academic Review & House Regatta",
    body: "All tutorial groups will assemble in the Great Hall this Friday afternoon for house standings updates ahead of the Thames Regatta.",
    date: new Date("2026-09-28T09:00:00Z"),
    priority: "normal",
    author: "Head of School Office",
  },
  {
    _id: "anc-2",
    audience: "student",
    title: "Cavendish Library 24-Hour Reading Room Extension",
    body: "Sixth Form pupils may now access the North Wing study cubicles until 22:00 on weekdays using their biometric house credentials.",
    date: new Date("2026-09-27T11:30:00Z"),
    priority: "normal",
    author: "Chief Librarian Mrs. Hawthorne",
  },
  {
    _id: "anc-3",
    audience: "teacher",
    title: "Autumn Term UCAS & Oxbridge Prediction Portals Open",
    body: "Please ensure all Year 13 teacher references and predicted grades are submitted through the faculty portal by Friday 9 October.",
    date: new Date("2026-09-26T14:00:00Z"),
    priority: "urgent",
    author: "Director of Studies Dr. Sterling",
  },
  {
    _id: "anc-4",
    audience: "parent",
    title: "Sixth Form Parents' Academic Consultation Evening (15 October)",
    body: "Appointments for meeting subject masters and house tutors will open for booking on Monday morning via the parent portal.",
    date: new Date("2026-09-25T16:00:00Z"),
    priority: "normal",
    author: "Dean of Academics",
  },
];

/* =========================================================================
   QUERIES WITH DATABASE + STATIC FALLBACK
   ========================================================================= */

/**
 * Get Student Portal Data
 */
export async function getStudentPortalData(userId?: string) {
  try {
    await connectToDatabase();
    let student = null;
    if (userId) {
      student = await Student.findOne({ userId }).lean();
    }
    if (!student) {
      student = await Student.findOne().lean();
    }

    const timetable = await TimetableSlot.find({ grade: "Year 12" }).sort({ day: 1, period: 1 }).lean();
    const assignments = await Assignment.find({ grade: "Year 12" }).sort({ dueDate: 1 }).lean();
    const results = await Result.find().sort({ marks: -1 }).lean();
    const attendance = await AttendanceRecord.find().sort({ date: -1 }).limit(30).lean();

    if (timetable.length > 0) {
      return {
        profile: student ? JSON.parse(JSON.stringify(student)) : STATIC_STUDENT_PROFILE,
        timetable: JSON.parse(JSON.stringify(timetable)),
        assignments: JSON.parse(JSON.stringify(assignments)),
        results: JSON.parse(JSON.stringify(results)),
        attendance: JSON.parse(JSON.stringify(attendance)),
      };
    }
  } catch {
    console.warn("MongoDB unavailable for Student Portal, using static fallback.");
  }

  return {
    profile: STATIC_STUDENT_PROFILE,
    timetable: STATIC_TIMETABLE,
    assignments: STATIC_ASSIGNMENTS,
    results: STATIC_RESULTS,
    attendance: generateStaticAttendance(),
  };
}

/**
 * Get Teacher Portal Data
 */
export async function getTeacherPortalData(userId?: string) {
  try {
    await connectToDatabase();
    const query = userId ? { teacherId: userId } : {};
    let classes = await TeacherClass.find(query).lean();
    if (classes.length === 0) {
      classes = await TeacherClass.find().lean();
    }
    const schedule = await TimetableSlot.find({ teacherName: { $regex: "Sterling", $options: "i" } })
      .sort({ day: 1, period: 1 })
      .lean();

    if (classes.length > 0) {
      return {
        classes: JSON.parse(JSON.stringify(classes)),
        schedule: JSON.parse(JSON.stringify(schedule.length > 0 ? schedule : STATIC_TIMETABLE.slice(0, 8))),
      };
    }
  } catch {
    console.warn("MongoDB unavailable for Teacher Portal, using static fallback.");
  }

  return {
    classes: STATIC_TEACHER_CLASSES,
    schedule: STATIC_TIMETABLE.filter((s) => s.teacherName.includes("Sterling")),
  };
}

/**
 * Get Parent Portal Data
 */
export async function getParentPortalData(guardianUserId?: string) {
  try {
    await connectToDatabase();
    let student = null;
    if (guardianUserId) {
      student = await Student.findOne({ guardianUserId }).lean();
    }
    if (!student) {
      student = await Student.findOne().lean();
    }

    const results = await Result.find().sort({ marks: -1 }).lean();
    const attendance = await AttendanceRecord.find().sort({ date: -1 }).limit(30).lean();

    if (results.length > 0) {
      return {
        child: student ? JSON.parse(JSON.stringify(student)) : STATIC_STUDENT_PROFILE,
        results: JSON.parse(JSON.stringify(results)),
        attendance: JSON.parse(JSON.stringify(attendance)),
      };
    }
  } catch {
    console.warn("MongoDB unavailable for Parent Portal, using static fallback.");
  }

  return {
    child: STATIC_STUDENT_PROFILE,
    results: STATIC_RESULTS,
    attendance: generateStaticAttendance(),
  };
}

/**
 * Get Announcements for a given role (audience: "all" + role)
 */
export async function getAnnouncementsForRole(role: "student" | "teacher" | "parent") {
  try {
    await connectToDatabase();
    const announcements = await Announcement.find({
      audience: { $in: ["all", role] },
    })
      .sort({ date: -1 })
      .lean();

    if (announcements.length > 0) {
      return JSON.parse(JSON.stringify(announcements));
    }
  } catch {
    console.warn("MongoDB unavailable for Announcements, using static fallback.");
  }

  return STATIC_ANNOUNCEMENTS.filter(
    (a) => a.audience === "all" || a.audience === role
  );
}

/**
 * Generate 30 days of realistic attendance history (98% presence rate)
 */
function generateStaticAttendance() {
  const records = [];
  const baseDate = new Date("2026-09-29T08:00:00Z");

  for (let i = 0; i < 24; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - i);

    // Skip weekends
    const day = d.getDay();
    if (day === 0 || day === 6) continue;

    let status: "Present" | "Late" | "Excused" | "Absent" = "Present";
    let remarks = "On time (Cavendish Quad registration)";

    if (i === 12) {
      status = "Excused";
      remarks = "Cambridge University Masterclass visit";
    } else if (i === 19) {
      status = "Late";
      remarks = "Arrived 08:38 (Piccadilly Line delay)";
    }

    records.push({
      _id: `att-${i}`,
      date: d.toISOString(),
      status,
      remarks,
    });
  }

  return records;
}
