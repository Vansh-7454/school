import React from "react";
import { Bell, Calendar, AlertTriangle } from "lucide-react";
import type { IAnnouncement } from "@/models/Announcement";

interface AnnouncementFeedProps {
  announcements: Partial<IAnnouncement>[];
}

export function AnnouncementFeed({ announcements }: AnnouncementFeedProps) {
  if (!announcements || announcements.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#0B1B3A]/10 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#0B1B3A]/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#0B1B3A]">
            Internal Dispatches & Notices
          </h3>
        </div>
        <span className="text-xs text-[#0B1B3A]/50">
          Showing {announcements.length} updates
        </span>
      </div>

      <div className="divide-y divide-[#0B1B3A]/5">
        {announcements.map((item, idx) => {
          const dateStr = item.date
            ? new Date(item.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Recent";

          const isUrgent = item.priority === "urgent";

          return (
            <div key={item._id?.toString() || idx} className="py-4 first:pt-1 last:pb-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isUrgent && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-3 h-3" />
                      Priority
                    </span>
                  )}
                  <h4 className="font-serif font-bold text-base text-[#0B1B3A]">
                    {item.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#0B1B3A]/50">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>{dateStr}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#0B1B3A]/70 leading-relaxed font-sans">
                {item.body}
              </p>

              {item.author && (
                <span className="text-[11px] text-[#C9A24B] font-semibold block pt-0.5">
                  — {item.author}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
