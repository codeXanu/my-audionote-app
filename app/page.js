import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureShowcase from "./components/FeatureShowcase";
import FeatureSection from "./components/FeatureSection";
import PrivacyFirstSection from "./components/PrivacyFirstSection";
import TestimonialSection from "./components/TestimonialSection";
import PricingSection from "./components/PricingSection";

export default function Home() {
  return (
   <>
   <Header />

   <HeroSection />

   <FeatureShowcase />

  <section id="features">
   <FeatureSection />

  </section>

   <PrivacyFirstSection />

   <TestimonialSection />

   <PricingSection />
   </>
  );
}
