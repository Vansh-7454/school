import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Users, Clock, ArrowRight } from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getTeacherPortalData, getAnnouncementsForRole } from "@/lib/portalData";
import { AnnouncementFeed } from "@/components/portal/AnnouncementFeed";

export const metadata: Metadata = {
  title: "Faculty Hub",
  robots: { index: false, follow: false },
};

export default async function TeacherOverviewPage() {
  const user = await requireRole("teacher");
  const data = await getTeacherPortalData(user.id);
  const announcements = await getAnnouncementsForRole("teacher");

  const totalStudents = data.classes.reduce(
    (acc: number, c: { studentCount: number }) => acc + c.studentCount,
    0
  );

  return (
    <div className="space-y-8">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Classes Today */}
        <div className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Classes Today
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">3</span>
            <span className="text-xs font-semibold text-emerald-600">Active Sessions</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Next: Cavendish 204 at 08:30</p>
        </div>

        {/* Total Students */}
        <Link
          href="/portal/teacher/classes"
          className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Total Cohort
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">
              {totalStudents}
            </span>
            <span className="text-xs font-semibold text-blue-600">Across 4 Classes</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Click to view class rolls</p>
        </Link>

        {/* Upcoming Academic Deadlines */}
        <div className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Pending Appraisals
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">2</span>
            <span className="text-xs font-semibold text-amber-600">UCAS Forecasts</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Due before Friday 9 October</p>
        </div>
      </div>

      {/* Class Allocations Section */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#0B1B3A]/10">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#C9A24B]" />
            <h2 className="font-serif font-bold text-xl text-[#0B1B3A]">
              Current Academic Allocations
            </h2>
          </div>
          <Link
            href="/portal/teacher/classes"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#C9A24B] hover:text-[#0B1B3A] transition-colors min-h-[44px] py-2"
          >
            <span>All Classes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.classes.map((cls: {
            _id: string;
            grade: string;
            section: string;
            subject: string;
            studentCount: number;
            room: string;
          }) => (
            <div
              key={cls._id}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0B1B3A]/5 hover:border-[#C9A24B]/50 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#0B1B3A]/60 mb-1">
                  <span className="font-bold text-[#C9A24B] uppercase tracking-wider">
                    {cls.grade} • {cls.section}
                  </span>
                  <span>Room {cls.room}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0B1B3A]">
                  {cls.subject}
                </h3>
              </div>

              <div className="pt-2 border-t border-[#0B1B3A]/5 flex items-center justify-between text-xs">
                <span className="font-medium text-[#0B1B3A]/70">
                  Enrolled Scholars:
                </span>
                <span className="font-mono font-bold text-[#0B1B3A]">
                  {cls.studentCount} pupils
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <AnnouncementFeed announcements={announcements} />
    </div>
  );
}
