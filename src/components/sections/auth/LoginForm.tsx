"use client";

import React, { useState, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Sparkles,
  GraduationCap,
  BookOpen,
  Users,
  Loader2,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { loginAction, type LoginActionState } from "@/app/actions/auth";

const DEMO_ACCOUNTS = [
  {
    role: "Student",
    name: "Eleanor Vance (Year 12)",
    email: "eleanor.vance@student.aureliaschool.org",
    password: "Password123!",
    icon: GraduationCap,
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    role: "Teacher",
    name: "Dr. Alistair Sterling (Head of Maths)",
    email: "a.sterling@faculty.aureliaschool.org",
    password: "Password123!",
    icon: BookOpen,
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    role: "Parent",
    name: "Claire Montgomery (Guardian)",
    email: "claire.montgomery@parent.aureliaschool.org",
    password: "Password123!",
    icon: Users,
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
];

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(
    loginAction,
    {}
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [demoOpen, setDemoOpen] = useState(true);

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Sign In Form */}
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        {/* Global Error Banner */}
        {state?.error && (
          <div
            role="alert"
            aria-live="polite"
            className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3 shadow-sm animate-in fade-in duration-200"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{state.error}</p>
              {state.fieldErrors?.email && (
                <p className="text-red-700 text-xs mt-1">{state.fieldErrors.email}</p>
              )}
              {state.fieldErrors?.password && (
                <p className="text-red-700 text-xs mt-1">{state.fieldErrors.password}</p>
              )}
            </div>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/80"
          >
            Academic Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0B1B3A]/40">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@student.aureliaschool.org"
              className="w-full h-12 pl-10 pr-4 rounded-[14px] border border-[#0B1B3A]/15 bg-white text-[#0B1B3A] text-base sm:text-sm placeholder:text-[#0B1B3A]/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/80"
            >
              Password
            </label>
            <span className="text-[11px] text-[#0B1B3A]/50">
              Case-sensitive
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0B1B3A]/40">
              <Lock className="w-4 h-4 stroke-[1.75]" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-12 pl-10 pr-12 rounded-[14px] border border-[#0B1B3A]/15 bg-white text-[#0B1B3A] text-base sm:text-sm placeholder:text-[#0B1B3A]/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:border-transparent transition-all shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 w-12 flex items-center justify-center text-[#0B1B3A]/40 hover:text-[#0B1B3A] transition-colors focus:outline-none cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 stroke-[1.75]" />
              ) : (
                <Eye className="w-4 h-4 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[48px] h-12 px-6 rounded-full bg-[#0B1B3A] hover:bg-[#162A56] text-[#FBF6EA] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <KeyRound className="w-4 h-4 stroke-[1.75]" />
              <span>Sign In to School Portal</span>
            </>
          )}
        </button>

        {/* Role hint */}
        <p className="text-[11px] text-center text-[#0B1B3A]/60 font-sans leading-relaxed">
          Students, Faculty, and Parents access dedicated portals automatically upon identity verification.
        </p>
      </form>

      {/* Collapsible Demo Accounts Box */}
      <div className="rounded-2xl border border-[#C9A24B]/30 bg-[#FBF6EA]/60 p-4 sm:p-5 transition-all">
        <button
          type="button"
          onClick={() => setDemoOpen(!demoOpen)}
          className="w-full min-h-[44px] flex items-center justify-between text-left group cursor-pointer focus:outline-none py-1"
          aria-expanded={demoOpen}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]">
              Demo Accounts (One-Click Fill)
            </span>
          </div>
          <div className="text-[#0B1B3A]/50 group-hover:text-[#0B1B3A] transition-colors">
            {demoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {demoOpen && (
          <div className="mt-3.5 space-y-2.5 pt-3 border-t border-[#C9A24B]/20 animate-in fade-in duration-200">
            <p className="text-[11px] text-[#0B1B3A]/70 mb-2">
              Tap any role card to autofill seeded credentials:
            </p>
            {DEMO_ACCOUNTS.map((acc) => {
              const Icon = acc.icon;
              return (
                <div
                  key={acc.role}
                  onClick={() => handleFillDemo(acc.email, acc.password)}
                  className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#0B1B3A]/10 hover:border-[#C9A24B] active:bg-[#C9A24B]/10 transition-all cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleFillDemo(acc.email, acc.password);
                    }
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs text-[#0B1B3A] truncate">
                          {acc.name}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${acc.badgeColor}`}
                        >
                          {acc.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#0B1B3A]/50 font-mono truncate">
                        {acc.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFillDemo(acc.email, acc.password);
                    }}
                    className="shrink-0 min-h-[44px] px-3.5 rounded-lg bg-[#0B1B3A]/5 hover:bg-[#C9A24B] hover:text-[#0B1B3A] text-[#0B1B3A] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#0B1B3A]/10 flex items-center justify-center"
                  >
                    Fill
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
