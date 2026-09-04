import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#0B0D13]">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-brand-purple/20 animate-ping" />
        <div className="w-16 h-16 rounded-full border-2 border-brand-purple border-t-transparent animate-spin flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-brand-cyan animate-pulse" />
        </div>
      </div>
      <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
        Loading NovuSphere Assets...
      </span>
    </div>
  );
}
