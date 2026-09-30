"use client";

import React, { useState, useTransition } from "react";
import {
  FileText,
  Compass,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { submitEnquiry, type EnquiryFormState } from "@/app/actions/enquiry";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useToast } from "@/components/ui/Toast";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const STEPS = [
  {
    step: "01",
    title: "Enquire",
    desc: "Complete our swift enquiry form or contact admissions for bespoke prospectuses.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Visit",
    desc: "Tour our 45-acre heritage grounds, visit laboratories, and converse with scholars.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Enrol",
    desc: "Diagnostic assessment, faculty interview, and formal offer of admission.",
    icon: GraduationCap,
  },
];

export function AdmissionCtaSection() {
  const [formState, setFormState] = useState<EnquiryFormState>({});
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await submitEnquiry(formState, formData);
      setFormState(res);
      if (res.success) {
        form.reset();
        toast.success(
          res.message || "Thank you! Your enquiry has been received. Our admissions team will be in touch.",
          "Enquiry Received"
        );
      } else if (res.message) {
        toast.error(res.message, "Submission Notice");
      }
    });
  };

  return (
    <Section id="admissions-cta" tone="navy">
      {/* Subtle Animated Rotating Rings in Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] pointer-events-none opacity-20"
        aria-hidden="true"
      >
        <svg viewBox="0 0 800 800" className="w-full h-full animate-spin-slow">
          <circle cx="400" cy="400" r="320" stroke="#C9A24B" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
          <circle cx="400" cy="400" r="240" stroke="#DFBE72" strokeWidth="1" fill="none" />
          <circle cx="400" cy="400" r="380" stroke="#C9A24B" strokeWidth="0.75" fill="none" strokeDasharray="2 6" />
        </svg>
      </div>

      {/* Ambient Gold Radial Glow */}
      <div
        className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-[#C9A24B]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Enrollment 2026/27"
        title="Admissions Open for 2026–27"
        description="Begin an extraordinary educational journey. Places for Michaelmas term are strictly limited to ensure our 1:7 mentorship ratio."
        align="center"
        tone="navy"
      />

      {/* 3-Step Process Row */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card
                key={idx}
                variant="dark"
                className="group relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-extrabold text-[#DFBE72]/50 group-hover:text-[#DFBE72] transition-colors">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#DFBE72]">
                    <Icon strokeWidth={1.75} className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-normal text-[#FBF6EA] mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FBF6EA]/70 leading-relaxed">
                  {s.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Short Admissions Enquiry Form Card */}
      <ScrollReveal direction="up" delay={0.25} className="max-w-3xl mx-auto">
        <div className="rounded-[24px] bg-gradient-to-b from-[#07122A]/95 to-[#0B1B3A]/95 border border-[#C9A24B]/35 p-5 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-lg mx-auto mb-6 sm:mb-8 space-y-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#DFBE72] uppercase inline-flex items-center gap-1.5">
              <Sparkles strokeWidth={1.75} className="w-3.5 h-3.5" />
              Expression of Interest
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FBF6EA]">
              Register Your Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#FBF6EA]/70">
              Our Admissions Registrar will contact you with fee structures and tour schedules.
            </p>
          </div>

          {/* Success Notification */}
          {formState.success && (
            <div className="mb-6 p-4 rounded-[14px] bg-[#C9A24B]/20 border border-[#C9A24B]/50 text-[#DFBE72] flex items-start gap-3">
              <CheckCircle2 strokeWidth={1.75} className="w-5 h-5 text-[#DFBE72] shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{formState.message}</p>
            </div>
          )}

          {/* Error Notification */}
          {formState.success === false && formState.message && (
            <div className="mb-6 p-4 rounded-[14px] bg-rose-500/20 border border-rose-400/40 text-rose-200 flex items-start gap-3">
              <AlertCircle strokeWidth={1.75} className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{formState.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Parent Name */}
              <div className="space-y-1.5">
                <label htmlFor="parentName" className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  required
                  placeholder="e.g. Eleanor Vance"
                  className="w-full h-12 px-4 rounded-[14px] bg-[#07122A]/80 border border-[#FBF6EA]/20 text-[#FBF6EA] placeholder:text-[#FBF6EA]/35 text-base sm:text-sm focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] transition-colors"
                />
                {formState.errors?.parentName && (
                  <p className="text-xs text-rose-400 mt-1">{formState.errors.parentName[0]}</p>
                )}
              </div>

              {/* Telephone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80">
                  Telephone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="e.g. +44 20 7946 0891"
                  className="w-full h-12 px-4 rounded-[14px] bg-[#07122A]/80 border border-[#FBF6EA]/20 text-[#FBF6EA] placeholder:text-[#FBF6EA]/35 text-base sm:text-sm focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] transition-colors"
                />
                {formState.errors?.phone && (
                  <p className="text-xs text-rose-400 mt-1">{formState.errors.phone[0]}</p>
                )}
              </div>
            </div>

            {/* Child's Grade / Entry Stage */}
            <div className="space-y-1.5">
              <label htmlFor="grade" className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80">
                Prospective Entry Stage / Grade *
              </label>
              <select
                id="grade"
                name="grade"
                required
                defaultValue=""
                className="w-full h-12 px-4 rounded-[14px] bg-[#07122A]/80 border border-[#FBF6EA]/20 text-[#FBF6EA] text-base sm:text-sm focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] transition-colors"
              >
                <option value="" disabled className="bg-[#07122A] text-[#FBF6EA]/50">
                  Select Stage / Grade of Interest
                </option>
                <option value="Pre-Primary (Ages 3-5)" className="bg-[#07122A] text-[#FBF6EA]">
                  Pre-Primary (Ages 3 – 5 • Nursery &amp; Reception)
                </option>
                <option value="Primary School (Years 1-6)" className="bg-[#07122A] text-[#FBF6EA]">
                  Primary School (Years 1 – 6 • Cambridge Primary)
                </option>
                <option value="Middle School (Years 7-9)" className="bg-[#07122A] text-[#FBF6EA]">
                  Middle School (Years 7 – 9 • Cambridge Lower Secondary)
                </option>
                <option value="Senior Secondary (Years 10-11 IGCSE)" className="bg-[#07122A] text-[#FBF6EA]">
                  Senior Secondary (Years 10 – 11 • Cambridge IGCSE)
                </option>
                <option value="Sixth Form (Years 12-13 IB Diploma)" className="bg-[#07122A] text-[#FBF6EA]">
                  Sixth Form (Years 12 – 13 • International Baccalaureate Diploma)
                </option>
              </select>
              {formState.errors?.grade && (
                <p className="text-xs text-rose-400 mt-1">{formState.errors.grade[0]}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isPending}
                className="w-full h-12 rounded-full font-semibold uppercase tracking-wider text-xs"
              >
                {isPending ? (
                  <>
                    <Loader2 strokeWidth={1.75} className="w-4 h-4 animate-spin text-[#0B1B3A]" />
                    <span>Transmitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Expression of Interest</span>
                    <ArrowRight strokeWidth={1.75} className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-[11px] text-center text-[#FBF6EA]/50 pt-1">
              By submitting, you agree to our confidential Admissions Privacy Notice.
            </p>
          </form>
        </div>
      </ScrollReveal>

      <style jsx>{`
        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 90s linear infinite;
        }
      `}</style>
    </Section>
  );
}

export default AdmissionCtaSection;
