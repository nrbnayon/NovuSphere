"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DROP_EVENTS } from "@/services/mockData";
import { DropEvent } from "@/types";
import { formatTk, formatTimeRemaining } from "@/utils/formatters";
import { Flame, Clock, Gavel, Bell, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(formatTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return <span className="text-rose-400 font-bold">Auction Concluded</span>;
  }

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <div className="bg-black/60 px-2 py-1 rounded-lg border border-white/10 text-center">
        <span className="text-sm font-bold text-white">{timeLeft.days}</span>
        <span className="block text-[9px] text-gray-400 uppercase">d</span>
      </div>
      <span className="text-gray-500 font-bold">:</span>
      <div className="bg-black/60 px-2 py-1 rounded-lg border border-white/10 text-center">
        <span className="text-sm font-bold text-white">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="block text-[9px] text-gray-400 uppercase">h</span>
      </div>
      <span className="text-gray-500 font-bold">:</span>
      <div className="bg-black/60 px-2 py-1 rounded-lg border border-white/10 text-center">
        <span className="text-sm font-bold text-white">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="block text-[9px] text-gray-400 uppercase">m</span>
      </div>
      <span className="text-gray-500 font-bold">:</span>
      <div className="bg-black/60 px-2 py-1 rounded-lg border border-white/10 text-center">
        <span className="text-sm font-bold text-emerald-400">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="block text-[9px] text-gray-400 uppercase">s</span>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<DropEvent[]>(DROP_EVENTS);
  const [rsvpdEvents, setRsvpdEvents] = useState<string[]>([]);
  const { showToast } = useToast();

  const handlePlaceBid = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const newBid = e.currentBidTk + 250;
          showToast(
            "Bid Submitted",
            `Your bid of ${formatTk(newBid)} for "${e.title}" was placed on-chain!`,
            "success"
          );
          return {
            ...e,
            currentBidTk: newBid,
            totalBids: e.totalBids + 1,
          };
        }
        return e;
      })
    );
  };

  const handleRsvp = (eventId: string, title: string) => {
    if (rsvpdEvents.includes(eventId)) {
      setRsvpdEvents((prev) => prev.filter((id) => id !== eventId));
      showToast("Reminder Cancelled", `You will no longer receive drop notifications for "${title}".`, "info");
    } else {
      setRsvpdEvents((prev) => [...prev, eventId]);
      showToast("RSVP Confirmed", `You will be alerted 10 minutes prior to "${title}".`, "success");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>Cryptographic Drops & Live Auctions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Curated Drops <br />
            <span className="text-gradient">Real-Time Auction Floor</span>
          </h1>

          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Bid in decentralized real-time auctions on 1-of-1 digital sculptures, audio-visual masterworks, and generative algorithms.
          </p>
        </div>

        {/* Drops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const isRsvpd = rsvpdEvents.includes(event.id);

            return (
              <div
                key={event.id}
                className="bg-[#121520] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-brand-purple/50 transition-all duration-300"
              >
                {/* Artwork media preview */}
                <div className="relative h-64 w-full bg-black/40 overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#121520] via-transparent to-transparent" />

                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md ${
                        event.isLive
                          ? "bg-rose-500/80 text-white animate-pulse"
                          : "bg-black/60 text-gray-300 border border-white/10"
                      }`}
                    >
                      {event.isLive ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-white" />
                          <span>LIVE AUCTION</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>UPCOMING</span>
                        </>
                      )}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      {event.rarity}
                    </span>
                  </div>

                  {/* Countdown bar */}
                  <div className="absolute bottom-3 inset-x-4 flex items-center justify-between bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10">
                    <span className="text-[11px] text-gray-400 font-medium">
                      {event.isLive ? "Auction Ends In:" : "Drop Starts In:"}
                    </span>
                    <CountdownTimer targetDate={event.isLive ? event.endsAt : event.startsAt} />
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Creator row */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src={event.creator.avatar}
                          alt={event.creator.name}
                          fill
                          className="object-cover"
                          sizes="24px"
                        />
                      </div>
                      <span className="text-xs text-gray-300 font-semibold truncate flex items-center gap-1">
                        {event.creator.name}
                        {event.creator.verified && (
                          <ShieldCheck className="w-3 h-3 text-brand-cyan" />
                        )}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  {/* Auction telemetry */}
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                          Current Highest Bid
                        </span>
                        <div className="text-2xl font-black text-emerald-400">
                          {formatTk(event.currentBidTk)}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                          Total Bids Placed
                        </span>
                        <span className="text-sm font-bold text-white">
                          {event.totalBids} bids
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2.5">
                      {event.isLive ? (
                        <button
                          onClick={() => handlePlaceBid(event.id)}
                          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                        >
                          <Gavel className="w-4 h-4" />
                          <span>Place +250 TK Bid</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRsvp(event.id, event.title)}
                          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                            isRsvpd
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-white/10 hover:bg-white/20 text-white"
                          }`}
                        >
                          {isRsvpd ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>RSVP Confirmed</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-4 h-4 text-amber-400" />
                              <span>Notify Me at Drop</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
