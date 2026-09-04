import { ProductCategory } from "@/types";

export interface NavLink {
  title: string;
  path: string;
  badge?: string;
  submenu?: { title: string; path: string; description?: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { 
    title: "Explore", 
    path: "/#discover",
    submenu: [
      { title: "Trending Assets", path: "/#discover", description: "Top-rated digital art this week" },
      { title: "3D & Cyberpunk", path: "/?cat=3d#discover", description: "Immersive renders & shaders" },
      { title: "Abstract & Fluid", path: "/?cat=abstract#discover", description: "Modern generative aesthetics" },
      { title: "Generative AI", path: "/?cat=ai#discover", description: "Neural synth algorithms" },
      { title: "Curated Collections", path: "/#collections", description: "Hand-picked studio anthologies" },
    ]
  },
  { 
    title: "Drops & Events", 
    path: "/event",
    badge: "Live"
  },
  { 
    title: "Spotlight", 
    path: "/#creators",
    submenu: [
      { title: "Verified Artists", path: "/#creators", description: "Top creators of the month" },
      { title: "3D Showcase", path: "/#showcase", description: "Interactive card deck experience" },
    ]
  },
  { 
    title: "Journal", 
    path: "/blog" 
  },
  { 
    title: "Apply as Creator", 
    path: "/contact" 
  },
];

export const CATEGORIES: ProductCategory[] = [
  "All Categories",
  "3D & Cyberpunk",
  "Generative AI",
  "Abstract & Fluid",
  "Photography",
  "Futuristic UI",
];

export const PALETTE_FILTERS = [
  { id: "emerald", name: "Cyber Emerald", hex: "#10B981", bgGradient: "from-emerald-950 via-gray-900 to-slate-950" },
  { id: "violet", name: "Neon Violet", hex: "#8B5CF6", bgGradient: "from-purple-950 via-gray-900 to-slate-950" },
  { id: "cyan", name: "Electric Cyan", hex: "#06B6D4", bgGradient: "from-cyan-950 via-gray-900 to-slate-950" },
  { id: "rose", name: "Crimson Blaze", hex: "#F43F5E", bgGradient: "from-rose-950 via-gray-900 to-slate-950" },
  { id: "amber", name: "Solar Gold", hex: "#F59E0B", bgGradient: "from-amber-950 via-gray-900 to-slate-950" },
  { id: "indigo", name: "Deep Indigo", hex: "#6366F1", bgGradient: "from-indigo-950 via-gray-900 to-slate-950" },
];
