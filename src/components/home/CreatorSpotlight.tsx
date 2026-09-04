"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CREATORS } from "@/services/mockData";
import { formatNumber } from "@/utils/formatters";
import { ShieldCheck, UserPlus, Check, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function CreatorSpotlight() {
  const [followedIds, setFollowedIds] = useState<string[]>(["c-1"]);
  const { showToast } = useToast();

  const toggleFollow = (creatorId: string, creatorName: string) => {
    setFollowedIds((prev) => {
      const isFollowing = prev.includes(creatorId);
      if (isFollowing) {
        showToast("Unfollowed", `You unfollowed ${creatorName}`, "info");
        return prev.filter((id) => id !== creatorId);
      } else {
        showToast("Following Artist", `You are now following ${creatorName}!`, "success");
        return [...prev, creatorId];
      }
    });
  };

  const featuredArtists = CREATORS.slice(0, 3);

  return (
    <section id="creators" className="py-24 bg-[#090B10] relative overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Overlapping Gallery Matrix */}
          <div className="lg:col-span-6 relative h-[450px] sm:h-[520px]">
            {/* Main large artist card */}
            <div className="absolute top-0 left-0 w-[78%] sm:w-[320px] h-[340px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#141724] z-10">
              <div className="relative h-44 w-full">
                <Image
                  src={featuredArtists[0].bannerImage || featuredArtists[0].avatar}
                  alt={featuredArtists[0].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 250px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141724] via-transparent to-transparent" />
              </div>

              <div className="p-5 -mt-8 relative z-10">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 mb-3 shadow-lg">
                  <Image
                    src={featuredArtists[0].avatar}
                    alt={featuredArtists[0].name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white truncate">
                    {featuredArtists[0].name}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                </div>
                <p className="text-xs text-gray-400 mb-3">{featuredArtists[0].handle}</p>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                  <div>
                    <span className="font-bold text-white block">
                      {formatNumber(featuredArtists[0].followersCount)}
                    </span>
                    <span className="text-[10px] text-gray-400">Collectors</span>
                  </div>
                  <button
                    onClick={() => toggleFollow(featuredArtists[0].id, featuredArtists[0].name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                      followedIds.includes(featuredArtists[0].id)
                        ? "bg-white/10 text-emerald-400"
                        : "bg-brand-purple hover:bg-purple-600 text-white shadow-glow"
                    }`}
                  >
                    {followedIds.includes(featuredArtists[0].id) ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Second overlapping artist card */}
            <div className="absolute bottom-4 right-0 sm:right-6 w-[70%] sm:w-[300px] h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#161A28] z-20">
              <div className="relative h-36 w-full">
                <Image
                  src={featuredArtists[1].bannerImage || featuredArtists[1].avatar}
                  alt={featuredArtists[1].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 220px, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161A28] via-transparent to-transparent" />
              </div>

              <div className="p-5 -mt-8 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 mb-3 shadow-lg">
                  <Image
                    src={featuredArtists[1].avatar}
                    alt={featuredArtists[1].name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white truncate">
                    {featuredArtists[1].name}
                  </h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                </div>
                <p className="text-[11px] text-gray-400 mb-3">{featuredArtists[1].handle}</p>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                  <div>
                    <span className="font-bold text-white block">
                      {formatNumber(featuredArtists[1].followersCount)}
                    </span>
                    <span className="text-[10px] text-gray-400">Collectors</span>
                  </div>
                  <button
                    onClick={() => toggleFollow(featuredArtists[1].id, featuredArtists[1].name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                      followedIds.includes(featuredArtists[1].id)
                        ? "bg-white/10 text-emerald-400"
                        : "bg-brand-purple hover:bg-purple-600 text-white shadow-glow"
                    }`}
                  >
                    {followedIds.includes(featuredArtists[1].id) ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Creator Application */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Creator Network</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Empowering Visionary <br />
              <span className="text-gradient">Digital Artists & Architects</span>
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              NovuSphere partners directly with world-class sculptors, concept visualizers, and code artists. Every creator is authenticated to preserve originality, rarity, and lasting asset provenance.
            </p>

            <div className="space-y-3 max-w-md mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Smart Contract Royalties</h4>
                  <p className="text-[11px] text-gray-400">Artists receive up to 90% primary sales plus perpetual 10% secondary splits.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="p-1.5 rounded-lg bg-brand-cyan/20 text-brand-cyan shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Spatial Computing Ready</h4>
                  <p className="text-[11px] text-gray-400">Assets are packaged with GLTF, USDZ, and native WebGL shaders for immediate metaverse deployment.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full bg-brand-cyan hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-glow-cyan transition-all hover:scale-105"
              >
                <span>Apply as Verified Creator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
