"use client";

import React, { useState } from "react";
import { Send, ShieldCheck, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolioUrl: "",
    category: "3D & Cyberpunk",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("Missing Fields", "Please complete all required fields.", "warning");
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(
        "Application Received",
        "Thank you! Our curation board will review your portfolio within 48 hours.",
        "success"
      );
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join the NovuSphere Roster</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Creator Application & <br />
            <span className="text-gradient">Partnership Inquiries</span>
          </h1>

          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Are you a 3D artist, generative coder, or spatial designer? Apply for a verified creator profile to launch certified drops on NovuSphere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#121520] p-8 rounded-3xl border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  We have received your dossier. Our curation council reviews submissions every Tuesday and Friday. Check your inbox for confirmation.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      portfolioUrl: "",
                      category: "3D & Cyberpunk",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-brand-purple hover:bg-purple-600 text-white text-xs font-semibold transition-colors mt-4"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Full Name / Artist Handle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aria Sterling or @ariasterling"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Contact Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="artist@domain.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Portfolio / ArtStation / X Link
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://artstation.com/..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Primary Creative Medium
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#121520] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple"
                    >
                      <option value="3D & Cyberpunk">3D & Cyberpunk</option>
                      <option value="Generative AI">Generative AI</option>
                      <option value="Abstract & Fluid">Abstract & Fluid</option>
                      <option value="Photography">Photography</option>
                      <option value="Spatial Computing">Spatial Computing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Artist Statement & Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your creative practice, tools, and previous exhibitions..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Creator Dossier</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: FAQ & Perks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121520] p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Verified Creator Perks
              </h3>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Zero Gas Listing:</strong> Mint directly on our carbon-neutral layer-2 rollups.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>90% Primary Split:</strong> Keep the overwhelming majority of your primary mint earnings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Featured Editorial:</strong> Guaranteed spotlight placement in NovuSphere Journal.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#121520] p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-cyan" />
                Frequently Asked Questions
              </h3>

              <div className="space-y-3 text-xs text-gray-400">
                <div>
                  <h4 className="font-semibold text-white mb-1">What file formats are supported?</h4>
                  <p>We support high-res PNG, MP4, WebM, GLTF/GLB 3D files, and custom WebGL shaders.</p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <h4 className="font-semibold text-white mb-1">How long does curation take?</h4>
                  <p>Applications are reviewed in batch every 48 hours. Successful candidates receive a verified badge invitation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
