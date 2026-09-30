import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { auth } from "@/auth";

export default async function UnauthorizedPage() {
  const session = await auth();
  const userRole = session?.user?.role || "student";
  const userHome = `/portal/${userRole}`;

  return (
    <div className="min-h-[50vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-amber-300 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Access Restricted
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B3A]">
            Unauthorized Portal Zone
          </h1>
          <p className="text-xs sm:text-sm text-[#0B1B3A]/70 font-sans leading-relaxed">
            Your verified credential is registered under the{" "}
            <span className="font-bold text-[#0B1B3A] capitalize">{userRole}</span> role.
            You do not possess the security clearance required to inspect this sector.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href={userHome}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B1B3A] text-white hover:bg-[#C9A24B] hover:text-[#0B1B3A] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to My {userRole} Portal</span>
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FAF8F5] text-[#0B1B3A] hover:bg-[#0B1B3A]/5 font-semibold text-xs transition-colors"
          >
            <Home className="w-4 h-4 text-[#C9A24B]" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
