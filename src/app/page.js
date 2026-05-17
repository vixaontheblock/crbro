import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkModes from "@/components/WorkModes";
import Credits from "@/components/Credits";
import Recognition from "@/components/Recognition";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ExperienceLayer from "@/components/ExperienceLayer";
import SoundPacks from "@/components/SoundPacks";

export default function Home() {
  return (
    <main className="site-main">
      <ExperienceLayer />
      <Navbar />
      <Hero />
      <Marquee />
      <Recognition />
      <About />
      <Credits />
      <WorkModes />
      <SoundPacks />
      <Booking />
      <Footer />
    </main>
  );
}
