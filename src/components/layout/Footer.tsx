"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Award,
  Globe2,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { schoolInfo } from "@/data/schoolInfo";
import { footerQuickLinks } from "@/data/navigation";
import { useToast } from "@/components/ui/Toast";
import { Container } from "@/components/ui/Container";
import { CurveDivider } from "@/components/ui/Dividers";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const toast = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      toast.success(
        "Thank you for subscribing. You will receive The Aurelia Chronicle directly to your inbox.",
        "Subscription Confirmed"
      );
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#07122A] text-cream-100/80 border-t border-[#C9A24B]/35 bg-grain overflow-hidden">
      {/* Top curved divider separating final section from deep footer */}
      <CurveDivider toTone="navyDeep" fromTone="navy" position="top" />

      {/* Decorative Gold Radial Glow in Background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container className="pt-16 pb-12 relative z-10">
        {/* Top Newsletter Card */}
        <div className="relative rounded-[24px] p-8 sm:p-10 mb-16 border border-[#C9A24B]/25 bg-gradient-to-r from-[#0B1B3A]/90 via-[#12274A]/80 to-[#0B1B3A]/90 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#C9A24B] uppercase">
                Stay Connected
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 font-semibold">
                Subscribe to The Aurelia Chronicle
              </h3>
              <p className="text-sm text-cream-100/70 max-w-lg">
                Receive termly dispatches, academic achievements, prospective parent event
                invitations, and cultural gala highlights directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gold-500/15 border border-[#C9A24B]/40 text-gold-200">
                  <CheckCircle2 strokeWidth={1.75} className="w-5 h-5 text-[#C9A24B] shrink-0" />
                  <p className="text-sm">
                    Thank you for subscribing. You are now registered to receive The Aurelia Chronicle.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <Mail strokeWidth={1.75} className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-100/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full h-12 pl-11 pr-4 rounded-[14px] bg-[#0B1B3A]/70 border border-cream-100/20 text-cream-100 placeholder:text-cream-100/40 text-sm focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B] transition-colors"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md" showArrow>
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-cream-100/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Logo size="lg" variant="light" href="/" />
            <p className="text-sm text-cream-100/70 leading-relaxed max-w-sm">
              {schoolInfo.tagline}. Established in {schoolInfo.founded}, fostering an inclusive,
              intellectually rigorous environment where tradition meets forward-thinking innovation.
            </p>

            {/* Accreditations */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-gold-400 block mb-3">
                Accreditations & Affiliations
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-cream-100/75">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Award className="w-3.5 h-3.5 text-gold-400" />
                  IB World School
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Globe2 className="w-3.5 h-3.5 text-gold-400" />
                  Cambridge Int’l
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  CIS Accredited
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links Columns */}
          {footerQuickLinks.map((section, idx) => (
            <div key={idx} className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-cream-100 text-lg font-semibold tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-cream-100/70 hover:text-gold-300 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold-400/40 group-hover:bg-gold-400 transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-cream-100 text-lg font-semibold tracking-wide">
              Campus Visit
            </h4>
            <div className="space-y-3 text-xs text-cream-100/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p className="leading-snug">{schoolInfo.contact.address.full}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:${schoolInfo.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {schoolInfo.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`mailto:${schoolInfo.contact.admissionsEmail}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {schoolInfo.contact.admissionsEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{schoolInfo.contact.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/50">
          <p>
            © {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-gold-300 transition-colors">
              Privacy Notice
            </Link>
            <Link href="/about" className="hover:text-gold-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/about" className="hover:text-gold-300 transition-colors">
              Safeguarding Policy
            </Link>
            <Link href="/about" className="hover:text-gold-300 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
