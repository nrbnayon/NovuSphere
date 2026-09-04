"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { BLOG_POSTS } from "@/services/mockData";
import { BlogPost } from "@/types";
import { BookOpen, Clock, Calendar, Search, ArrowRight, Sparkles } from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const categories = ["All", "Technology", "Design", "Insights"];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchCat = selectedCategory === "All" || post.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0B0D13] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>NovuSphere Journal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Spatial Computing, <br />
            <span className="text-gradient">AI Aesthetics & Culture</span>
          </h1>

          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Deep-dive essays and technical insights on generative algorithms, modern shader techniques, and creative economy trends.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#121520] p-4 rounded-2xl border border-white/10 shadow-lg mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-purple text-white shadow-glow"
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & tags..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-purple/50"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const isExpanded = expandedPostId === post.id;

            return (
              <article
                key={post.id}
                className="bg-[#131622] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-brand-cyan/40 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-56 w-full bg-black/40 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131622] via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-black/70 backdrop-blur-md text-brand-cyan border border-white/10">
                    {post.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-[11px] text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-brand-cyan transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                      {isExpanded ? post.content : post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/5 text-gray-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & Read More Button */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white leading-none">
                          {post.author.name}
                        </div>
                        <span className="text-[10px] text-gray-400">{post.author.role}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className="text-xs font-bold text-brand-cyan hover:underline flex items-center gap-1"
                    >
                      <span>{isExpanded ? "Show Less" : "Read Full"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
