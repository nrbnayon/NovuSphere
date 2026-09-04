import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-[#0B0D13]">
      <div className="w-16 h-16 rounded-2xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center mb-6 shadow-glow">
        <Sparkles className="w-8 h-8 text-brand-cyan" />
      </div>

      <h1 className="text-6xl font-black text-white mb-3">404</h1>
      <h2 className="text-xl font-bold text-gray-200 mb-2">
        Coordinates Not Found in the NovuSphere
      </h2>
      <p className="text-xs text-gray-400 max-w-sm mb-8">
        The digital artifact or gallery path you are requesting has moved or does not exist on this block.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider shadow-glow flex items-center gap-2 transition-all hover:scale-105"
      >
        <Compass className="w-4 h-4" />
        <span>Return to Showcase</span>
      </Link>
    </div>
  );
}
