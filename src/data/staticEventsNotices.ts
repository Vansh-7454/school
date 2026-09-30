export interface SampleEvent {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  time?: string;
  category?: string;
}

export interface SampleNotice {
  _id?: string;
  title: string;
  body: string;
  date: Date;
  category: string;
  isImportant?: boolean;
}

export const fallbackEvents: SampleEvent[] = [
  {
    _id: "evt-1",
    title: "Autumn Open Morning & Campus Experience",
    description: "Prospective families are invited to tour our 45-acre historic grounds, meet leadership, and explore modern STEM pavilions.",
    date: new Date("2026-10-14T09:30:00Z"),
    location: "Main Quadrangle & Great Hall",
    time: "09:30 AM – 12:30 PM",
    category: "Admissions",
  },
  {
    _id: "evt-2",
    title: "International Cultural & Culinary Heritage Gala",
    description: "A celebration of 68 represented nationalities featuring culinary tastings, student pavilions, and world folk music ensembles.",
    date: new Date("2026-11-02T16:00:00Z"),
    location: "Founders Pavilion & Lawn",
    time: "04:00 PM – 08:30 PM",
    category: "Community",
  },
  {
    _id: "evt-3",
    title: "Symposium on Ethics, Artificial Intelligence & Tomorrow",
    description: "Keynote addresses from Oxford fellows and AI researchers followed by senior student panel debates.",
    date: new Date("2026-11-18T14:00:00Z"),
    location: "Cavendish Auditorium",
    time: "02:00 PM – 05:30 PM",
    category: "Academics",
  },
];

export const fallbackNotices: SampleNotice[] = [
  {
    _id: "not-1",
    title: "2026 Cambridge IGCSE & IB Diploma Results Recognition",
    body: "98% of our graduating cohort received scores placing them in the global 90th percentile.",
    date: new Date("2026-10-05"),
    category: "Academics",
    isImportant: true,
  },
  {
    _id: "not-2",
    title: "Michaelmas Term Parent-Teacher Dialogue Registration",
    body: "Online booking is now open on the school portal for one-on-one academic consultations.",
    date: new Date("2026-10-12"),
    category: "General",
    isImportant: false,
  },
  {
    _id: "not-3",
    title: "Aurelia Model United Nations 2026 Delegation Selection",
    body: "Applications open for secondary students wishing to represent Aurelia at The Hague MUN.",
    date: new Date("2026-10-18"),
    category: "Leadership",
    isImportant: false,
  },
  {
    _id: "not-4",
    title: "Lord Mountbatten Aquatic Centre Reopening Gala",
    body: "Olympic pool upgrades are complete. Family and alumni attendance welcome this Friday.",
    date: new Date("2026-10-24"),
    category: "Sports",
    isImportant: false,
  },
];
