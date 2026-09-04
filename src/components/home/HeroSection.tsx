"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Flame, Compass } from "lucide-react";
import { ART_ITEMS } from "@/services/mockData";
import { useCart } from "@/context/CartContext";

export default function HeroSection() {
  const [activeBox, setActiveBox] = useState<number>(0);
  const { openQuickView } = useCart();
  const showcaseItems = ART_ITEMS.slice(0, 4);

  return (
    <section className="relative min-h-[720px] lg:min-h-[820px] w-full overflow-hidden bg-[#0B0D13] flex flex-col justify-between pt-12 pb-20">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative top curve matching original signature architecture */}
      <div className="absolute top-0 inset-x-0 h-36 opacity-30 pointer-events-none">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1442 259"
          fill="none"
        >
          <path
            d="M0.5 146.79L0.5 0.5L1441.5 0.5L1441.5 146.79C788.24 349.1 208.64 231.09 0.5 146.79Z"
            fill="#7C3AED"
            fillOpacity="0.25"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold text-gray-300">
              NovuSphere v2.4 Live: 3D Spatial Asset Minting
            </span>
            <Link
              href="/event"
              className="text-xs font-bold text-brand-cyan hover:underline flex items-center gap-0.5"
            >
              <span>View Drops</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Discover & Collect <br />
            <span className="text-gradient">Rare Digital Creations</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            The premier decentralized showcase for generative art, 3D sculpts, and spatial computing assets designed by verified digital artists.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/#discover"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-purple via-indigo-600 to-brand-cyan hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-glow flex items-center gap-2 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Gallery</span>
            </Link>

            <Link
              href="/event"
              className="px-6 py-3.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md flex items-center gap-2 transition-all"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Live Drop Auctions</span>
            </Link>
          </div>
        </div>

        {/* Interactive Floating 3D Showcase Panels (Elevating the 4 colored boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
          {showcaseItems.map((item, index) => {
            const isHovered = activeBox === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveBox(index)}
                onClick={() => openQuickView(item)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/10 shadow-2xl h-80 sm:h-96 ${
                  isHovered
                    ? "lg:scale-105 z-20 border-brand-purple/50 shadow-glow"
                    : "lg:scale-95 opacity-85 z-10 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-brand-cyan" />
                    {item.category}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {item.priceTk} TK
                  </span>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-0 inset-x-0 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                      <Image
                        src={item.creator.avatar}
                        alt={item.creator.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                    <span className="text-xs text-gray-300 font-medium truncate flex items-center gap-1">
                      {item.creator.name}
                      {item.creator.verified && (
                        <ShieldCheck className="w-3 h-3 text-brand-cyan" />
                      )}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors truncate">
                    {item.title}
                  </h3>

                  <div className="flex justify-between items-center pt-1 border-t border-white/10 text-[11px] text-gray-400">
                    <span>Edition 1 of {item.edition.total}</span>
                    <span className="text-brand-purple font-semibold group-hover:underline">
                      Inspect Asset →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Platform Stats */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">48,000+</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">Curated Artworks</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-cyan">14,200+</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">Verified Creators</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.4%</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">Creator Payouts</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-purple">$18.5M+</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">Trading Volume</div>
          </div>
        </div>
      </div>
    </section>
  );
}
