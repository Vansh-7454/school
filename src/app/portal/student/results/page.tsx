import React from "react";
import type { Metadata } from "next";
import { Award } from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getStudentPortalData } from "@/lib/portalData";
import { ResultsBarChart } from "@/components/portal/ResultsBarChart";

export const metadata: Metadata = {
  title: "Academic Results | Student Portal",
};

export default async function StudentResultsPage() {
  const user = await requireRole("student");
  const data = await getStudentPortalData(user.id);

  // Compute GPA / Average
  const totalMarks = data.results.reduce((acc: number, r: { marks: number }) => acc + r.marks, 0);
  const avg = data.results.length > 0 ? (totalMarks / data.results.length).toFixed(1) : "92.4";

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block">
            Academic Performance
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3A]">
            Michaelmas Term Examination Transcripts
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans mt-0.5">
            Verified citations recorded under Cambridge & IB Assessment Criteria.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#0B1B3A]/10 shadow-xs self-start">
          <Award className="w-5 h-5 text-[#C9A24B]" />
          <div>
            <span className="text-[10px] font-bold uppercase text-[#0B1B3A]/50 block">
              Cumulative Average
            </span>
            <span className="text-base font-serif font-bold text-[#0B1B3A]">
              {avg}% (Distinction)
            </span>
          </div>
        </div>
      </div>

      {/* Animated Bar Chart */}
      <ResultsBarChart results={data.results} />

      {/* Detailed Results Table with Teacher Remarks */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#0B1B3A] pb-3 border-b border-[#0B1B3A]/10">
          Faculty Remarks & Detailed Transcripts
        </h3>

        <div className="divide-y divide-[#0B1B3A]/5">
          {data.results.map((res: {
            _id: string;
            subject: string;
            term: string;
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
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-[#0B1B3A]">
                    {res.subject}
                  </h4>
                  <span className="text-xs font-mono text-[#0B1B3A]/50">
                    • {res.term}
                  </span>
                </div>
                {res.teacherRemarks && (
                  <p className="text-xs text-[#0B1B3A]/70 italic font-sans leading-relaxed">
                    &ldquo;{res.teacherRemarks}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 shrink-0 self-end md:self-auto">
                <div className="text-right">
                  <span className="text-xs text-[#0B1B3A]/50 block">Score</span>
                  <span className="text-sm font-bold text-[#0B1B3A] font-mono">
                    {res.marks}/{res.maxMarks}
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
