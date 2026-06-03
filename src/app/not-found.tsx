import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundPage from "@/components/ui/page-not-found";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <NotFoundPage />
      <Footer />
    </div>
  );
}
