import React from "react";
import type { Metadata } from "next";
import {
  CalendarCheck,
  Award,
} from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getParentPortalData } from "@/lib/portalData";

export const metadata: Metadata = {
  title: "Child Progress & Attendance | Parent Gateway",
};

export default async function ParentChildPage() {
  const user = await requireRole("parent");
  const data = await getParentPortalData(user.id);

  // September 2026 days (1 to 30)
  // 2026-09-01 was a Tuesday
  const daysInMonth = 30;
  const startDayOfWeek = 2; // 0=Sun, 1=Mon, 2=Tue

  // Map attendance records by day of month
  const attMap: Record<number, { status: string; remarks?: string }> = {};
  for (const rec of data.attendance) {
    const d = new Date(rec.date);
    if (d.getMonth() === 8) {
      // September (0-indexed 8)
      attMap[d.getDate()] = { status: rec.status, remarks: rec.remarks };
    }
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block">
          Academic Oversight
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3A]">
          Eleanor Vance: Attendance & Academic Transcripts
        </h2>
        <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans mt-0.5">
          Year 12 Sixth Form • Cavendish House • Michaelmas Term 2026
        </p>
      </div>

      {/* Attendance Calendar View for September 2026 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0B1B3A]/10">
          <div className="flex items-center gap-2.5">
            <CalendarCheck className="w-5 h-5 text-[#C9A24B]" />
            <div>
              <h3 className="font-serif font-bold text-xl text-[#0B1B3A]">
                Attendance Calendar: September 2026
              </h3>
              <p className="text-xs text-[#0B1B3A]/50">
                Official registration taken daily at morning assembly (08:30)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Present</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Excused</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Late</span>
            </span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="py-2 text-[11px] font-bold uppercase tracking-wider text-[#0B1B3A]/50 font-mono"
            >
              {day}
            </div>
          ))}

          {/* Empty cells before start of month */}
          {Array.from({ length: (startDayOfWeek + 6) % 7 }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2 sm:p-3 rounded-2xl bg-transparent" />
          ))}

          {/* Days 1 to 30 */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dayOfWeek = (startDayOfWeek + idx) % 7;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const record = attMap[dayNum];

            let cellBg = "bg-[#FAF8F5] border-[#0B1B3A]/5";
            let statusDot = null;

            if (isWeekend) {
              cellBg = "bg-gray-50/50 border-transparent text-[#0B1B3A]/30";
            } else if (record?.status === "Present") {
              cellBg = "bg-emerald-50/80 border-emerald-200 text-emerald-900";
              statusDot = <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mx-auto mt-1" />;
            } else if (record?.status === "Excused") {
              cellBg = "bg-blue-50/80 border-blue-200 text-blue-900";
              statusDot = <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mx-auto mt-1" />;
            } else if (record?.status === "Late") {
              cellBg = "bg-amber-50/80 border-amber-200 text-amber-900";
              statusDot = <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mx-auto mt-1" />;
            }

            return (
              <div
                key={dayNum}
                className={`p-2 sm:p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex flex-col items-center justify-between min-h-[50px] sm:min-h-[64px] ${cellBg}`}
              >
                <span className="font-mono text-xs">{dayNum}</span>
                {statusDot}
                {!isWeekend && record?.status && (
                  <span className="text-[9px] uppercase font-bold tracking-tight opacity-75 hidden sm:block">
                    {record.status}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Marks & Formative Transcripts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#0B1B3A]/10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C9A24B]" />
            <h3 className="font-serif font-bold text-xl text-[#0B1B3A]">
              Academic Subject Marks
            </h3>
          </div>
          <span className="text-xs text-[#0B1B3A]/50">
            Michaelmas Term 2026 Examination
          </span>
        </div>

        <div className="divide-y divide-[#0B1B3A]/5">
          {data.results.map((res: {
            _id: string;
            subject: string;
            marks: number;
            maxMarks: number;
            grade: string;
            teacherRemarks?: string;
          }) => (
            <div
              key={res._id}
              className="py-4 first:pt-2 last:pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-xl">
                <h4 className="font-serif font-bold text-base text-[#0B1B3A]">
                  {res.subject}
                </h4>
                {res.teacherRemarks && (
                  <p className="text-xs text-[#0B1B3A]/70 italic font-sans leading-relaxed">
                    &ldquo;{res.teacherRemarks}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 shrink-0 self-end md:self-auto">
                <div className="text-right">
                  <span className="text-xs text-[#0B1B3A]/50 block">Assessment</span>
                  <span className="text-sm font-bold text-[#0B1B3A] font-mono">
                    {res.marks} / {res.maxMarks}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] font-bold text-sm flex items-center justify-center font-mono shadow-xs">
                  {res.grade}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
