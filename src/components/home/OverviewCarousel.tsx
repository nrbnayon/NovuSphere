"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Flame, Eye, Play, Pause } from "lucide-react";
import { ART_ITEMS } from "@/services/mockData";
import { useCart } from "@/context/CartContext";
import { formatTk } from "@/utils/formatters";

export default function OverviewCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { openQuickView, addToCart } = useCart();
  const slides = ART_ITEMS;

  const nextSlide = useCallback(() => {
    setCurrentSlide((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  }, [slides.length]);

  // Auto-play timer (slides every 3.5 seconds, pauses when hovered)
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, nextSlide]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A0D14] pt-20 pb-28 border-t border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative curved header reminiscent of original aesthetic */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>Curator Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Featured Anthology <br />
              <span className="text-gradient">3D Panoramic Overview</span>
            </h2>
            <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
              Explore hand-selected masterworks curated weekly by international digital art galleries. Auto-advancing with tactile 3D controls.
            </p>
          </div>

          {/* Navigation & Autoplay toggle buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="px-3.5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              title={isAutoPlay ? "Pause Auto-play" : "Resume Auto-play"}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-[11px]">Auto</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-gray-400" />
                  <span className="hidden sm:inline text-[11px]">Paused</span>
                </>
              )}
            </button>

            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="w-5 h-5 text-emerald-400" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95"
              aria-label="Next artwork"
            >
              <ChevronRight className="w-5 h-5 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Panoramic Carousel Track */}
      <div className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        {slides.map((item, index) => {
          const total = slides.length;
          const offset = (index - currentSlide + total) % total;

          let transform = "translate3d(0, 0, -200px) scale(0.6)";
          let zIndex = 1;
          let opacity = 0;
          let pointerEvents = "pointer-events-none";

          if (offset === 0) {
            // Center active slide
            transform = "translate3d(0, 0, 0) scale(1)";
            zIndex = 30;
            opacity = 1;
            pointerEvents = "pointer-events-auto";
          } else if (offset === 1) {
            // Right 1
            transform = "translate3d(110%, 0, -80px) scale(0.85)";
            zIndex = 20;
            opacity = 0.75;
            pointerEvents = "pointer-events-auto";
          } else if (offset === 2) {
            // Right 2
            transform = "translate3d(210%, 0, -160px) scale(0.7)";
            zIndex = 10;
            opacity = 0.35;
          } else if (offset === total - 1) {
            // Left 1
            transform = "translate3d(-110%, 0, -80px) scale(0.85)";
            zIndex = 20;
            opacity = 0.75;
            pointerEvents = "pointer-events-auto";
          } else if (offset === total - 2) {
            // Left 2
            transform = "translate3d(-210%, 0, -160px) scale(0.7)";
            zIndex = 10;
            opacity = 0.35;
          }

          return (
            <div
              key={item.id}
              onClick={() => {
                if (offset === 0) {
                  openQuickView(item);
                } else if (offset === 1) {
                  nextSlide();
                } else if (offset === total - 1) {
                  prevSlide();
                }
              }}
              className={`absolute w-72 sm:w-84 md:w-96 h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-700 ease-out cursor-pointer ${pointerEvents}`}
              style={{
                transform,
                zIndex,
                opacity,
                backgroundColor: item.dominantColor || "#1E2230",
              }}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 288px, 384px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/40 to-transparent" />

              {/* Tag & Rarity */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {item.category}
                </span>
                <span className="text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                  {formatTk(item.priceTk)}
                </span>
              </div>

              {/* Overlay card info */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#0F1118]/80 backdrop-blur-xl border border-white/10 space-y-2">
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
                  <span className="text-xs text-gray-300 font-medium truncate">
                    {item.creator.name}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-1">{item.subtitle}</p>

                {offset === 0 && (
                  <div
                    className="pt-2 flex items-center justify-between gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => openQuickView(item)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Collect Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination bullets */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all rounded-full ${
              currentSlide === i
                ? "w-8 h-2 bg-emerald-400"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
