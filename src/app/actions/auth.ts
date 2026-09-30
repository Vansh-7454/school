"use server";

import { signIn, signOut, auth } from "@/auth";
import { checkRateLimit, recordFailedAttempt, clearRateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AuthError } from "next-auth";
import { getDemoUser } from "@/lib/demoUsers";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  password: z.string().min(1, "Password is required"),
  callbackUrl: z.string().optional(),
});

export interface LoginActionState {
  error?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
  success?: boolean;
}

export async function loginAction(
  prevState: LoginActionState | null,
  formData: FormData
): Promise<LoginActionState> {
  const rawEmail = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;
  const rawCallbackUrl = (formData.get("callbackUrl") as string) || "";

  // 1. Zod Validation
  const validation = LoginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
    callbackUrl: rawCallbackUrl,
  });

  if (!validation.success) {
    const fieldErrors: { email?: string; password?: string } = {};
    for (const issue of validation.error.issues) {
      if (issue.path[0] === "email") fieldErrors.email = issue.message;
      if (issue.path[0] === "password") fieldErrors.password = issue.message;
    }
    return { fieldErrors, error: "Please enter your academic email and password." };
  }

  const { email, password, callbackUrl } = validation.data;

  // 2. IP & Rate Limiting Check
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
  const rateLimitKey = `${email.toLowerCase()}:${ip}`;

  const isDemo = !!getDemoUser(email, password);
  if (isDemo) {
    clearRateLimit(rateLimitKey);
  } else {
    const limitCheck = checkRateLimit(rateLimitKey);
    if (limitCheck.isLocked) {
      return {
        error: `Too many failed attempts. Account temporarily locked for security. Please try again in ${limitCheck.remainingMinutes} minute(s).`,
      };
    }
  }

  // 3. Attempt Credentials Sign-In
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    clearRateLimit(rateLimitKey);
  } catch (error) {
    if (error instanceof AuthError) {
      const failStatus = recordFailedAttempt(rateLimitKey);
      if (failStatus.isLocked) {
        return {
          error: `Too many failed attempts. Access temporarily locked for 10 minutes.`,
        };
      }
      return {
        error: "Invalid email or password. Please verify your academic credentials.",
      };
    }
    // Re-throw if Next.js internal redirect error
    throw error;
  }

  // 4. Retrieve fresh session or demo role to determine redirect destination
  const session = await auth();
  const demoRole = getDemoUser(email)?.role;
  const userRole = session?.user?.role || demoRole;

  let destination = userRole ? `/portal/${userRole}` : "/portal";

  // Validate callbackUrl: must be a safe internal path starting with "/portal"
  if (callbackUrl && callbackUrl.startsWith("/portal") && !callbackUrl.startsWith("/portal/unauthorized")) {
    destination = callbackUrl;
  }

  redirect(destination);
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
