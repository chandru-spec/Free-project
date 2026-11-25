import { BestSellersSection } from "@/components/home/BestSellersSection";
import { CategoryArches } from "@/components/home/CategoryArches";
import { EthnicWesternSplit } from "@/components/home/EthnicWesternSplit";
import { FabricOrbsSection } from "@/components/home/FabricOrbsSection";
import { FestiveLookbookSection } from "@/components/home/FestiveLookbookSection";
import { HeroSection } from "@/components/home/HeroSection";
import { InstagramNewsletterSection } from "@/components/home/InstagramNewsletterSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { NewArrivalsCarousel } from "@/components/home/NewArrivalsCarousel";
import { StorySection } from "@/components/home/StorySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyReraSection } from "@/components/home/WhyReraSection";

export function HomePageClient() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoryArches />
      <NewArrivalsCarousel />
      <FabricOrbsSection />
      <FestiveLookbookSection />
      <EthnicWesternSplit />
      <BestSellersSection />
      <StorySection />
      <WhyReraSection />
      <TestimonialsSection />
      <InstagramNewsletterSection />
    </>
  );
}
