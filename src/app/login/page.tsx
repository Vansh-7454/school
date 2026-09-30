import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LoginIllustration } from "@/components/sections/auth/LoginIllustration";
import { LoginForm } from "@/components/sections/auth/LoginForm";

export const metadata: Metadata = {
  title: "Portal Sign In",
  description:
    "Secure academic gateway for students, faculty, and guardians of Aurelia International School.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FBF6EA] flex flex-col justify-center py-10 px-5 sm:px-8 lg:px-12">
      {/* Top Floating Back Link */}
      <div className="max-w-6xl mx-auto w-full mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/70 hover:text-[#C9A24B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      {/* Main Split Authentication Card */}
      <div className="max-w-6xl mx-auto w-full bg-white rounded-3xl sm:rounded-[2rem] border border-[#0B1B3A]/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Animated Navy Illustration (Collapsed to banner on mobile) */}
        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
          <LoginIllustration />
        </div>

        {/* Right Side: Clean Cream Sign In Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-[#FAF8F5]/50">
          <div className="w-full max-w-md mx-auto space-y-8">
            {/* Header: Logo and Title */}
            <div className="space-y-3">
              <div className="inline-block mb-1">
                <Logo size="md" variant="dark" href="/" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.25em] text-[#C9A24B] uppercase block">
                  Identity Verification
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3A] tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs sm:text-sm text-[#0B1B3A]/70 font-sans mt-1">
                  Enter your credentials to access your individualized school hub.
                </p>
              </div>
            </div>

            {/* Login Form with Suspense Boundary for useSearchParams */}
            <Suspense
              fallback={
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-[#0B1B3A]/50">
                  <Loader2 className="w-6 h-6 animate-spin text-[#C9A24B]" />
                  <span className="text-xs">Preparing secure gateway...</span>
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
