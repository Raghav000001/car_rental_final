import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import SearchBar from "@/components/SearchBar";
import AboutSection from "@/components/AboutSection";
import PromoBanners from "@/components/PromoBanners";
import CarTypes from "@/components/CarTypes";
import CarFleet from "@/components/CarFleet";
import BrandsCarousel from "@/components/BrandsCarousel";
import VideoSection from "@/components/VideoSection";
import TeamSection from "@/components/TeamSection";
import ServiceLocations from "@/components/ServiceLocations";
import OwnerSection from "@/components/OwnerSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingElement from "@/components/FloatingElement";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <FloatingElement className="fixed top-32 right-8 w-4 h-4 rounded-full bg-primary/20 blur-sm pointer-events-none z-50 hidden lg:block" distance={20} duration={5} delay={0} />
      <FloatingElement className="fixed bottom-32 left-8 w-6 h-6 rounded-full bg-primary/10 blur-sm pointer-events-none z-50 hidden lg:block" distance={25} duration={6} delay={1.5} />

      <ScrollReveal direction="up"><SearchBar /></ScrollReveal>
      <ScrollReveal direction="right" stagger staggerDelay={0.15}><AboutSection /></ScrollReveal>
      <ScrollReveal direction="up" stagger staggerDelay={0.1}><PromoBanners /></ScrollReveal>
      <ScrollReveal direction="up" stagger staggerDelay={0.08}><CarTypes /></ScrollReveal>
      <ScrollReveal direction="scale" stagger staggerDelay={0.1}><CarFleet /></ScrollReveal>
      <ScrollReveal direction="fade"><BrandsCarousel /></ScrollReveal>
      <ScrollReveal direction="scale"><VideoSection /></ScrollReveal>
      {/* <ScrollReveal direction="up" stagger staggerDelay={0.12}><TeamSection /></ScrollReveal> */}
      <ScrollReveal direction="up"><ServiceLocations /></ScrollReveal>
      <ScrollReveal direction="left"><OwnerSection /></ScrollReveal>
      <ScrollReveal direction="up"><Newsletter /></ScrollReveal>
      <Footer />
    </main>
  );
}
