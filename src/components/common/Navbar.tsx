"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, Menu, X, ChevronDown, Sparkles, Heart } from "lucide-react";
import { ART_ITEMS } from "@/services/mockData";
import { ArtItem } from "@/types";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ArtItem[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { itemCount, setIsCartOpen, likedIds, openQuickView } = useCart();
  const pathname = usePathname();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for navbar background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Instant live search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase().trim();
    const matches = ART_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.creator.name.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4);
    setSearchResults(matches);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0D13]/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-3"
          : "bg-[#0B0D13]/60 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple via-brand-indigo to-brand-cyan p-0.5 shadow-glow transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0B0D13] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white flex items-center">
              Novu<span className="text-gradient-purple">Sphere</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">
              Creative Assets
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            const hasSubmenu = Boolean(link.submenu && link.submenu.length > 0);

            return (
              <div key={link.path} className="relative group">
                <Link
                  href={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "text-white bg-white/10 shadow-sm"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.title}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {hasSubmenu && (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {hasSubmenu && link.submenu && (
                  <div className="absolute left-0 mt-1 w-64 p-2 bg-[#141722] border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className="flex flex-col p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item"
                      >
                        <span className="text-xs font-semibold text-white group-hover/item:text-brand-cyan transition-colors">
                          {sub.title}
                        </span>
                        {sub.description && (
                          <span className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                            {sub.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Live Search & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Search Input with dropdown */}
          <div ref={searchContainerRef} className="relative hidden md:block w-48 lg:w-64">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search art, 3D, creators..."
                className="w-full bg-white/[0.06] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-purple/50 focus:bg-white/[0.09] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Dropdown Results */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 p-2 bg-[#141722] border border-white/10 rounded-2xl shadow-2xl z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Matching Artworks
                </div>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      openQuickView(item);
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 text-left transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 border border-white/10"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white truncate">{item.title}</div>
                      <div className="text-[11px] text-gray-400">{item.creator.name}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 shrink-0">
                      {item.priceTk} TK
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favorites Counter Pill */}
          <Link
            href="/#discover"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/5 text-gray-300 hover:text-rose-400 hover:border-rose-500/20 text-xs font-medium transition-all"
            title="Saved Favorites"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/20" />
            <span>{likedIds.length}</span>
          </Link>

          {/* Bag / Cart Toggle */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white transition-colors"
            aria-label="Open collection bag"
          >
            <ShoppingBag className="w-4 h-4 text-brand-cyan" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-brand-purple to-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow-glow">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0F1118]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  pathname === link.path ? "text-white bg-white/10" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <span>{link.title}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span>Collected Items: {itemCount}</span>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="text-brand-cyan font-semibold hover:underline"
            >
              Open Bag →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
