import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import ReviewForm from "@/components/ui/review-form";

export const metadata: Metadata = {
  title: "Testimonials - Rohit Tour & Travel Premium Car Rental",
  description:
    "Read what our customers say about Rohit Tour & Travel. Real stories from real journeys across North India.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          <StaggerTestimonials />
        </section>

        <ReviewForm />

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
