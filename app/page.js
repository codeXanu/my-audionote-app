import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureShowcase from "./components/FeatureShowcase";
import FeatureSection from "./components/FeatureSection";
import PrivacyFirstSection from "./components/PrivacyFirstSection";
import TestimonialSection from "./components/TestimonialSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import ConnectSection from "./components/ConnectSection";
import { FormatQuoteRounded } from "@mui/icons-material";

export default function Home() {
  return (
   <>

   <Header />
   <HeroSection />
   <FeatureShowcase />
    <section id="features">
    <FeatureSection />
    </section>
    <section id="integrate" >
      <ConnectSection />
    </section>
   <PrivacyFirstSection />
   <TestimonialSection />
   <PricingSection />
    <section id="faq">
      <FAQSection />
    </section> 
   <Footer />
   </>
  );
}
