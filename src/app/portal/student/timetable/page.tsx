import React from "react";
import type { Metadata } from "next";
import { Clock, MapPin, User, Calendar as CalendarIcon } from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getStudentPortalData } from "@/lib/portalData";

export const metadata: Metadata = {
  title: "Weekly Timetable | Student Portal",
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export default async function StudentTimetablePage() {
  const user = await requireRole("student");
  const data = await getStudentPortalData(user.id);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block">
            Academic Schedule
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3A]">
            Michaelmas Term Weekly Timetable
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans mt-0.5">
            Year 12 • Cavendish House • Core and Elective Periods
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0B1B3A]/10 text-xs text-[#0B1B3A] shadow-xs self-start">
          <CalendarIcon className="w-4 h-4 text-[#C9A24B]" />
          <span>5-Day Cycle</span>
        </div>
      </div>

      {/* Grid of Days */}
      <div className="space-y-6">
        {DAYS.map((day) => {
          const daySlots = data.timetable.filter(
            (s: { day: string }) => s.day === day
          );

          return (
            <div
              key={day}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#0B1B3A]/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#C9A24B]" />
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0B1B3A]">
                    {day}
                  </h3>
                </div>
                <span className="text-xs text-[#0B1B3A]/50">
                  {daySlots.length} Lectures & Colloquia
                </span>
              </div>

              {daySlots.length === 0 ? (
                <p className="text-xs text-[#0B1B3A]/50 italic">
                  Independent study & private tutorial revision periods.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {daySlots.map((slot: { period: number; time: string; subject: string; teacherName: string; room: string }, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#0B1B3A]/5 hover:border-[#C9A24B]/50 transition-all flex flex-col justify-between space-y-3 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0B1B3A] text-[#C9A24B] font-mono text-[11px] font-bold">
                          Period {slot.period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B1B3A]/60">
                          <Clock className="w-3 h-3 text-[#C9A24B]" />
                          <span>{slot.time}</span>
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-base text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors">
                          {slot.subject}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-[#0B1B3A]/5 flex items-center justify-between text-xs text-[#0B1B3A]/60">
                        <span className="inline-flex items-center gap-1 truncate">
                          <User className="w-3 h-3 text-[#C9A24B]" />
                          <span className="truncate">{slot.teacherName}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 shrink-0 font-medium">
                          <MapPin className="w-3 h-3 text-[#C9A24B]" />
                          <span>{slot.room}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
