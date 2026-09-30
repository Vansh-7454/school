export interface SchoolContact {
  phone: string;
  admissionsPhone: string;
  email: string;
  admissionsEmail: string;
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
    full: string;
  };
  officeHours: string;
}

export interface SchoolInfo {
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  founded: number;
  contact: SchoolContact;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  socials: {
    platform: string;
    url: string;
  }[];
}

export const schoolInfo: SchoolInfo = {
  name: "Aurelia International School",
  shortName: "Aurelia",
  tagline: "Nurturing Minds, Inspiring Excellence, Shaping Tomorrow",
  mission:
    "Empowering global citizens through academic rigour, artistic distinction, and compassionate leadership across our world-class campus.",
  founded: 1958,
  contact: {
    phone: "+44 (0) 20 7946 0891",
    admissionsPhone: "+44 (0) 20 7946 0892",
    email: "info@aureliaschool.org",
    admissionsEmail: "admissions@aureliaschool.org",
    address: {
      street: "42 Crestview Boulevard, Kensington",
      city: "London",
      postcode: "W8 4QN",
      country: "United Kingdom",
      full: "42 Crestview Boulevard, Kensington, London W8 4QN, United Kingdom",
    },
    officeHours: "Monday – Friday: 08:00 – 17:30 BST",
  },
  stats: [
    {
      value: "45 Acres",
      label: "Heritage Campus",
      description: "Historic grounds with state-of-the-art innovation labs",
    },
    {
      value: "100%",
      label: "University Acceptance",
      description: "Graduates at Oxford, Cambridge, Ivy League & global leaders",
    },
    {
      value: "68",
      label: "Nationalities",
      description: "A rich, vibrant, multilingual international community",
    },
    {
      value: "1 : 7",
      label: "Faculty Ratio",
      description: "Personalised mentoring and world-class pastoral care",
    },
  ],
  socials: [
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "YouTube", url: "https://youtube.com" },
    { platform: "X", url: "https://x.com" },
  ],
};
