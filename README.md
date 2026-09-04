# NovuSphere — Next-Gen Digital Arts & Creative Assets Hub

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **NovuSphere** is an avant-garde digital arts showcase and creative assets hub engineered for visionary collectors, 3D sculptors, and spatial computing creators. Built with **Next.js 14 App Router**, **Strict TypeScript**, and **Tailwind CSS**, this application demonstrates senior-level frontend engineering, complex 3D CSS perspective animations, real-time client state management, and responsive glassmorphic design.

---

## 🌟 Key Highlights & Feature Matrix

### 🎨 1. Dynamic 3D Interactivity & Design Systems
- **3D Perspective Card Deck**: Interactive stacked card carousel with mathematical 3D perspective transforms (`translate3d`, `rotate`, `scale`). Clicking the deck or rotation controls smoothly cycles cards with live metadata and acquisition buttons.
- **Panoramic 3D Overview Carousel**: Curated spotlight slider featuring automated 3.5s slide advancement, pause-on-hover interaction, and quick-preview inspection.
- **Chromatic Filtration Engine**: Multi-harmony palette switcher (*Cyber Emerald*, *Neon Violet*, *Electric Cyan*, *Crimson Blaze*, *Solar Gold*); selecting color swatches dynamically re-themes ambient lighting and filters matching artworks.
- **Signature Curved Architecture**: Precision SVG curved viewport frames elevated with radial gradient blurs and deep obsidian contrast (`#0B0D13`).

### ⚡ 2. Real-time Asset Discovery & Marketplace
- **Category Filter Chips**: Filter seamlessly between *All Categories*, *3D & Cyberpunk*, *Generative AI*, *Abstract & Fluid*, *Photography*, and *Futuristic UI*.
- **Deep-Link URL Routing**: Supports query parameter routing (`/?cat=3d#discover` and `/#discover?cat=3d`) with automatic category sync and smooth auto-scroll.
- **Instant Search & Autocomplete**: Real-time debounce search query across artwork titles, creator handles, and tags.
- **Dynamic Sorting**: Instant sorting by *Most Popular*, *Price: Low to High*, *Price: High to Low*, and *Newest First*.
- **Tactile Micro-Interactions**: Reactive heart button with like-counter increment, custom hover states, and smooth elevation shadows.

### 🛍️ 3. State Management & Overlay Portals
- **Collected Assets Drawer (`CartDrawer`)**: Full slide-over bag calculating live subtotal in Bangladeshi Taka (**TK**), quantity counters, item removal, and simulated checkout flow with persistent `localStorage` synchronization.
- **Quick View Modal (`QuickViewModal`)**: High-resolution lightbox dialog displaying detailed specs, creator verification badges, edition numbers (`Edition 1 of 25`), and instant acquisition controls.
- **Deduplicated Toast Notifications (`ToastProvider`)**: Non-intrusive animated feedback for user actions (*"Added to Collection"*, *"Saved to Favorites"*, *"Bid Submitted"*), hardened with millisecond deduplication against double-firing in React StrictMode.

### 🏆 4. Multi-Page Experience
- **Home (`/`)**: Comprehensive showcase combining the Hero, 3D Panoramic Carousel, 3D Stacked Deck, Chromatic Engine, Discover Gallery, and Creator Spotlight.
- **Drops & Live Auctions (`/event`)**: Real-time countdown clocks, live bid activity trackers, and interactive +250 TK on-chain bidding simulations.
- **NovuSphere Journal (`/blog`)**: Deep-dive essays on WebGPU, generative shaders, and color theory, with tag search and reading time estimates.
- **Creator Onboarding & Contact (`/contact`)**: Validated creator application dossier with error handling, success states, and an interactive FAQ accordion.
- **Custom System Pages**: Dynamic `loading.tsx` skeleton, `error.tsx` boundary, and a custom `not-found.tsx` 404 screen.

---

## 🏗️ Project Architecture & Folder Structure

```
src/
├── app/                          # Next.js 14 App Router Pages
│   ├── layout.tsx                # Root layout, Google Fonts (Inter), SEO Metadata
│   ├── page.tsx                  # Home showcase assembly
│   ├── loading.tsx               # Global loading skeleton
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   ├── event/
│   │   └── page.tsx              # Drops & live auction floor
│   ├── blog/
│   │   └── page.tsx              # NovuSphere Journal & articles
│   ├── contact/
│   │   └── page.tsx              # Creator application & inquiry form
│   └── globals.css               # Design tokens, custom scrollbars, animations
├── components/
│   ├── common/                   # Reusable global components
│   │   ├── Navbar.tsx            # Sticky navigation with live search dropdown
│   │   ├── Footer.tsx            # Comprehensive footer with newsletter signup
│   │   ├── CartDrawer.tsx        # Slide-over collection drawer & checkout
│   │   ├── QuickViewModal.tsx    # Detailed artwork inspect modal
│   │   └── Toast.tsx             # Animated alert toasts
│   └── home/                     # Showcase section modules
│       ├── HeroSection.tsx       # Dynamic hero with 3D cards & platform stats
│       ├── Card3DDeck.tsx        # Interactive 3D stacked deck
│       ├── OverviewCarousel.tsx  # 3D panoramic auto-changing carousel
│       ├── ColorSpectrum.tsx     # Chromatic palette filtration engine
│       ├── DiscoverGrid.tsx      # Filterable, sortable asset gallery
│       ├── CreatorSpotlight.tsx  # Verified artist network & follow actions
│       └── NewsletterCta.tsx     # VIP early-access drop form
├── constants/
│   └── navigation.ts             # Route definitions, categories, palette filters
├── context/
│   ├── CartContext.tsx           # Cart & Favorites state with localStorage sync
│   └── ToastContext.tsx          # Toast notification dispatch with deduplication
├── providers/
│   └── AppProviders.tsx          # Unified Client Component provider boundary
├── services/
│   ├── api.ts                    # Mock API layer with latency simulation
│   └── mockData.ts               # Curated digital art & verified creator profiles
├── types/
│   ├── index.ts                  # 100% strict TypeScript types & interfaces
│   └── global.d.ts               # Global declarations (CSS modules)
└── utils/
    ├── formatters.ts             # TK currency, numbers, and countdown timer logic
    └── cn.ts                     # Tailwind class name utility
```

---

## 💻 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14** | App Router, Server Components, Static Prerendering |
| **TypeScript 5** | Strict type safety, zero `any`, interface-driven architecture |
| **Tailwind CSS 3** | Utility-first styling, custom keyframe animations, glow shadows |
| **DaisyUI** | Accessible UI utility plugins |
| **Lucide React** | Consistent, modern vector iconography |
| **Google Fonts** | Inter font optimization via `next/font/google` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.17 or later recommended)
- npm, pnpm, or yarn

### 1. Clone & Install
```bash
git clone https://github.com/nrbnayon/Innovate-Next.git
cd Innovate-Next
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port displayed in your terminal) in your browser.

### 3. Verify TypeScript Compilation
```bash
npx tsc --noEmit
```

### 4. Build for Production
```bash
npm run build
```

---

## 🛡️ Engineering & Quality Standards

- **Strict Type Safety**: All data structures (`ArtItem`, `Creator`, `DropEvent`, `BlogPost`, `CartItem`) are strictly typed with zero use of `any`.
- **Hydration Safe**: Providers are isolated in `AppProviders.tsx` with resilient default fallbacks to prevent runtime hydration mismatches.
- **Performance Optimized**: Static generation for all 8 core routes, optimized remote image patterns (Unsplash, DiceBear, RandomUser), and responsive asset delivery.
- **Accessibility (a11y)**: Proper semantic HTML tags, keyboard accessible controls, and aria labels on interactive action buttons.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Developed with precision for portfolio showcase by **Nayon**.
