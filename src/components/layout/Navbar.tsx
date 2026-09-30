"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight, Lock, Phone, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { mainNavItems } from "@/data/navigation";
import { schoolInfo } from "@/data/schoolInfo";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/actions/auth";

export interface NavbarProps {
  session?: {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
    };
  } | null;
}

export function Navbar({ session }: NavbarProps = {}) {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const user = session?.user;
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AU";

  // Auto-hide on downward scroll, reveal on upward scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  // Close mobile menu on route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          // Deep navy #0B1B3A with glass blur and gold border
          scrolled
            ? "bg-[#0B1B3A]/95 backdrop-blur-xl border-b border-gold-400/30 py-2.5 shadow-navy"
            : "bg-[#0B1B3A]/85 backdrop-blur-md border-b border-gold-400/20 py-3 sm:py-3.5"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-2 xl:gap-4">
            {/* School Logo */}
            <div className="shrink-0">
              <Logo size="sm" variant="light" href="/" />
            </div>

            {/* Desktop Navigation Links (>= 1024px / lg) - Single line with whitespace-nowrap */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 whitespace-nowrap">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors duration-200",
                      isActive
                        ? "text-gold-300 font-semibold"
                        : "text-cream-100/80 hover:text-cream-50 hover:bg-white/5"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveIndicator"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Gold "Portal login" pill OR User Menu */}
            <div className="hidden lg:flex items-center shrink-0 relative">
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gold-400/50 bg-[#0B1B3A]/90 hover:bg-[#0B1B3A] text-cream-100 hover:border-gold-400 transition-all cursor-pointer focus:outline-none shadow-sm"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 font-bold text-xs flex items-center justify-center shadow-xs">
                      {userInitials}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-cream-100 leading-tight max-w-[120px] truncate">
                        {user.name || "Aurelia Member"}
                      </span>
                      <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider capitalize">
                        {user.role}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gold-400/70" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0B1B3A] border border-gold-400/30 p-2 shadow-2xl backdrop-blur-xl z-50 space-y-1"
                      >
                        <div className="px-3 py-2 border-b border-white/10 mb-1">
                          <p className="text-[10px] text-cream-100/50 truncate uppercase font-bold tracking-wider">Signed in as</p>
                          <p className="text-xs font-bold text-cream-100 truncate">{user.email}</p>
                        </div>
                        <Link
                          href={`/portal/${user.role}`}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-cream-100 hover:bg-gold-500/20 hover:text-gold-300 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gold-400" />
                          <span>My Portal</span>
                        </Link>
                        <form action={signOutAction} className="w-full">
                          <button
                            type="submit"
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors cursor-pointer"
                          >
                            <LogOut className="w-4 h-4 text-red-400" />
                            <span>Sign Out</span>
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap overflow-hidden border border-gold-400/60 bg-gradient-to-r from-gold-500/20 via-gold-400/30 to-gold-500/20 text-cream-100 hover:text-navy-950 transition-all duration-300 shadow-sm hover:shadow-gold"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  <Lock className="w-3.5 h-3.5 text-gold-300 group-hover:text-navy-900 transition-colors" />
                  <span className="whitespace-nowrap">Portal Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle Button (< 1024px / lg) */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href={user ? `/portal/${user.role}` : "/login"}
                className="w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full text-gold-300 border border-gold-400/30 bg-navy-800/80 transition-transform active:scale-95"
                aria-label={user ? "My Portal" : "Login"}
              >
                {user ? (
                  <div className="w-6 h-6 rounded-full bg-gold-400 text-navy-950 font-bold text-xs flex items-center justify-center">
                    {userInitials}
                  </div>
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full text-cream-100 hover:text-gold-300 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/50 cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Thin Gold Scroll Progress Bar under Navbar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A24B] via-[#E8D196] to-[#C9A24B] origin-left pointer-events-none shadow-[0_0_8px_rgba(201,162,75,0.7)]"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      {/* Mobile Drawer Overlay with Animated Transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#0B1B3A]/95 backdrop-blur-2xl flex flex-col justify-between pt-20 pb-8 px-6 overflow-y-auto h-[100svh]"
          >
            {/* Mobile Navigation Links */}
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                },
                closed: {
                  transition: { staggerChildren: 0.02, staggerDirection: -1 },
                },
              }}
              className="flex flex-col gap-2 max-w-md mx-auto w-full my-auto py-4"
            >
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 },
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-xl text-lg font-serif tracking-wide border whitespace-nowrap transition-all duration-200",
                        isActive
                          ? "bg-gold-500/15 border-gold-400/40 text-gold-300 font-bold"
                          : "border-transparent text-cream-100/90 hover:text-cream-50 hover:bg-white/5"
                      )}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-gold-400/60" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom Actions & Contact in Mobile Menu */}
            <div className="max-w-md mx-auto w-full pt-6 border-t border-cream-100/10 flex flex-col gap-4">
              {user ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-gold-400/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 font-bold text-sm flex items-center justify-center">
                        {userInitials}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-cream-100">{user.name}</p>
                        <p className="text-xs text-gold-400 uppercase font-semibold capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/portal/${user.role}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-xs font-bold tracking-wider uppercase gold-gradient-bg text-navy-950 shadow-gold"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>My Portal</span>
                    </Link>
                    <form action={signOutAction} className="w-full">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-xs font-bold tracking-wider uppercase bg-white/10 hover:bg-red-500/20 text-cream-100 hover:text-red-200 border border-white/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans text-xs font-bold tracking-wider uppercase gold-gradient-bg text-navy-950 shadow-gold"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In to School Portal</span>
                </Link>
              )}

              <div className="flex items-center justify-between text-xs text-cream-100/60 px-1">
                <a
                  href={`tel:${schoolInfo.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>{schoolInfo.contact.phone}</span>
                </a>
                <span>Admissions 2026/27</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
