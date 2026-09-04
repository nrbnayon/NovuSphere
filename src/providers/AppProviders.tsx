"use client";

import React from "react";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/common/CartDrawer";
import QuickViewModal from "@/components/common/QuickViewModal";
import Toast from "@/components/common/Toast";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <QuickViewModal />
        <Toast />
      </CartProvider>
    </ToastProvider>
  );
}
