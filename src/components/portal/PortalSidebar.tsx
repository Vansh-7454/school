"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Award,
  Users,
  GraduationCap,
  CreditCard,
  ExternalLink,
  ChevronRight,
  Shield,
} from "lucide-react";
import type { UserRole } from "@/models/User";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const ROLE_NAV: Record<UserRole, NavItem[]> = {
  student: [
    { label: "Overview", href: "/portal/student", icon: LayoutDashboard },
    { label: "Weekly Timetable", href: "/portal/student/timetable", icon: Calendar },
    { label: "Coursework & Tasks", href: "/portal/student/assignments", icon: FileText },
    { label: "Academic Results", href: "/portal/student/results", icon: Award },
  ],
  teacher: [
    { label: "Faculty Hub", href: "/portal/teacher", icon: LayoutDashboard },
    { label: "My Classes", href: "/portal/teacher/classes", icon: Users },
    { label: "Teaching Schedule", href: "/portal/teacher/schedule", icon: Calendar },
  ],
  parent: [
    { label: "Child Overview", href: "/portal/parent", icon: LayoutDashboard },
    { label: "Attendance & Academics", href: "/portal/parent/child", icon: GraduationCap },
    { label: "Fees & Notices", href: "/portal/parent/fees-and-notices", icon: CreditCard },
  ],
};

interface PortalSidebarProps {
  role: UserRole;
  onNavigate?: () => void;
}

export function PortalSidebar({ role, onNavigate }: PortalSidebarProps) {
  const pathname = usePathname();
  const navItems = ROLE_NAV[role] || ROLE_NAV.student;

  return (
    <aside className="w-full h-full flex flex-col justify-between py-6 px-4 bg-[#0B1B3A] text-white border-r border-[#C9A24B]/20">
      <div className="space-y-6">
        {/* Portal Scope Indicator */}
        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C9A24B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-cream-100 capitalize">
              {role} Space
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#C9A24B] px-1.5 py-0.5 rounded bg-[#C9A24B]/10">
            Read-Only
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5" aria-label="Portal Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#C9A24B] text-[#0B1B3A] font-bold shadow-md"
                    : "text-cream-100/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0B1B3A]" : "text-[#C9A24B]"}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-cream-100/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span>Aurelia Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <p className="text-[10px] text-cream-100/40 text-center font-mono">
          Aurelia International School © 2026
        </p>
      </div>
    </aside>
  );
}
