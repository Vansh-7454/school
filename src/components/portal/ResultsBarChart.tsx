"use client";

import React from "react";
import { motion } from "framer-motion";

interface ResultItem {
  _id?: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface ResultsBarChartProps {
  results: ResultItem[];
}

export function ResultsBarChart({ results }: ResultsBarChartProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#0B1B3A]/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
            Performance Distribution
          </span>
          <h3 className="font-serif font-bold text-xl text-[#0B1B3A]">
            Michaelmas Term Subject Scores
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#0B1B3A]" />
            <span className="text-[#0B1B3A]/70 font-medium">Earned Percentage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#C9A24B]" />
            <span className="text-[#0B1B3A]/70 font-medium">Target Benchmark (90%)</span>
          </div>
        </div>
      </div>

      {/* SVG / CSS Animated Bars */}
      <div className="space-y-5">
        {results.map((res, idx) => {
          const percentage = Math.round((res.marks / (res.maxMarks || 100)) * 100);

          return (
            <div key={res._id || idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-serif font-bold text-[#0B1B3A]">
                  {res.subject}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0B1B3A]">{res.marks} / {res.maxMarks}</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#0B1B3A] text-[#C9A24B] font-mono text-[11px] font-bold">
                    {res.grade}
                  </span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="relative w-full h-4 rounded-full bg-[#FAF8F5] border border-[#0B1B3A]/10 overflow-hidden">
                {/* 90% Benchmark indicator line */}
                <div className="absolute top-0 bottom-0 left-[90%] w-0.5 bg-[#C9A24B] z-10 opacity-70" />

                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#0B1B3A] via-[#10244C] to-[#C9A24B]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
