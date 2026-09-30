import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PortalTopBar } from "@/components/portal/PortalTopBar";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalHeader } from "@/components/portal/PortalHeader";

export const metadata: Metadata = {
  title: "Aurelia Academic Portal",
  description: "Internal academic and collegiate management portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-[100svh] bg-[#FBF6EA] flex flex-col">
      {/* Slim Top Bar */}
      <PortalTopBar user={user} />

      {/* Main Workspace with Sidebar and Content Area */}
      <div className="flex-1 flex w-full max-w-[1920px] mx-auto">
        {/* Desktop Sidebar (Left column) */}
        <div className="hidden lg:block w-64 shrink-0 min-h-[calc(100svh-4rem)]">
          <PortalSidebar role={user.role} />
        </div>

        {/* Dynamic Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <PortalHeader name={user.name || "Aurelia Scholar"} role={user.role} />
          {children}
        </main>
      </div>
    </div>
  );
}
