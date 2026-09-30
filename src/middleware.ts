import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const pathname = nextUrl.pathname;

  // 1. Logged in users visiting /login -> redirect to their role home
  if (pathname === "/login") {
    if (isLoggedIn && role) {
      return NextResponse.redirect(new URL(`/portal/${role}`, nextUrl));
    }
    return NextResponse.next();
  }

  // 2. Protect /portal routes
  if (pathname.startsWith("/portal")) {
    // Unauthorized page is accessible to any logged-in user
    if (pathname === "/portal/unauthorized") {
      if (!isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    // If unauthenticated -> redirect to /login with callbackUrl
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", nextUrl);
      const callbackPath = nextUrl.pathname + nextUrl.search;
      loginUrl.searchParams.set("callbackUrl", callbackPath);
      return NextResponse.redirect(loginUrl);
    }

    // /portal root -> redirect to role portal home
    if (pathname === "/portal" || pathname === "/portal/") {
      if (role) {
        return NextResponse.redirect(new URL(`/portal/${role}`, nextUrl));
      }
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // Role-based route protection
    if (pathname.startsWith("/portal/student") && role !== "student") {
      return NextResponse.redirect(new URL("/portal/unauthorized", nextUrl));
    }
    if (pathname.startsWith("/portal/teacher") && role !== "teacher") {
      return NextResponse.redirect(new URL("/portal/unauthorized", nextUrl));
    }
    if (pathname.startsWith("/portal/parent") && role !== "parent") {
      return NextResponse.redirect(new URL("/portal/unauthorized", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
