import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Credits from "@/components/Credits";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ExperienceLayer from "@/components/ExperienceLayer";

export default function Home() {
  return (
    <main className="site-main">
      <ExperienceLayer/>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Credits />
      <Booking />
      <Footer />
    </main>
  );
}