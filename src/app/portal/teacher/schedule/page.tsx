import React from "react";
import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getTeacherPortalData } from "@/lib/portalData";

export const metadata: Metadata = {
  title: "Teaching Schedule | Faculty Portal",
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export default async function TeacherSchedulePage() {
  const user = await requireRole("teacher");
  const data = await getTeacherPortalData(user.id);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block">
          Faculty Timetable
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3A]">
          Weekly Teaching & Tutorial Rota
        </h2>
        <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans mt-0.5">
          Masterclass periods, pastoral tutorials, and departmental colloquia.
        </p>
      </div>

      <div className="space-y-6">
        {DAYS.map((day) => {
          const slots = data.schedule.filter(
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
                  <h3 className="font-serif font-bold text-xl text-[#0B1B3A]">
                    {day}
                  </h3>
                </div>
                <span className="text-xs text-[#0B1B3A]/50">
                  {slots.length} Academic Commitments
                </span>
              </div>

              {slots.length === 0 ? (
                <p className="text-xs text-[#0B1B3A]/50 italic">
                  Research hours, independent scholarship, and administrative office periods.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slots.map((slot: { period: number; time: string; subject: string; room: string }, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#0B1B3A]/5 hover:border-[#C9A24B]/40 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#0B1B3A] text-[#C9A24B] font-mono text-[11px] font-bold">
                          Period {slot.period}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B1B3A]/60">
                          <Clock className="w-3 h-3 text-[#C9A24B]" />
                          <span>{slot.time}</span>
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-[#0B1B3A]">
                        {slot.subject}
                      </h4>

                      <div className="pt-2 border-t border-[#0B1B3A]/5 flex items-center justify-between text-xs text-[#0B1B3A]/60">
                        <span className="inline-flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-[#C9A24B]" />
                          <span>Room {slot.room}</span>
                        </span>
                        <span className="font-bold text-[#C9A24B] uppercase tracking-wider text-[10px]">
                          Lecturing
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
