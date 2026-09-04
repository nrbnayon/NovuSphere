"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#0B0D13]">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-rose-400" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-xs text-gray-400 max-w-sm mb-6">
        An unexpected telemetry error occurred while rendering this view.
      </p>

      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-brand-purple hover:bg-purple-600 text-white font-semibold text-xs tracking-wider flex items-center gap-2 shadow-glow transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
