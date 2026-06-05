import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import NewsFeed from "@/components/NewsFeed";

export const metadata: Metadata = {
  title: "News & Blog - Rohit Tour & Travel Premium Car Rental",
  description:
    "Stay updated with the latest travel tips, destination guides, fleet updates, and company news from Rohit Tour & Travel. Your premium car rental resource.",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="mt-28">
        <NewsFeed />

        <Newsletter
          title="Stay in the Loop"
          subtitle="Get the latest travel inspiration, exclusive offers, and company updates delivered straight to your inbox. Join 2,400+ fellow travelers."
          benefitLabel="Weekly Digest"
        />
      </main>
      <Footer />
    </>
  );
}
