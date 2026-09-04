import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AppProviders from "@/providers/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NovuSphere — Next-Gen Digital Arts & Creative Assets Hub",
  description:
    "Experience the premier decentralized platform for generative art, 3D sculpts, and spatial computing digital assets. Curated by global studios.",
  keywords: [
    "Digital Art",
    "3D Models",
    "Generative AI",
    "Web3 Showcase",
    "Creative Assets",
    "Next.js Portfolio",
  ],
  authors: [{ name: "NovuSphere Labs" }],
  openGraph: {
    title: "NovuSphere — Next-Gen Digital Arts & Creative Assets Hub",
    description: "Curated 3D, generative, and spatial assets for modern collectors and creators.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovuSphere — Next-Gen Digital Arts & Creative Assets Hub",
    description: "Curated 3D, generative, and spatial assets for modern collectors and creators.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#0B0D13] text-[#F3F4F6] antialiased min-h-screen flex flex-col`}>
        <AppProviders>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
