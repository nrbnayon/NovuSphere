"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, BellRing, ShieldCheck } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function NewsletterCta() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Invalid Email", "Please enter a valid email address.", "warning");
      return;
    }
    showToast("VIP Whitelist Registered", "You will receive private drop invitations 15 minutes before public minting.", "success");
    setEmail("");
  };

  return (
    <section className="py-20 bg-[#0A0D15] relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/10 bg-gradient-to-b from-brand-purple/20 via-[#131622] to-[#131622] text-center space-y-6 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-cyan/20 blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-brand-cyan text-xs font-bold">
            <BellRing className="w-3.5 h-3.5" />
            <span>Exclusive Early Access</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Never Miss a Limited 1-of-1 Drop. Join the NovuSphere Circle.
          </h2>

          <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
            Get instant cryptographic auction notifications, curated artist interviews, and private access codes sent straight to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full sm:flex-1 bg-white/10 border border-white/15 rounded-full px-5 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-cyan"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Get Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Zero spam
            </span>
            <span>•</span>
            <span>Unsubscribe anytime</span>
            <span>•</span>
            <span>Encrypted transmission</span>
          </div>
        </div>
      </div>
    </section>
  );
}
