"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut, ShieldCheck, ChevronDown, User as UserIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { PortalSidebar } from "./PortalSidebar";
import { signOutAction } from "@/app/actions/auth";
import type { UserRole } from "@/models/User";

interface PortalTopBarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: UserRole;
  };
}

export function PortalTopBar({ user }: PortalTopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AU";

  const roleLabelMap: Record<UserRole, string> = {
    student: "Student Portal",
    teacher: "Faculty Portal",
    parent: "Parent Gateway",
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 bg-[#0B1B3A] border-b border-[#C9A24B]/30 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-md">
        {/* Left Side: Brand and Portal Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -ml-2 rounded-xl text-cream-100 hover:text-[#C9A24B] hover:bg-white/5 lg:hidden focus:outline-none"
            aria-label="Toggle Portal Sidebar"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="shrink-0">
            <Logo size="sm" variant="light" href={`/portal/${user.role}`} />
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#C9A24B]/40 text-[#C9A24B] text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{roleLabelMap[user.role]}</span>
          </span>
        </div>

        {/* Right Side: User Menu & Sign Out */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserDropdown(!userDropdown)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-white/5 border border-transparent hover:border-[#C9A24B]/30 transition-all cursor-pointer focus:outline-none"
              aria-expanded={userDropdown}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#9E7A2E] text-[#0B1B3A] font-bold text-xs flex items-center justify-center shadow-xs">
                {initials}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-cream-100 max-w-[130px] truncate leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] text-[#C9A24B] font-semibold uppercase tracking-wider capitalize">
                  {user.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-cream-100/60 hidden md:block" />
            </button>

            {/* Dropdown */}
            {userDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0B1B3A] border border-[#C9A24B]/30 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs font-bold text-cream-100 truncate">{user.name}</p>
                  <p className="text-[10px] text-cream-100/50 truncate font-mono">{user.email}</p>
                </div>
                <Link
                  href={`/portal/${user.role}`}
                  onClick={() => setUserDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-cream-100 hover:bg-[#C9A24B]/20 hover:text-[#C9A24B] transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#C9A24B]" />
                  <span>My Portal Hub</span>
                </Link>
                <form action={signOutAction} className="w-full">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          <form action={signOutAction} className="hidden sm:block">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-red-400/40 text-cream-100/70 hover:text-red-300 hover:bg-red-500/10 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-xs h-full bg-[#0B1B3A] z-10 shadow-2xl flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                Portal Navigation
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-lg text-cream-100 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <PortalSidebar role={user.role} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
