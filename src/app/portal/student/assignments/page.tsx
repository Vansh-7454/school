import React from "react";
import type { Metadata } from "next";
import { Calendar, CheckCircle2, Clock3, AlertCircle } from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getStudentPortalData } from "@/lib/portalData";

export const metadata: Metadata = {
  title: "Assignments & Coursework | Student Portal",
};

const REFERENCE_TIMESTAMP = new Date("2026-09-29T12:00:00Z").getTime();

export default async function StudentAssignmentsPage() {
  const user = await requireRole("student");
  const data = await getStudentPortalData(user.id);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block">
          Academic Submissions
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3A]">
          Coursework & Problem Sets
        </h2>
        <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans mt-0.5">
          Track deadlines, submission confirmations, and formative tutor marks.
        </p>
      </div>

      {/* Assignments List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#0B1B3A]/10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3A]/60">
            Task Citations
          </span>
          <span className="text-xs text-[#0B1B3A]/50">
            Total {data.assignments.length} assignments
          </span>
        </div>

        <div className="divide-y divide-[#0B1B3A]/5">
          {data.assignments.map((asg: {
            _id: string;
            subject: string;
            title: string;
            dueDate: string | Date;
            status: "Pending" | "Submitted" | "Graded";
            gradeResult?: string;
          }) => {
            const dueDate = new Date(asg.dueDate);
            const isDueSoon = asg.status === "Pending" && dueDate.getTime() - REFERENCE_TIMESTAMP < 7 * 24 * 60 * 60 * 1000;

            const statusBadgeMap = {
              Pending: {
                bg: isDueSoon ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-blue-50 text-blue-800 border-blue-200",
                icon: isDueSoon ? AlertCircle : Clock3,
                label: isDueSoon ? "Due Soon" : "Pending",
              },
              Submitted: {
                bg: "bg-purple-50 text-purple-800 border-purple-200",
                icon: Clock3,
                label: "Submitted",
              },
              Graded: {
                bg: "bg-emerald-50 text-emerald-800 border-emerald-300",
                icon: CheckCircle2,
                label: "Graded",
              },
            };

            const badge = statusBadgeMap[asg.status] || statusBadgeMap.Pending;
            const BadgeIcon = badge.icon;

            return (
              <div
                key={asg._id}
                className="py-5 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0B1B3A] text-[#C9A24B] text-[10px] font-bold uppercase tracking-wider">
                      {asg.subject}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badge.bg}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B1B3A]">
                    {asg.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#0B1B3A]/60">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>
                      Due:{" "}
                      {dueDate.toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  {asg.gradeResult ? (
                    <div className="inline-block px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-right">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                        Result
                      </span>
                      <span className="text-sm font-bold text-emerald-900 font-mono">
                        {asg.gradeResult}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#0B1B3A]/40 font-mono italic">
                      Awaiting Grading
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
