"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PALETTE_FILTERS } from "@/constants/navigation";
import { ART_ITEMS } from "@/services/mockData";
import { useCart } from "@/context/CartContext";
import { Palette, Sparkles, ArrowRight, Eye } from "lucide-react";
import { formatTk } from "@/utils/formatters";

export default function ColorSpectrum() {
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const { openQuickView, addToCart } = useCart();

  const activePalette = PALETTE_FILTERS[selectedPaletteIndex];

  // Map each palette to the most harmonious artwork
  const matchedArt = ART_ITEMS[selectedPaletteIndex % ART_ITEMS.length];

  return (
    <section id="collections" className="py-24 bg-[#0B0D13] relative overflow-hidden border-t border-white/5">
      {/* Dynamic ambient glow adapting to chosen palette */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-25 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: activePalette.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Swatch Matrix & Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Primary Featured Art Panel (elevating the big blank box) */}
              <div
                onClick={() => openQuickView(matchedArt)}
                className="col-span-3 row-span-3 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer transition-all duration-500 hover:border-white/20"
                style={{
                  boxShadow: `0 20px 40px -15px ${activePalette.hex}40`,
                }}
              >
                <Image
                  src={matchedArt.imageUrl}
                  alt={matchedArt.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md flex items-center gap-1.5"
                    style={{ backgroundColor: `${activePalette.hex}cc` }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {activePalette.name} Harmony
                  </span>
                </div>

                {/* Bottom details bar */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="text-xs text-gray-400">{matchedArt.creator.name}</div>
                    <div className="text-sm font-bold text-white truncate">{matchedArt.title}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-emerald-400">
                      {formatTk(matchedArt.priceTk)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(matchedArt);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                    >
                      Collect
                    </button>
                  </div>
                </div>
              </div>

              {/* Swatch chips (elevating the small colored boxes) */}
              {PALETTE_FILTERS.map((palette, index) => {
                const isSelected = selectedPaletteIndex === index;
                return (
                  <button
                    key={palette.id}
                    onClick={() => setSelectedPaletteIndex(index)}
                    className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-end p-2 text-left group ${
                      isSelected
                        ? "scale-105 ring-4 ring-white shadow-2xl z-10"
                        : "opacity-80 hover:opacity-100 hover:scale-100"
                    }`}
                    style={{ backgroundColor: palette.hex }}
                    aria-label={`Select ${palette.name} color palette`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <span className="relative z-10 text-[10px] sm:text-xs font-black text-white drop-shadow-md leading-tight">
                      {palette.name.split(" ")[1] || palette.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Narrative & Palette Explanation */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 text-xs font-bold">
              <Palette className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Chromatic Filtration Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Curated by Hue. <br />
              <span style={{ color: activePalette.hex }} className="transition-colors duration-500">
                {activePalette.name}
              </span>
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed">
              Every digital artwork exists in an emotional color spectrum. Filter collections dynamically by chromatic resonance to find works that harmonize with your spatial environment or virtual gallery walls.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Palette Specification
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: activePalette.hex }}
                />
                <span className="text-xs text-white font-mono">{activePalette.hex} Hex Code</span>
                <span className="text-xs text-gray-400">• Curated in Studio Grade sRGB</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openQuickView(matchedArt)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs tracking-wider flex items-center gap-2 transition-all hover:scale-105"
              >
                <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Inspect Selected Work</span>
              </button>

              <a
                href="#discover"
                className="px-5 py-3 rounded-full text-white font-semibold text-xs tracking-wider flex items-center gap-2 transition-all shadow-glow"
                style={{ backgroundColor: activePalette.hex }}
              >
                <span>Filter Main Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
