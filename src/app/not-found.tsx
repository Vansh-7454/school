import React from "react";
import Link from "next/link";
import { Compass, BookOpen, GraduationCap, Calendar, Image as ImageIcon, Mail, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found at Aurelia International School.",
};

export default function NotFound() {
  const quickLinks = [
    { title: "Academics & IB", href: "/academics", icon: BookOpen, desc: "Explore our curriculum, Early Years to IB Diploma" },
    { title: "Admissions & Entry", href: "/admissions", icon: GraduationCap, desc: "Application procedures, fees, and visits" },
    { title: "News & Events", href: "/news-events", icon: Calendar, desc: "School calendar, lectures, and term dates" },
    { title: "Campus Gallery", href: "/gallery", icon: ImageIcon, desc: "Photographic tour of grounds and student life" },
    { title: "Contact & Visits", href: "/contact", icon: Mail, desc: "Get in touch with our admissions registrar" },
  ];

  return (
    <div className="min-h-[100svh] bg-[#0B1B3A] text-white pt-28 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C9A24B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-10">
        {/* Animated Illustration: School Silhouette with Lost Paper Plane */}
        <div className="relative w-full max-w-lg mx-auto h-48 sm:h-56 flex items-center justify-center">
          <svg
            viewBox="0 0 500 220"
            className="w-full h-full text-gold-400/80 drop-shadow-lg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground line */}
            <path d="M20 200 H480" stroke="rgba(201, 162, 75, 0.4)" strokeWidth="2" strokeDasharray="6 4" />

            {/* School Silhouette Outline */}
            {/* Left Wing */}
            <rect x="70" y="120" width="100" height="80" rx="3" fill="#12274A" stroke="#C9A24B" strokeWidth="1.5" />
            <path d="M60 120 L120 75 L180 120 Z" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="1.5" />
            <rect x="85" y="135" width="20" height="25" rx="10" fill="#C9A24B" fillOpacity="0.25" stroke="#C9A24B" strokeWidth="1" />
            <rect x="125" y="135" width="20" height="25" rx="10" fill="#C9A24B" fillOpacity="0.25" stroke="#C9A24B" strokeWidth="1" />

            {/* Right Wing */}
            <rect x="330" y="120" width="100" height="80" rx="3" fill="#12274A" stroke="#C9A24B" strokeWidth="1.5" />
            <path d="M320 120 L380 75 L440 120 Z" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="1.5" />
            <rect x="355" y="135" width="20" height="25" rx="10" fill="#C9A24B" fillOpacity="0.25" stroke="#C9A24B" strokeWidth="1" />
            <rect x="395" y="135" width="20" height="25" rx="10" fill="#C9A24B" fillOpacity="0.25" stroke="#C9A24B" strokeWidth="1" />

            {/* Central Clock Tower & Grand Hall */}
            <rect x="180" y="90" width="140" height="110" rx="2" fill="#0E2246" stroke="#C9A24B" strokeWidth="1.5" />
            {/* Portico Pillars */}
            <line x1="205" y1="140" x2="205" y2="200" stroke="#C9A24B" strokeWidth="2.5" />
            <line x1="225" y1="140" x2="225" y2="200" stroke="#C9A24B" strokeWidth="2" />
            <line x1="275" y1="140" x2="275" y2="200" stroke="#C9A24B" strokeWidth="2" />
            <line x1="295" y1="140" x2="295" y2="200" stroke="#C9A24B" strokeWidth="2.5" />
            {/* Arch entrance */}
            <path d="M235 200 V165 A15 15 0 0 1 265 165 V200 Z" fill="#060F22" stroke="#C9A24B" strokeWidth="1.5" />

            {/* Central Tower Belfry */}
            <rect x="220" y="45" width="60" height="50" rx="2" fill="#122B58" stroke="#C9A24B" strokeWidth="1.5" />
            <path d="M210 45 L250 15 L290 45 Z" fill="#C9A24B" fillOpacity="0.4" stroke="#C9A24B" strokeWidth="2" />
            {/* Weather Vane Flag */}
            <line x1="250" y1="15" x2="250" y2="5" stroke="#C9A24B" strokeWidth="1.5" />
            <polygon points="250,5 264,9 250,13" fill="#C9A24B" />

            {/* Clock Face */}
            <circle cx="250" cy="70" r="12" fill="#FAF6ED" stroke="#C9A24B" strokeWidth="2" />
            {/* Clock hands pointing towards 4:04 */}
            <line x1="250" y1="70" x2="250" y2="62" stroke="#0B1B3A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="250" y1="70" x2="257" y2="73" stroke="#0B1B3A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Trees flanking campus */}
            <path d="M40 200 C30 170 60 150 50 135 C65 145 70 170 55 200 Z" fill="#C9A24B" fillOpacity="0.2" />
            <path d="M460 200 C470 170 440 150 450 135 C435 145 430 170 445 200 Z" fill="#C9A24B" fillOpacity="0.2" />

            {/* Dotted Flight Trail for Paper Plane */}
            <path
              d="M 60,70 Q 150,20 230,85 T 380,50 Q 420,35 440,65"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="2"
              strokeDasharray="5,6"
              strokeLinecap="round"
              className="animate-pulse"
              opacity="0.8"
            />

            {/* Lost Paper Plane flying over roof */}
            <g transform="translate(435, 60) rotate(-15)">
              <polygon
                points="0,0 26,-8 18,12 10,4"
                fill="#C9A24B"
                stroke="#FAF6ED"
                strokeWidth="1"
              />
              <line x1="0" y1="0" x2="18" y2="12" stroke="#0B1B3A" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* Status Message */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/40 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            Error Code 404
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            Page Off Course
          </h1>
          <p className="text-base sm:text-lg text-white/75 max-w-xl mx-auto font-sans leading-relaxed">
            The page you requested may have moved, graduated, or had its address mistyped. Let us help guide you back onto the Aurelia grounds.
          </p>
        </div>

        {/* Search-style Directory Suggestions */}
        <div className="max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider text-gold-300 uppercase">
            <Compass className="w-4 h-4 text-[#C9A24B]" />
            <span>Recommended Campus Destinations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#C9A24B]/20 hover:border-[#C9A24B]/60 transition-all shadow-sm"
                >
                  <div className="p-2.5 rounded-xl bg-[#C9A24B]/15 text-[#C9A24B] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="font-serif text-base text-white group-hover:text-gold-300 transition-colors font-semibold">
                        {item.title}
                      </h2>
                      <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-white/60 line-clamp-1 mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Primary Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBE72] via-[#C9A24B] to-[#B38B38] text-[#0B1B3A] font-medium text-sm hover:brightness-105 active:scale-95 transition-all shadow-gold"
          >
            <span>Return to School Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
