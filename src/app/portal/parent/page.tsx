import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  Award,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getParentPortalData, getAnnouncementsForRole } from "@/lib/portalData";
import { AnnouncementFeed } from "@/components/portal/AnnouncementFeed";

export const metadata: Metadata = {
  title: "Parent Gateway",
  robots: { index: false, follow: false },
};

export default async function ParentOverviewPage() {
  const user = await requireRole("parent");
  const data = await getParentPortalData(user.id);
  const announcements = await getAnnouncementsForRole("parent");

  const totalAtt = data.attendance.length;
  const presentCount = data.attendance.filter(
    (a: { status: string }) => a.status === "Present" || a.status === "Excused"
  ).length;
  const attendanceRate = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 98;

  return (
    <div className="space-y-8">
      {/* Child Profile Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#0B1B3A]/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center font-serif text-xl font-bold border border-[#C9A24B]/30 shadow-xs">
            EV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                Registered Dependent
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                Active Enrolment
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#0B1B3A]">
              Eleanor Vance
            </h2>
            <p className="text-xs text-[#0B1B3A]/60 font-sans">
              Year 12 Sixth Form • Cavendish House • Roll AIS-2026-084
            </p>
          </div>
        </div>

        <Link
          href="/portal/parent/child"
          className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#0B1B3A] text-white hover:bg-[#C9A24B] hover:text-[#0B1B3A] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <span>Full Academic Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Attendance */}
        <Link
          href="/portal/parent/child"
          className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Child Attendance
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">
              {attendanceRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">Exceptional</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Click to view monthly calendar</p>
        </Link>

        {/* Recent Results */}
        <Link
          href="/portal/parent/child"
          className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Latest Assessment
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">A*</span>
            <span className="text-xs font-semibold text-emerald-600">96% in Pure Maths</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Michaelmas Term 2026</p>
        </Link>

        {/* Fees Status */}
        <Link
          href="/portal/parent/fees-and-notices"
          className="bg-white rounded-3xl p-6 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all group block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
              Term Account
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#0B1B3A]">Settled</span>
            <span className="text-xs font-semibold text-emerald-600">No Dues</span>
          </div>
          <p className="text-xs text-[#0B1B3A]/50 mt-1">Click to view fee statements</p>
        </Link>
      </div>

      {/* Announcements */}
      <AnnouncementFeed announcements={announcements} />
    </div>
  );
}
