import { ART_ITEMS, CREATORS, DROP_EVENTS, BLOG_POSTS } from "./mockData";
import { ArtItem, Creator, DropEvent, BlogPost, ProductCategory } from "@/types";

export interface GetArtItemsParams {
  query?: string;
  category?: ProductCategory | string;
  sortBy?: "popular" | "price-asc" | "price-desc" | "newest";
  colorHex?: string;
}

export async function getArtItems(params: GetArtItemsParams = {}): Promise<ArtItem[]> {
  // Simulate network roundtrip latency for realistic async behavior
  await new Promise((resolve) => setTimeout(resolve, 150));

  let items = [...ART_ITEMS];

  if (params.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.creator.name.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (params.category && params.category !== "All Categories") {
    items = items.filter((item) => item.category === params.category);
  }

  if (params.sortBy) {
    switch (params.sortBy) {
      case "popular":
        items.sort((a, b) => b.likes - a.likes);
        break;
      case "price-asc":
        items.sort((a, b) => a.priceTk - b.priceTk);
        break;
      case "price-desc":
        items.sort((a, b) => b.priceTk - a.priceTk);
        break;
      case "newest":
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  return items;
}

export async function getArtItemById(id: string): Promise<ArtItem | null> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return ART_ITEMS.find((item) => item.id === id) || null;
}

export async function getCreators(): Promise<Creator[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...CREATORS];
}

export async function getDropEvents(): Promise<DropEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...DROP_EVENTS];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...BLOG_POSTS];
}
