"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { ToastNotification, ToastType } from "@/types";

interface ToastContextType {
  toasts: ToastNotification[];
  showToast: (title: string, message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const lastToastRef = useRef<{ key: string; time: number } | null>(null);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message: string, type: ToastType = "success") => {
      const now = Date.now();
      const toastKey = `${title}__${message}`;

      // Prevent exact duplicate toasts triggered within 800ms (e.g. React StrictMode or double clicks)
      if (
        lastToastRef.current &&
        lastToastRef.current.key === toastKey &&
        now - lastToastRef.current.time < 800
      ) {
        return;
      }
      lastToastRef.current = { key: toastKey, time: now };

      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastNotification = { id, title, message, type };

      setToasts((prev) => [...prev.slice(-3), newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

const fallbackToast: ToastContextType = {
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
};

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    return fallbackToast;
  }
  return context;
}
