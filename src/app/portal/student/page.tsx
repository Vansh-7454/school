import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  FileCheck2,
  Clock,
  Award,
  ArrowRight,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getStudentPortalData, getAnnouncementsForRole } from "@/lib/portalData";
import { AnnouncementFeed } from "@/components/portal/AnnouncementFeed";

export const metadata: Metadata = {
  title: "Student Hub",
  robots: { index: false, follow: false },
};

export default async function StudentOverviewPage() {
  const user = await requireRole("student");
  const data = await getStudentPortalData(user.id);
  const announcements = await getAnnouncementsForRole("student");

  // Calculate metrics
  const totalAtt = data.attendance.length;
  const presentCount = data.attendance.filter(
    (a: { status: string }) => a.status === "Present" || a.status === "Excused"
  ).length;
  const attendanceRate = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 98;

  const pendingAssignments = data.assignments.filter(
    (a: { status: string }) => a.status === "Pending"
  ).length;

  const nextClass = data.timetable[0] || {
    subject: "Pure Mathematics (A-Level)",
    time: "08:30 - 09:30",
    room: "Cavendish 204",
  };

  const latestResult = data.results[0] || {
    subject: "Pure Mathematics",
    grade: "A*",
    marks: 96,
  };

  return (
    <div className="space-y-8">
      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Attendance Rate */}
        <div className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Term Attendance
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">
              {attendanceRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">On Track</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Michaelmas Session 2026</p>
        </div>

        {/* Pending Tasks */}
        <Link
          href="/portal/student/assignments"
          className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Pending Tasks
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">
              {pendingAssignments}
            </span>
            <span className="text-xs font-semibold text-amber-600">Due This Week</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Click to view coursework</p>
        </Link>

        {/* Next Session */}
        <Link
          href="/portal/student/timetable"
          className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Upcoming Class
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="truncate">
            <span className="font-serif font-bold text-lg text-[#0B1B3A] block truncate">
              {nextClass.subject}
            </span>
            <span className="text-xs text-[#C9A24B] font-semibold block mt-0.5">
              {nextClass.time} • {nextClass.room}
            </span>
          </div>
        </Link>

        {/* Top Result */}
        <Link
          href="/portal/student/results"
          className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Latest Mark
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">
              {latestResult.grade}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {latestResult.marks}/100
            </span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1 truncate">
            {latestResult.subject}
          </p>
        </Link>
      </div>

      {/* Two-Column Midsection: Quick Timetable & Academic Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#C9A24B]" />
              <h2 className="font-serif font-bold text-xl text-[#0B1B3A]">
                Today&apos;s Lecture Schedule
              </h2>
            </div>
            <Link
              href="/portal/student/timetable"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#C9A24B] hover:text-[#0B1B3A] transition-colors"
            >
              <span>Full Week</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {data.timetable.slice(0, 5).map((slot: { period: number; time: string; subject: string; teacherName: string; room: string }, i: number) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#0B1B3A]/5 hover:border-[#C9A24B]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B1B3A] text-[#C9A24B] font-bold text-xs flex items-center justify-center shrink-0">
                    P{slot.period}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#0B1B3A]">
                      {slot.subject}
                    </h3>
                    <p className="text-xs text-[#0B1B3A]/50 font-sans">
                      {slot.teacherName} • Room {slot.room}
                    </p>
                  </div>
                </div>
                <div className="sm:text-right text-xs font-mono font-semibold text-[#0B1B3A]/70 pl-12 sm:pl-0">
                  {slot.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Student Cohort Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-[#C9A24B]" />
            <h2 className="font-serif font-bold text-xl text-[#0B1B3A]">
              Pupil Dossier
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1B3A]/50 block">
                Academic Standing
              </span>
              <p className="font-bold text-[#0B1B3A]">
                {data.profile.grade} • Sixth Form Senior
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1B3A]/50 block">
                Residential House
              </span>
              <p className="font-bold text-[#0B1B3A]">
                {data.profile.section}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1B3A]/50 block">
                Roll Citation
              </span>
              <p className="font-mono font-bold text-[#0B1B3A]">
                {data.profile.rollNo}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1B3A]/50 block">
                Personal Tutor
              </span>
              <p className="font-bold text-[#0B1B3A]">
                Dr. Alistair Sterling
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Stream */}
      <AnnouncementFeed announcements={announcements} />
    </div>
  );
}
