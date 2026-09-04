"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ART_ITEMS } from "@/services/mockData";
import { useCart } from "@/context/CartContext";
import { Sparkles, Layers, ArrowRight, RotateCw, Eye } from "lucide-react";
import { formatTk } from "@/utils/formatters";

export default function Card3DDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openQuickView, addToCart } = useCart();
  const deckCards = ART_ITEMS.slice(0, 4);

  const handleNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % deckCards.length);
  };

  const currentCard = deckCards[activeIndex];

  return (
    <section id="showcase" className="py-24 bg-[#0E1017] relative overflow-hidden border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Narrative Column */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive 3D Asset Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Tactile Perspective. <br />
              <span className="text-gradient-purple">Multi-Layered Artistry.</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Experience digital assets beyond static frames. NovuSphere allows collectors to inspect spatial depth, procedural shaders, and verified edition provenance in an interactive 3D stacked deck.
            </p>

            {/* Quick stats pill */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-gray-400">Current Spotlight</div>
                <div className="text-sm font-bold text-white truncate">{currentCard.title}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-gray-400">Floor Price</div>
                <div className="text-sm font-bold text-emerald-400">{formatTk(currentCard.priceTk)}</div>
              </div>
            </div>

            {/* Interactive Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={handleNextCard}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs tracking-wider flex items-center gap-2 transition-all hover:scale-105"
              >
                <RotateCw className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Rotate Deck (Click to cycle)</span>
              </button>

              <Link
                href="/#discover"
                className="px-5 py-3 rounded-full bg-brand-purple hover:bg-purple-600 text-white font-semibold text-xs tracking-wider flex items-center gap-2 shadow-glow transition-all"
              >
                <span>Browse All Assets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Stacked Deck Canvas */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div
              onClick={handleNextCard}
              className="relative w-[300px] h-[380px] sm:w-[380px] sm:h-[460px] cursor-pointer perspective-1000 group"
              title="Click to cycle next card"
            >
              {deckCards.map((card, i) => {
                // Calculate relative position to active index
                const offset = (i - activeIndex + deckCards.length) % deckCards.length;

                let transformStyle = "";
                let zIndex = 10;
                let opacity = 0.5;

                if (offset === 0) {
                  // Active front card
                  transformStyle = "translate3d(0px, 0px, 0px) scale(1) rotate(0deg)";
                  zIndex = 30;
                  opacity = 1;
                } else if (offset === 1) {
                  // Second card behind
                  transformStyle = "translate3d(36px, -18px, -50px) scale(0.92) rotate(4deg)";
                  zIndex = 20;
                  opacity = 0.85;
                } else if (offset === 2) {
                  // Third card behind
                  transformStyle = "translate3d(70px, -36px, -100px) scale(0.85) rotate(8deg)";
                  zIndex = 10;
                  opacity = 0.7;
                } else {
                  // Background card
                  transformStyle = "translate3d(-20px, 10px, -150px) scale(0.75) rotate(-6deg)";
                  zIndex = 5;
                  opacity = 0.3;
                }

                return (
                  <div
                    key={card.id}
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 ease-out preserve-3d"
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                      backgroundColor: card.dominantColor || "#1E2230",
                    }}
                  >
                    {/* Artwork Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 300px, 380px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/40 to-transparent" />

                      {/* Header overlay */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-brand-cyan" />
                          {card.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                          {formatTk(card.priceTk)}
                        </span>
                      </div>

                      {/* Frosted Details Tray */}
                      <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20">
                              <Image
                                src={card.creator.avatar}
                                alt={card.creator.name}
                                fill
                                className="object-cover"
                                sizes="28px"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white leading-none">
                                {card.creator.name}
                              </div>
                              <span className="text-[10px] text-gray-400">
                                {card.creator.handle}
                              </span>
                            </div>
                          </div>

                          <span className="text-[11px] text-gray-400 font-medium">
                            #{card.edition.current}/{card.edition.total}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-white leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-xs text-gray-300 mt-0.5 line-clamp-1">
                            {card.subtitle}
                          </p>
                        </div>

                        {/* Card CTA row */}
                        {offset === 0 && (
                          <div
                            className="pt-2 border-t border-white/10 flex items-center justify-between gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => openQuickView(card)}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Eye className="w-3 h-3 text-brand-cyan" />
                              <span>Inspect</span>
                            </button>

                            <button
                              onClick={() => addToCart(card)}
                              className="px-3.5 py-1.5 rounded-lg bg-brand-purple hover:bg-purple-600 text-white text-xs font-semibold shadow-glow transition-colors"
                            >
                              Collect Asset
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
