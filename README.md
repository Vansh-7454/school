# Aurelia International School — Digital Campus & Academic Portal

A premier digital web experience and institutional portal for **Aurelia International School**, an independent British & International Baccalaureate (IB) World School in London (Ages 3–18).

Built with modern web standards, an editorial luxury aesthetic (Deep Navy `#0B1B3A`, Warm Cream `#FDFBF7`, Burnished Gold `#C9A24B`), and defense-in-depth role-based access control.

---

## 🏛️ Technology Stack

- **Framework**: Next.js 15 (App Router, Server Actions, React 19)
- **Styling**: Tailwind CSS v4 with bespoke editorial tokens and typography
- **Typography**: Cormorant Garamond (Editorial Serif), Inter (Clean Sans-Serif)
- **Database**: MongoDB with Mongoose ODM (gracefully falls back to rich static dataset if offline)
- **Authentication**: Auth.js v5 (NextAuth) with JWT session strategy, bcryptjs password hashing
- **Animation & Motion**: Framer Motion, GSAP ScrollTrigger, Lenis Smooth Scroll, with strict `prefers-reduced-motion` compliance
- **Form & Data Validation**: Zod with in-memory brute-force rate limiting
- **Icons**: Lucide React
- **SEO & Metadata**: Dynamic Open Graph images via `next/og`, sitemap.xml, robots.txt, and JSON-LD schemas (`EducationalOrganization`, `Event`, `Article`)

---

## 📁 Folder Structure

```
school/
├── public/                     # Static media, hero cinematic loop, posters
│   └── hero/                   # High-efficiency day-cycle videos & poster fallbacks
├── src/
│   ├── app/                    # Next.js App Router routes & endpoints
│   │   ├── (public)/           # Public institutional pages
│   │   │   ├── about/          # Heritage, governance, vision, campus history
│   │   │   ├── academics/      # Dual-curriculum (IGCSE & IB Diploma), faculty
│   │   │   ├── admissions/     # Entry criteria, fee schedules, enquiry submission
│   │   │   ├── contact/        # Secretariat desk, transit directions, contact form
│   │   │   ├── gallery/        # High-definition visual archive & masonry lightbox
│   │   │   └── news-events/    # Campus news articles, event detail pages & calendar
│   │   ├── portal/             # Protected collegiate intranet
│   │   │   ├── student/        # Assignments, timetable, grade ledger
│   │   │   ├── teacher/        # Class roster, grade submission, faculty schedule
│   │   │   └── parent/         # Academic reports, attendance, fee settlements
│   │   ├── login/              # Unified gateway sign-in
│   │   ├── actions/            # Server actions with Zod validation & rate limits
│   │   ├── api/                # Next.js API route handlers
│   │   ├── error.tsx           # Global client error boundary
│   │   ├── global-error.tsx    # Root layout fallback boundary
│   │   ├── not-found.tsx       # Custom 404 with animated school silhouette
│   │   ├── opengraph-image.tsx # Dynamic next/og social share card
│   │   ├── icon.tsx            # Dynamic 32x32 crest favicon
│   │   ├── apple-icon.tsx      # Dynamic 180x180 Apple touch icon
│   │   ├── sitemap.ts          # Automated XML sitemap generation
│   │   └── robots.ts           # Web crawler indexing policies
│   ├── components/             # Reusable UI & section components
│   │   ├── hero/               # Full-bleed cinematic hero background
│   │   ├── layout/             # Navbar, Footer, SmoothScrollProvider
│   │   ├── portal/             # Sidebar, Header, Stat cards, Feed widgets
│   │   ├── sections/           # Section modules for each public page
│   │   └── ui/                 # Logo, Toast, PageTransition, FirstLoadIntro
│   ├── data/                   # Navigation links, campus directory, school info
│   ├── lib/                    # Auth configuration, DB connections, Zod schemas
│   └── models/                 # Mongoose schemas (User, Event, Article, etc.)
└── scripts/
    └── seed.ts                 # Database seeding script for demo accounts & content
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
- Node.js 18.18+ or 20+
- MongoDB (local or MongoDB Atlas connection string). *Note: The application includes full static fallback data if a database connection is not active.*

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your environment settings:
```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/aurelia_school

# Auth.js / NextAuth Secret (generate with `openssl rand -base64 32`)
AUTH_SECRET=aurelia_international_school_super_secret_key_2026_demo

# Canonical App URL
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Seed the Database
Populate demo users, academic records, news stories, events, and gallery items:
```bash
npm run seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 6. Production Build
```bash
npm run build
npm run start
```

---

## 🔐 Demo Credentials

The seeded database includes accounts for all three school roles:

| Role | Name | Email | Password | Allowed Portal Path |
|---|---|---|---|---|
| **Student** | Eleanor Vance (Year 12) | `eleanor.vance@student.aureliaschool.org` | `Password123!` | `/portal/student/*` |
| **Teacher** | Dr. Alistair Sterling (Head of Maths) | `a.sterling@faculty.aureliaschool.org` | `Password123!` | `/portal/teacher/*` |
| **Parent** | Claire Montgomery (Guardian) | `claire.montgomery@parent.aureliaschool.org` | `Password123!` | `/portal/parent/*` |

---

## 🧭 Routes & Access Policies

| Route | Type | Description | Access Rules |
|---|---|---|---|
| `/` | Public | Homepage (Hero, About snippet, Stats, Programs, Timeline, Testimonials, CTA) | Open to all |
| `/about` | Public | Heritage, Mission & Values, Leadership, Timeline | Open to all |
| `/academics` | Public | Dual-pathway curriculum (IGCSE & IB), Research labs, Arts | Open to all |
| `/admissions` | Public | Application procedures, Grade criteria, Fees, Enquiry form | Open to all |
| `/gallery` | Public | Visual archives with categorized masonry grid and lightbox | Open to all |
| `/news-events` | Public | Calendar, Gazette journalism, Administrative notices | Open to all |
| `/news-events/news/[slug]` | Public (Dynamic) | Full article reading view with social share & reading progress | Open to all |
| `/news-events/events/[slug]` | Public (Dynamic) | Event details, venue map, "Add to Calendar" (.ics export) | Open to all |
| `/contact` | Public | Secretariat contact, transit routes, enquiry dispatch | Open to all |
| `/login` | Public (Guest) | Split branded sign-in screen with role switcher tabs | Redirects to portal if already authenticated |
| `/portal` | Protected | Default portal landing router | Redirects to role-specific dashboard |
| `/portal/student` | Protected | Student dashboard, grade summary, schedule overview | `student` role only |
| `/portal/student/assignments`| Protected | Coursework submissions and upcoming deadlines | `student` role only |
| `/portal/student/results` | Protected | Official IB/IGCSE term report cards and grade trends | `student` role only |
| `/portal/student/timetable` | Protected | Weekly period timetable with room locations | `student` role only |
| `/portal/teacher` | Protected | Faculty hub, class list, quick grading widgets | `teacher` role only |
| `/portal/teacher/classes` | Protected | Roster management and student performance entries | `teacher` role only |
| `/portal/teacher/schedule` | Protected | Faculty lesson timetable and office hours | `teacher` role only |
| `/portal/parent` | Protected | Parent gateway, child overview, attendance, balance | `parent` role only |
| `/portal/parent/child` | Protected | Detailed child academic and pastoral progress | `parent` role only |
| `/portal/parent/fees-and-notices` | Protected | Fee invoice settlements and parental circulars | `parent` role only |
| `/portal/unauthorized` | Protected | Friendly role privilege notice screen | Authenticated users lacking role privilege |

---

## 🛡️ Security & Performance Highlights

1. **Security Headers**: Configured in `next.config.ts` (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).
2. **Input Validation**: All server actions utilize Zod schemas with sanitization and length bounds.
3. **Defense in Depth**: Route protection enforced at both the Edge middleware (`src/middleware.ts`) and within Server Components (`requireRole`).
4. **Rate Limiting**: In-memory rate limiting shields authentication and form dispatch endpoints.
5. **Zero Layout Shifts**: Navbar height dynamically matched, responsive media uses Next.js Image with reserved aspect ratios, and fonts use `display: swap`.
6. **Accessibility (WCAG AA)**: Skip-to-content links, gold `:focus-visible` rings on all interactive elements, `aria-live` polite regions for toasts and notifications, and full keyboard navigation.
