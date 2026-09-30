"use client";

import React, { useState } from "react";
import { CalendarPlus, Check } from "lucide-react";

interface AddToCalendarProps {
  title: string;
  description: string;
  location: string;
  startDate: string | Date;
  time?: string;
}

export function AddToCalendarButton({
  title,
  description,
  location,
  startDate,
  time,
}: AddToCalendarProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadIcs = () => {
    const d = new Date(startDate);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");

    const dateFormatted = `${year}${month}${day}T090000Z`;
    const endDateFormatted = `${year}${month}${day}T120000Z`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Aurelia International School//Event Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@aureliaschool.org`,
      `DTSTAMP:${dateFormatted}`,
      `DTSTART:${dateFormatted}`,
      `DTEND:${endDateFormatted}`,
      `SUMMARY:${title.replace(/,/g, "\\,")}`,
      `DESCRIPTION:${(description + (time ? ` (Time: ${time})` : "")).replace(/\n/g, "\\n")}`,
      `LOCATION:${location.replace(/,/g, "\\,")}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <button
      type="button"
      onClick={handleDownloadIcs}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer ${
        downloaded
          ? "bg-emerald-600 text-white"
          : "bg-[#0B1B3A] text-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#0B1B3A] border border-[#C9A24B]/30"
      }`}
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Added to Calendar</span>
        </>
      ) : (
        <>
          <CalendarPlus className="w-4 h-4" />
          <span>Add to Calendar (.ics)</span>
        </>
      )}
    </button>
  );
}
