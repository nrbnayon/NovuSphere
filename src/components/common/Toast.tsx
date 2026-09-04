"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border border-white/10 bg-brand-card/95 text-white animate-fade-in transition-all"
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {!isSuccess && !isWarning && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
              <p className="text-xs text-gray-300 mt-0.5 line-clamp-2">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-md"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
