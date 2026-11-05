# ISLAH Welfare Foundation — Design System, Identity & Spacing Guidelines

## 1. What We Are Building

**ISLAH (Integrated Social, Livelihood, Advancement & Humanitarian Action)** is the public operational identity of **Islah Welfare Foundation (IWF)**, a non-profit organisation dedicated to advancing the dignity, self-reliance, and resilience of rural and underserved communities across India.

The platform is an integrated, full-stack ecosystem consisting of:
1. **Public Web Application (`client`)**: Built on TanStack Start (SSR / React 19 / Vite / Tailwind CSS v4 / Radix UI / TanStack Router), delivering public programs, campaigns, donor/volunteer onboarding, community directories, patient emergency support, and transparency records.
2. **Content Management System (`cms`)**: Administrative portal for managing media assets, site configuration, applications, and public directories.
3. **API & Services Layer (`backend`)**: Express TypeScript service handling Turnstile bot protection, Cloudinary asset pipelines, and database models.

---

## 2. Understanding the "What We Do" Section & Architecture

In the ISLAH ecosystem, **"What We Do"** represents the overarching programmatic umbrella connecting immediate relief with long-term systemic empowerment. It is structured around **8 interconnected core sectors**:

1. **01. Education & Learning** (`/programs/education`): EPS Primary Schools, School Kits (SKLS), Community Learning Centres (CLC), Academic Talent Pathways (APTD/RATS), Higher Education Scholarships (SHE), Career Guidance (CGM), TVET, and Knowledge Research (KRP).
2. **02. Healthcare & Well-being** (`/programs/healthcare`): Critical Life & Emergency Support (CLES), Rural Ambulances, Medical Aid for the Poor (MAP), Health Check-up Camps, Diabetes & Cervical Cancer Screening, and Wellness Centres.
3. **03. Women & Youth Empowerment** (`/programs/women-empowerment`): Self-Help Groups (SHGs), Vocational Trades, Financial Literacy, Women's Rights, and Youth Leadership.
4. **04. Skills, Livelihoods & Entrepreneurship** (`/programs/skills-development`): Demand-driven Community Skill Centres (CSC), Micro-Enterprise incubation, and Rural Entrepreneurship.
5. **05. Social Justice & Legal Empowerment** (`/programs/social-justice`): Rights literacy, community legal aid, grievance redressal, and institutional access.
6. **06. Agriculture & Rural Livelihoods** (`/programs/agriculture`): Sustainable farming, farmer field training, soil health, and agrarian resilience.
7. **07. Environment & Sustainable Development** (`/programs/environment`): Tree plantation drives, Clean Green Villages, water conservation, and plastic-free communities.
8. **08. Humanitarian Relief & Rehabilitation** (`/programs/relief-and-rehabilitation`): Emergency disaster response, winter and seasonal relief, orphan/widow aid, and livelihood recovery.

### Key Implementation Locations
- **Homepage Grid**: `client/src/Pages/HomePage.tsx` & `client/src/components/home/WhatWeDo.tsx`
- **Global Header / Mega Menu**: `client/src/components/layout/SiteLayout.tsx`
- **Master Programs Hub**: `client/src/Pages/Programs/ProgramsMasterPage.tsx`
- **Overview & Identity Page**: `client/src/Pages/AboutPage/OverviewPage.tsx`

---

## 3. Brand Identity & Color Rules

The visual identity conveys **dignity, trust, compassion, and institutional credibility**. We avoid flashy neon tones or low-contrast washed-out text.

### Primary Palette

| Token / Variable | Hex / Value | Usage & Role |
| :--- | :--- | :--- |
| `--brand-green` | `#004724` | Primary brand green. Used for logos, primary accents, verification badges, icons, and CTAs. |
| `--brand-green-dark` | `#00381c` | Hover state for primary green buttons and dark header accents. |
| `--brand-green-darker` | `#002613` | Deep contrasting green for high-emphasis containers. |
| `--brand-orange` | `#f97316` | Energetic action orange. Used for eyebrow tags, highlight pill tags, progress indicators, and primary action buttons. |
| `--brand-orange-dark` | `#ea580c` | Hover state for orange CTAs and secondary urgency tags. |
| `Midnight Navy` | `#071527` / `#0b1f3b` | Universal hero background, footer headers, and major section titles (`text-[#0b1f3b]`). |

### Neutrals & Text Contrast Rules
- **Canvas Background**: `#ffffff` (Pure white) for primary reading sections.
- **Section Alternate Background**: `bg-slate-50` (`#f8fafc`) to provide visual separation between adjacent content blocks.
- **Body Text**: Must remain `#000000` (deep black) at `font-weight: 400` as strictly enforced in `client/src/styles.css`.
- **Border Lines**: Use subtle `border-slate-100` or `border-slate-200/80`. Avoid harsh dark gray borders.

### Sector Accent Badges & Cards
Each of the 8 sectors uses consistent pastel-tinted containers for icon backdrops and soft card outlines:
- **Education / Integrated**: `bg-blue-50 text-blue-600 border-blue-100/70`
- **Healthcare / Relief**: `bg-rose-50 text-rose-600 border-rose-100/70`
- **Women / Youth**: `bg-pink-50 text-pink-600 border-pink-100/70` or `bg-violet-50 text-violet-600`
- **Skills / Livelihood**: `bg-amber-50 text-amber-600 border-amber-100/70`
- **Agriculture**: `bg-emerald-50 text-emerald-600 border-emerald-100/70`
- **Environment**: `bg-teal-50 text-teal-600 border-teal-100/70`

---

## 4. Typography & Font System

### Font Families
- **Primary Typeface (`--font-sans`)**: `"Open Sans", ui-sans-serif, system-ui, sans-serif`
  - Clean, legible humanist sans-serif that renders crisply across mobile and desktop.
- **Emotional / Handwritten Accent**: `'Caveat', cursive`
  - Loaded via Google Fonts. Used strictly for quote accents, hand-drawn motivational badges ("Together We Can Do More"), and personal signatures. Never use for body copy.

### Scaling & Base Rules
- **Root Scale**: `html { font-size: 19px; }` (Configured in `client/src/styles.css`).
- **Standard Body Paragraph**:
  - Class: `.site-body-text` or default `<p>`
  - Size: `0.875rem` (~16.6px rendered)
  - Weight: `400` (Normal)
  - Line Height: `1.625` (`leading-relaxed`)
  - Bottom Margin: `margin-bottom: 0.75rem` (`mb-3`)

### Typographic Hierarchy Standard

```
Eyebrow / Tag:     text-xs font-bold uppercase tracking-widest text-[#f97316]
H1 (Page Hero):    text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white
H2 (Section):      text-2xl sm:text-3xl font-bold text-[#0b1f3b] tracking-tight
H3 (Card/Subhead): text-lg sm:text-xl font-bold text-[#0b1f3b]
H4 (Dense Item):   text-base font-bold text-[#0b1f3b]
Subtitle / Lead:   text-sm sm:text-base font-medium text-slate-700 leading-relaxed
Body Copy:         text-sm font-normal text-black leading-relaxed
Caption / Meta:    text-xs font-normal text-slate-500
```

---

## 5. Whitespace, Spacing & Layout Rhythm

Whitespace must feel intentional, balanced, and readable—avoiding both cramped information density and excessive blank gaps.

### 1. Global Container
Every major section must wrap its content inside the standard bounded container:
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### 2. Vertical Section Spacing
- **Landing / Home Core Sections**: `py-12` (mobile) to `py-16` (desktop).
- **Dense or Feature Rows (e.g. Stat Bars, Tickers)**: `py-8`.
- **Subpage Main Layout**: Standardized to `py-8` to `py-12` (subpages should never use `py-24` or `py-20`, as enforced in subpage overrides in `styles.css`).

### 3. Vertical Section Rhythm (Background Alternation)
Instead of relying on large empty vertical gaps to separate sections, use **tonal rhythm**:
1. Hero: `bg-[#071527]` (Dark Navy)
2. Immediate Section: `bg-white`
3. Following Section: `bg-slate-50` with subtle `border-b border-slate-100`
4. Next Section: `bg-white`

### 4. Section Headers & Margins
- **Eyebrow to Title**: `mb-1.5`
- **Title to Subtitle**: `mt-2` to `mt-3`
- **Section Header to Content Grid**: `mb-6` to `mb-8` (never `mb-16`, which disconnects headings from cards).

### 5. Grids, Cards & Gutters
- **Dense Cards (e.g. 4-column What We Do items)**: `gap-4` or `gap-5`. Card padding: `p-4 sm:p-5`.
- **Content Cards (e.g. 3-column Initiatives)**: `gap-6`. Card padding: `p-6`.
- **2-Column Split Layouts (Text + Media/Video)**: `gap-8 lg:gap-12`.

---

## 6. Component Consistency Rules

1. **Heroes**:
   - Universal subpages use `StandardPageHero` or `SubpageHeroCarousel`.
   - Standard hero height: `min-h-[280px] sm:min-h-[300px] md:min-h-[320px] lg:min-h-[340px]`.
   - Always include breadcrumbs with a Home link icon (`Home` Lucide icon) in `text-brand-orange`.
2. **Buttons & CTAs**:
   - Primary: `bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-xs sm:text-sm uppercase tracking-wider`
   - Secondary / Ghost: `bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm`
   - Green Action: `bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs`
3. **Card Interactivity**:
   - Apply the universal hover pattern: `transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-slate-300`.

