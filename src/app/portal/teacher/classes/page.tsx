import React from "react";
import type { Metadata } from "next";
import { Users, MapPin } from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getTeacherPortalData } from "@/lib/portalData";

export const metadata: Metadata = {
  title: "My Classes | Faculty Portal",
};

export default async function TeacherClassesPage() {
  const user = await requireRole("teacher");
  const data = await getTeacherPortalData(user.id);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block">
          Faculty Allocations
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3A]">
          Assigned Classes & Cohort Rolls
        </h2>
        <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans mt-0.5">
          Academic tutorial groups, lecture rooms, and enrolled pupil numbers for Michaelmas Term.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs hover:border-[#C9A24B] transition-all space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0B1B3A] text-[#C9A24B] text-xs font-bold uppercase tracking-wider">
                  {cls.grade}
                </span>
                <span className="text-xs font-semibold text-[#0B1B3A]/60">
                  {cls.section}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0B1B3A]">
                {cls.subject}
              </h3>
            </div>

            <div className="pt-4 border-t border-[#0B1B3A]/10 grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#C9A24B] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#0B1B3A]/50 block">
                    Pupils
                  </span>
                  <span className="font-bold text-[#0B1B3A]">
                    {cls.studentCount} Registered
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#C9A24B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#0B1B3A]/50 block">
                    Location
                  </span>
                  <span className="font-bold text-[#0B1B3A]">
                    Room {cls.room}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
