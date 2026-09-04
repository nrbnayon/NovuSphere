export type ProductCategory = 
  | "All Categories" 
  | "3D & Cyberpunk" 
  | "Generative AI" 
  | "Abstract & Fluid" 
  | "Photography" 
  | "Futuristic UI";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  followersCount: number;
  artworksCount: number;
  bannerImage?: string;
}

export interface ArtItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceTk: number;
  priceEth: number;
  priceUsd: number;
  category: ProductCategory;
  imageUrl: string;
  creator: Creator;
  likes: number;
  edition: {
    current: number;
    total: number;
  };
  dominantColor: string;
  accentColor: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  createdAt: string;
}

export interface DropEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  creator: Creator;
  startsAt: string; // ISO string
  endsAt: string;   // ISO string
  startingBidTk: number;
  currentBidTk: number;
  totalBids: number;
  isLive: boolean;
  rarity: "Legendary" | "Epic" | "Rare";
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  publishedAt: string;
  category: string;
  tags: string[];
}

export interface CartItem {
  art: ArtItem;
  addedAt: number;
}

export type ToastType = "success" | "info" | "warning";

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: ToastType;
}
