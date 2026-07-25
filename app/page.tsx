import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TogetherSince from "@/components/TogetherSince";
import OurStory from "@/components/OurStory";
import Reasons from "@/components/Reasons";
import LoveLetter from "@/components/LoveLetter";
import FutureTogether from "@/components/FutureTogether";
import Proposal from "@/components/Proposal";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="relative">
      <CursorGlow />
      <Navbar />
      <Hero />
      <TogetherSince />
      <OurStory />
      <Reasons />
      <LoveLetter />
      <FutureTogether />
      <Proposal />
      <Footer />
    </main>
  );
}
