import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import SellerCtaSection from "@/components/SellerCtaSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <ServicesSection />
        <PortfolioSection />
        <SellerCtaSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
