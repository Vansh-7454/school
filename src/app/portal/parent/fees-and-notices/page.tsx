import React from "react";
import type { Metadata } from "next";
import { CreditCard, CheckCircle2, ShieldCheck } from "lucide-react";
import { requireRole } from "@/lib/authz";
import { getAnnouncementsForRole } from "@/lib/portalData";
import { AnnouncementFeed } from "@/components/portal/AnnouncementFeed";

export const metadata: Metadata = {
  title: "Fees & Parent Notices | Parent Gateway",
};

export default async function ParentFeesAndNoticesPage() {
  await requireRole("parent");
  const announcements = await getAnnouncementsForRole("parent");

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block">
          Bursary & Communications
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1B3A]">
          Term Fees Account & Guardian Notices
        </h2>
        <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans mt-0.5">
          Illustrative fee statements, receipt archives, and official parent notices.
        </p>
      </div>

      {/* Illustrative Fee Status Card (Demo Only) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#0B1B3A]/10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0B1B3A]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#0B1B3A]">
                Michaelmas Term 2026 Tuition & Boarding Statement
              </h3>
              <p className="text-xs text-[#0B1B3A]/50 font-sans">
                Statement Ref: AIS-INV-2026-09-8422 • Pupil: Eleanor Vance
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Account Cleared (Nil Balance)</span>
          </div>
        </div>

        {/* Invoice Itemized Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 text-xs sm:text-sm border-b border-[#0B1B3A]/5">
            <span className="text-[#0B1B3A]/80 font-medium">
              Sixth Form Tuition (Academic Core & IB Diploma Framework)
            </span>
            <span className="font-mono font-bold text-[#0B1B3A]">₹9,85,000.00</span>
          </div>
          <div className="flex items-center justify-between py-2 text-xs sm:text-sm border-b border-[#0B1B3A]/5">
            <span className="text-[#0B1B3A]/80 font-medium">
              Cavendish House Residential Boarding & Dining Amenities
            </span>
            <span className="font-mono font-bold text-[#0B1B3A]">₹5,42,000.00</span>
          </div>
          <div className="flex items-center justify-between py-2 text-xs sm:text-sm border-b border-[#0B1B3A]/5">
            <span className="text-[#0B1B3A]/80 font-medium">
              Science Laboratory Consumables & Serpentine Regatta Equipment Fee
            </span>
            <span className="font-mono font-bold text-[#0B1B3A]">₹48,000.00</span>
          </div>
          <div className="flex items-center justify-between py-2 text-xs sm:text-sm border-b border-[#0B1B3A]/5 text-emerald-700">
            <span className="font-medium">
              Academic Excellence Merit Scholarship Credit (Honorary 15%)
            </span>
            <span className="font-mono font-bold">-₹2,36,250.00</span>
          </div>
          <div className="flex items-center justify-between pt-3 text-sm sm:text-base font-bold text-[#0B1B3A]">
            <span>Net Paid via Direct Debit (Receipt #BACS-99410)</span>
            <span className="font-mono text-[#C9A24B] text-lg">₹13,38,750.00</span>
          </div>
        </div>

        {/* Demo Notice Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-[#FBF6EA] border border-[#C9A24B]/30 text-xs text-[#0B1B3A]/70 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#0B1B3A]">Demonstration Record:</strong> This financial statement is illustrative and generated for demo testing of the Aurelia International School parent portal.
          </p>
        </div>
      </div>

      {/* Parent Segmented Notices */}
      <AnnouncementFeed announcements={announcements} />
    </div>
  );
}
