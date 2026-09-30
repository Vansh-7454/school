"use client";

import React, { useState, useTransition } from "react";
import {
  Send,
  CheckCircle2,
  Calendar,
  User,
  Mail,
  Phone,
  GraduationCap,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { submitEnquiry, type EnquiryFormState } from "@/app/actions/enquiry";
import { useToast } from "@/components/ui/Toast";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

const GRADES = [
  { value: "Early Years (Nursery / KG)", label: "Early Years Foundation (Ages 3 – 5)" },
  { value: "Lower Primary (Grades 1-3)", label: "Lower Primary (Grades 1 – 3)" },
  { value: "Upper Primary (Grades 4-5)", label: "Upper Primary (Grades 4 – 5)" },
  { value: "Middle School (Grades 6-8)", label: "Middle Secondary (Grades 6 – 8)" },
  { value: "Cambridge IGCSE (Grades 9-10)", label: "Cambridge IGCSE (Grades 9 – 10)" },
  { value: "IB Diploma (Grades 11-12)", label: "International Baccalaureate (Grades 11 – 12)" },
];

export function FullEnquiryForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<EnquiryFormState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitEnquiry({}, formData);
      setState(result);
      if (result.success) {
        setIsSubmitted(true);
        toast.success(
          result.message || "Your admissions enquiry has been registered with our registrar.",
          "Admissions Form Received"
        );
      } else if (result.message) {
        toast.error(result.message, "Enquiry Submission Notice");
      }
    });
  };

  return (
    <Section tone="navy" id="enquiry-form">
      <Container size="narrow">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Direct Application"
          title="Begin Your Child’s Admissions Enquiry"
          description="Take the first step toward joining the Aurelia scholar community. Submit your information below and our Admissions Registrar will promptly assist you."
          align="center"
        />

        {/* Form Card or Success Screen */}
        <ScrollReveal delay={0.1}>
          <Card variant="dark" className="p-5 sm:p-10 md:p-12 relative">
            {isSubmitted ? (
              /* Success Screen */
              <div className="text-center py-10 sm:py-14 space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#C9A24B]/20 border-2 border-[#C9A24B] text-[#C9A24B] flex items-center justify-center mx-auto shadow-lg shadow-[#C9A24B]/20 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 stroke-[1.75]" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Application Enquiry Received
                  </h3>
                  <p className="text-sm text-white/80 font-sans leading-relaxed">
                    {state.message ||
                      "Thank you for your interest in Aurelia International School. Our Admissions Registrar will contact you within 24 hours to coordinate your campus discovery tour."}
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setState({});
                    }}
                    className="h-12 px-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase border border-white/20 transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Actual Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Global error banner if validation failed */}
                {state.message && !state.success && (
                  <div className="p-4 rounded-[14px] bg-rose-500/15 border border-rose-500/30 flex items-center gap-3 text-rose-200 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 stroke-[1.75]" />
                    <span>{state.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Parent Full Name */}
                  <div>
                    <label
                      htmlFor="parentName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                    >
                      Parent / Guardian Name <span className="text-[#C9A24B]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <User className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <input
                        type="text"
                        name="parentName"
                        id="parentName"
                        required
                        placeholder="e.g. Dr. Eleanor Vance"
                        className={`w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/5 border text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors ${
                          state.errors?.parentName
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-white/15 focus:border-[#C9A24B]"
                        }`}
                      />
                    </div>
                    {state.errors?.parentName && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {state.errors.parentName[0]}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                    >
                      Email Address <span className="text-[#C9A24B]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <Mail className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="eleanor.vance@example.com"
                        className={`w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/5 border text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors ${
                          state.errors?.email
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-white/15 focus:border-[#C9A24B]"
                        }`}
                      />
                    </div>
                    {state.errors?.email && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {state.errors.email[0]}
                      </p>
                    )}
                  </div>

                  {/* Telephone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                    >
                      Telephone / WhatsApp <span className="text-[#C9A24B]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <Phone className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        placeholder="+44 20 7946 0912"
                        className={`w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/5 border text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors ${
                          state.errors?.phone
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-white/15 focus:border-[#C9A24B]"
                        }`}
                      />
                    </div>
                    {state.errors?.phone && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {state.errors.phone[0]}
                      </p>
                    )}
                  </div>

                  {/* Child Full Name */}
                  <div>
                    <label
                      htmlFor="childName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                    >
                      Child’s Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <User className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <input
                        type="text"
                        name="childName"
                        id="childName"
                        placeholder="e.g. Julian Vance"
                        className="w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/5 border border-white/15 text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Prospective Grade Select */}
                  <div>
                    <label
                      htmlFor="grade"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                    >
                      Target Entry Stage / Grade <span className="text-[#C9A24B]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <GraduationCap className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <select
                        name="grade"
                        id="grade"
                        required
                        defaultValue=""
                        className={`w-full h-12 pl-10 pr-4 rounded-[14px] bg-[#0e1d3d] border text-sm text-[#FBF6EA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors ${
                          state.errors?.grade
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-white/15 focus:border-[#C9A24B]"
                        }`}
                      >
                        <option value="" disabled className="text-white/40">
                          Select academic division...
                        </option>
                        {GRADES.map((g) => (
                          <option key={g.value} value={g.value} className="bg-[#0B1B3A] text-white">
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {state.errors?.grade && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {state.errors.grade[0]}
                      </p>
                    )}
                  </div>

                  {/* Preferred Campus Visit Date */}
                  <div>
                    <label
                      htmlFor="visitDate"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                    >
                      Preferred Campus Visit Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <Calendar className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <input
                        type="date"
                        name="visitDate"
                        id="visitDate"
                        className="w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/5 border border-white/15 text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B] transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Comments / Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                  >
                    Additional Information / Specific Academic Interests
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-white/40">
                      <MessageSquare className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      rows={3}
                      placeholder="Please mention any musical instruments, sports, language proficiencies or questions regarding bursary considerations..."
                      className="w-full pl-10 pr-4 py-3 rounded-[14px] bg-white/5 border border-white/15 text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B] transition-colors resize-y"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-white/50 font-sans">
                    By submitting, you agree to receive communications regarding your enquiry.
                    We respect your privacy.
                  </p>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#DFBA6B] text-[#0B1B3A] font-semibold text-xs uppercase tracking-wider hover:brightness-105 disabled:opacity-50 transition-all duration-300 shadow-md shadow-[#C9A24B]/20 flex-shrink-0 cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[1.75]" />
                        <span>Submit Admissions Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Card>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
