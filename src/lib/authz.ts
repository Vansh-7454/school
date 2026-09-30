import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { UserRole } from "@/models/User";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}

/**
 * Server-side authorization check (Defense in Depth)
 * Ensures the authenticated user has the required role.
 * Redirects to /login if unauthenticated, or /portal/unauthorized if forbidden.
 */
export async function requireRole(allowedRoles: UserRole | UserRole[]) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = session.user.role;
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!rolesArray.includes(userRole)) {
    redirect("/portal/unauthorized");
  }

  return session.user;
}
