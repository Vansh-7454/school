export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & Events", href: "/news-events" },
  { label: "Contact", href: "/contact" },
];

export const portalNavItems: NavItem[] = [
  { label: "Student Portal", href: "/portal" },
  { label: "Faculty Hub", href: "/portal" },
  { label: "Parent Gateway", href: "/portal" },
];

export const footerQuickLinks: { title: string; links: NavItem[] }[] = [
  {
    title: "Discover",
    links: [
      { label: "About Aurelia", href: "/about" },
      { label: "Academic Curricula", href: "/academics" },
      { label: "Campus & Heritage", href: "/gallery" },
      { label: "Admissions Process", href: "/admissions" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "News & Events", href: "/news-events" },
      { label: "Parent & Student Portal", href: "/portal" },
      { label: "Staff Directory", href: "/about" },
      { label: "Alumni Network", href: "/about" },
    ],
  },
  {
    title: "Enquiries",
    links: [
      { label: "Book a Campus Tour", href: "/admissions" },
      { label: "Contact Admissions", href: "/contact" },
      { label: "Term Dates & Calendar", href: "/news-events" },
      { label: "Scholarships & Bursaries", href: "/admissions" },
    ],
  },
];
