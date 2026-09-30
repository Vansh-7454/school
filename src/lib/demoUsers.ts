export type UserRole = "student" | "teacher" | "parent";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const DEMO_PASSWORD = "Password123!";

export const DEMO_USERS: Record<string, DemoUser> = {
  "eleanor.vance@student.aureliaschool.org": {
    id: "student-demo-id",
    name: "Eleanor Vance",
    email: "eleanor.vance@student.aureliaschool.org",
    role: "student",
  },
  "a.sterling@faculty.aureliaschool.org": {
    id: "teacher-demo-id",
    name: "Dr. Alistair Sterling",
    email: "a.sterling@faculty.aureliaschool.org",
    role: "teacher",
  },
  "claire.montgomery@parent.aureliaschool.org": {
    id: "parent-demo-id",
    name: "Claire Montgomery",
    email: "claire.montgomery@parent.aureliaschool.org",
    role: "parent",
  },
};

/**
 * Returns demo user if credentials match the predefined canonical demo accounts.
 */
export function getDemoUser(email: string, password?: string): DemoUser | null {
  const normalizedEmail = email.toLowerCase().trim();
  const demoUser = DEMO_USERS[normalizedEmail];
  if (!demoUser) return null;
  if (password !== undefined && password !== DEMO_PASSWORD) return null;
  return demoUser;
}
