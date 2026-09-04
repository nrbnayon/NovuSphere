"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Github, Twitter, Instagram, Globe } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Invalid Email", "Please enter a valid email address.", "warning");
      return;
    }
    showToast("Subscribed!", "You're now registered for private drop alerts and curations.", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#090A0F] border-t border-white/10 text-gray-400 relative overflow-hidden pt-16 pb-12">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-brand-purple/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-purple via-indigo-500 to-brand-cyan p-0.5 shadow-glow">
                <div className="w-full h-full bg-[#090A0F] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                </div>
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Novu<span className="text-gradient-purple">Sphere</span>
              </span>
            </Link>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              NovuSphere is an avant-garde digital arts showcase and creative assets hub engineered for visionary collectors, spatial creators, and 3D artists worldwide.
            </p>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="pt-2 flex max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for private drops..."
                className="flex-1 bg-white/5 border border-white/10 rounded-l-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple/50"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-r-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Column 1: Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#discover" className="hover:text-white transition-colors">
                  All Artworks
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="hover:text-white transition-colors">
                  3D Interactive Deck
                </Link>
              </li>
              <li>
                <Link href="/event" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Live Drops</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-rose-500/20 text-rose-400 font-bold">
                    HOT
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#creators" className="hover:text-white transition-colors">
                  Featured Creators
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  NovuSphere Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Creator Application
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-white transition-colors">
                  Color Harmonies
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Smart Contracts (Audited)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://lens.xyz"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="Decentralized Social"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-gray-500 pt-2">
              Audited by CertiK & OpenZeppelin standard protocols.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} NovuSphere Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Status: 99.98% Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
