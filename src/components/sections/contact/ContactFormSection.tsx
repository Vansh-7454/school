"use client";

import React, { useState, useTransition } from "react";
import {
  Send,
  CheckCircle2,
  User,
  Mail,
  HelpCircle,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { useToast } from "@/components/ui/Toast";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

const SUBJECT_OPTIONS = [
  "General Admissions Inquiry",
  "Schedule Private Campus Tour",
  "Scholarship & Bursary Information",
  "Academic Curricula & Syllabus Questions",
  "Press, Media & Community Partnerships",
  "Human Resources & Faculty Vacancies",
  "Other Matters",
];

export function ContactFormSection() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ContactFormState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitContact({}, formData);
      setState(result);
      if (result.success) {
        setIsSubmitted(true);
        toast.success(
          result.message || "Thank you for contacting Aurelia. Your inquiry has been dispatched to the secretariat.",
          "Message Dispatched"
        );
      } else if (result.message) {
        toast.error(result.message, "Form Submission Issue");
      }
    });
  };

  return (
    <Section tone="navy" id="contact-form">
      <Container size="narrow">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Direct Communication"
          title="Send Our Secretariat a Message"
          description="Complete the dispatch form below and our administrative team will direct your inquiry to the appropriate dean or departmental lead."
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
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-sm text-white/80 font-sans leading-relaxed">
                    {state.message ||
                      "Thank you for contacting Aurelia International School. Your inquiry has been routed to the relevant office and we will reply within one business day."}
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
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              /* Actual Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Global error banner if validation failed */}
                {state.message && !state.success && (
                  <div className="p-4 rounded-[14px] bg-rose-500/15 border border-rose-500/30 flex items-center gap-3 text-rose-200 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 stroke-[1.75]" />
                    <span>{state.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                    >
                      Your Full Name <span className="text-[#C9A24B]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <User className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        required
                        placeholder="Marcus Sterling"
                        className={`w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/5 border text-base sm:text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors ${
                          state.errors?.name
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-white/15 focus:border-[#C9A24B]"
                        }`}
                      />
                    </div>
                    {state.errors?.name && (
                      <p className="mt-1.5 text-xs text-rose-400">
                        {state.errors.name[0]}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2"
                    >
                      Your Email Address <span className="text-[#C9A24B]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                        <Mail className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        required
                        placeholder="marcus.sterling@example.com"
                        className={`w-full h-12 pl-10 pr-4 rounded-[14px] bg-white/5 border text-base sm:text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors ${
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
                </div>

                {/* Subject Select */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                  >
                    Subject of Inquiry <span className="text-[#C9A24B]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                      <HelpCircle className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <select
                      name="subject"
                      id="contact-subject"
                      required
                      defaultValue=""
                      className={`w-full h-12 pl-10 pr-4 rounded-[14px] bg-[#0e1d3d] border text-base sm:text-sm text-[#FBF6EA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors ${
                        state.errors?.subject
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-white/15 focus:border-[#C9A24B]"
                      }`}
                    >
                      <option value="" disabled className="text-white/40">
                        Choose a department or topic...
                      </option>
                      {SUBJECT_OPTIONS.map((subj) => (
                        <option key={subj} value={subj} className="bg-[#0B1B3A] text-white">
                          {subj}
                        </option>
                      ))}
                    </select>
                  </div>
                  {state.errors?.subject && (
                    <p className="mt-1.5 text-xs text-rose-400">
                      {state.errors.subject[0]}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#FBF6EA]/80 mb-2"
                  >
                    Your Message <span className="text-[#C9A24B]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-white/40">
                      <MessageSquare className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <textarea
                      name="message"
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Please share the details of your inquiry, including any dates or specific questions..."
                      className={`w-full pl-10 pr-4 py-3 rounded-[14px] bg-white/5 border text-base sm:text-sm text-[#FBF6EA] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A24B] transition-colors resize-y ${
                        state.errors?.message
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-white/15 focus:border-[#C9A24B]"
                      }`}
                    />
                  </div>
                  {state.errors?.message && (
                    <p className="mt-1.5 text-xs text-rose-400">
                      {state.errors.message[0]}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-white/50 font-sans">
                    All correspondence is held in strict institutional confidence.
                  </p>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#DFBA6B] text-[#0B1B3A] font-semibold text-xs uppercase tracking-wider hover:brightness-105 disabled:opacity-50 transition-all duration-300 shadow-md shadow-[#C9A24B]/20 flex-shrink-0 cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[1.75]" />
                        <span>Transmit Message</span>
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
