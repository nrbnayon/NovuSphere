import HeroSection from "@/components/home/HeroSection";
import OverviewCarousel from "@/components/home/OverviewCarousel";
import Card3DDeck from "@/components/home/Card3DDeck";
import ColorSpectrum from "@/components/home/ColorSpectrum";
import DiscoverGrid from "@/components/home/DiscoverGrid";
import CreatorSpotlight from "@/components/home/CreatorSpotlight";
import NewsletterCta from "@/components/home/NewsletterCta";

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Dynamic Hero with floating 3D preview cards & platform metrics */}
      <HeroSection />

      {/* 2. Panoramic 3D Carousel of spotlight collections */}
      <OverviewCarousel />

      {/* 3. Interactive Stacked 3D Card Deck */}
      <Card3DDeck />

      {/* 4. Dynamic Chromatic Palette Explorer */}
      <ColorSpectrum />

      {/* 5. Live Discover Gallery with Category Filter, Search & Sort */}
      <DiscoverGrid />

      {/* 6. Verified Creator Network & Interactive Follows */}
      <CreatorSpotlight />

      {/* 7. Early Access VIP Drops CTA */}
      <NewsletterCta />
    </div>
  );
}
