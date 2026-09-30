"use client";

import React from "react";
import { Calendar as CalendarIcon, Sparkles } from "lucide-react";
import type { UserRole } from "@/models/User";

interface PortalHeaderProps {
  name: string;
  role: UserRole;
}

export function PortalHeader({ name, role }: PortalHeaderProps) {
  // Format today's date
  const todayFormatted = "Tuesday, 29 September 2026";

  const greetingMap: Record<UserRole, { title: string; subtitle: string }> = {
    student: {
      title: `Welcome back, ${name}`,
      subtitle:
        "Michaelmas Term Week 5 • Cavendish House • Check your timetable and upcoming problem sets.",
    },
    teacher: {
      title: `Welcome, ${name}`,
      subtitle:
        "Department of Mathematics & Natural Philosophy • 3 teaching sessions scheduled today.",
    },
    parent: {
      title: `Welcome, ${name}`,
      subtitle:
        "Guardian Dashboard for Eleanor Vance (Year 12) • Review academic progress, attendance and term accounts.",
    },
  };

  const current = greetingMap[role] || greetingMap.student;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1B3A] via-[#10244C] to-[#0B1B3A] text-white p-6 sm:p-8 lg:p-10 border border-[#C9A24B]/30 shadow-xl mb-8">
      {/* Decorative Golden Ambient Accent */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-[#C9A24B]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C9A24B]/40 text-[#C9A24B] text-[11px] font-bold uppercase tracking-widest backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aurelia Academic Term</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-cream-100">
            {current.title}
          </h1>

          <p className="text-xs sm:text-sm text-cream-100/70 font-sans leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        {/* Date Pill */}
        <div className="shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-[#C9A24B] text-[#0B1B3A] flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C9A24B] block tracking-wider">
              Academic Calendar
            </span>
            <span className="text-xs sm:text-sm font-semibold text-cream-100">
              {todayFormatted}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
