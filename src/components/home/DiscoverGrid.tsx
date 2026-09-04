"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/constants/navigation";
import { ART_ITEMS } from "@/services/mockData";
import { ProductCategory } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatTk } from "@/utils/formatters";
import { Search, Heart, ShoppingBag, Eye, Sparkles, SlidersHorizontal } from "lucide-react";

// Helper to resolve URL alias (e.g. "3d", "abstract", "ai") to ProductCategory
function resolveCategoryParam(param: string | null): ProductCategory | null {
  if (!param) return null;
  const normalized = param.toLowerCase().trim();

  if (normalized === "3d" || normalized === "cyberpunk" || normalized.includes("3d")) {
    return "3D & Cyberpunk";
  }
  if (normalized === "ai" || normalized === "generative" || normalized.includes("ai")) {
    return "Generative AI";
  }
  if (normalized === "abstract" || normalized === "fluid" || normalized.includes("abstract")) {
    return "Abstract & Fluid";
  }
  if (normalized === "photography" || normalized === "photo") {
    return "Photography";
  }
  if (normalized === "ui" || normalized === "futuristic" || normalized.includes("ui")) {
    return "Futuristic UI";
  }
  if (normalized === "all" || normalized === "all categories") {
    return "All Categories";
  }

  const exactMatch = CATEGORIES.find((c) => c.toLowerCase() === normalized);
  return exactMatch || null;
}

function DiscoverContent() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "newest">("popular");
  const { openQuickView, addToCart, toggleLike, isLiked } = useCart();
  const searchParams = useSearchParams();

  // Sync category from searchParams and hash
  const syncCategoryFromUrl = useCallback(() => {
    // 1. Check standard search params (?cat=...)
    const queryCat = searchParams.get("cat");
    let resolved = resolveCategoryParam(queryCat);

    // 2. Fallback: Parse non-standard hash query like /#discover?cat=3d
    if (!resolved && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("?")) {
        const hashQueryPart = hash.split("?")[1];
        const hashParams = new URLSearchParams(hashQueryPart);
        const hashCat = hashParams.get("cat");
        resolved = resolveCategoryParam(hashCat);
      }
    }

    if (resolved) {
      setSelectedCategory(resolved);
      // Smoothly scroll to discover section
      const el = document.getElementById("discover");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    syncCategoryFromUrl();

    // Listen for hash changes
    window.addEventListener("hashchange", syncCategoryFromUrl);
    return () => window.removeEventListener("hashchange", syncCategoryFromUrl);
  }, [syncCategoryFromUrl]);

  // Filter and sort items dynamically
  const filteredItems = useMemo(() => {
    let items = [...ART_ITEMS];

    // Filter by Category
    if (selectedCategory !== "All Categories") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.creator.name.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sort items
    switch (sortBy) {
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

    return items;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="discover" className="py-24 bg-[#0A0C12] relative min-h-screen border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asset Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Discover More <br />
              <span className="text-gradient">Curated Digital Creations</span>
            </h2>
          </div>

          <p className="text-sm text-gray-400 max-w-md">
            Filter through hundreds of audited spatial art files, generative shaders, and certified limited editions.
          </p>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="bg-[#12151E] p-4 rounded-2xl border border-white/10 shadow-lg mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-brand-purple to-indigo-600 text-white shadow-glow"
                      : "bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
              <div className="relative flex-1 lg:w-56">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-cyan/50"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="Sort artworks"
                  className="bg-white/5 border border-white/10 rounded-full px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-purple/50 cursor-pointer appearance-none pr-8"
                >
                  <option value="popular" className="bg-[#12151E] text-white">Most Popular</option>
                  <option value="price-asc" className="bg-[#12151E] text-white">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#12151E] text-white">Price: High to Low</option>
                  <option value="newest" className="bg-[#12151E] text-white">Newest First</option>
                </select>
                <SlidersHorizontal className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Artworks Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#12151E]/50 rounded-3xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-2">No artworks found</h3>
            <p className="text-xs text-gray-400 mb-6 max-w-sm mx-auto">
              We couldn&apos;t find any creations matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-purple-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const liked = isLiked(item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-[#131622] rounded-2xl border border-white/10 overflow-hidden shadow-card hover:border-brand-purple/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  {/* Image Showcase Container */}
                  <div
                    onClick={() => openQuickView(item)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#131622] via-transparent to-transparent opacity-60" />

                    {/* Like Button on card image */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        liked
                          ? "bg-rose-500 text-white shadow-lg scale-110"
                          : "bg-black/50 text-gray-300 hover:text-white hover:bg-black/80"
                      }`}
                      aria-label={liked ? "Unlike artwork" : "Like artwork"}
                    >
                      <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                    </button>

                    {/* Category pill */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-gray-300 border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Content Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Creator badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20">
                          <Image
                            src={item.creator.avatar}
                            alt={item.creator.name}
                            fill
                            className="object-cover"
                            sizes="20px"
                          />
                        </div>
                        <span className="text-xs text-gray-400 font-medium truncate">
                          {item.creator.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => openQuickView(item)}
                        className="text-base font-bold text-white hover:text-brand-cyan transition-colors cursor-pointer truncate"
                      >
                        {item.title}
                      </h3>

                      <div className="flex justify-between items-center text-xs mt-2">
                        <span className="font-extrabold text-emerald-400 text-sm">
                          {formatTk(item.priceTk)}
                        </span>
                        <span className="text-gray-400 text-[11px]">
                          Edition #{item.edition.current} of {item.edition.total}
                        </span>
                      </div>
                    </div>

                    {/* Functional Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => openQuickView(item)}
                        className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                        <span>Quick View</span>
                      </button>

                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Collect</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default function DiscoverGrid() {
  return (
    <Suspense fallback={<div className="py-24 bg-[#0A0C12] text-center text-gray-400 text-xs">Loading marketplace...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
