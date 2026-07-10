import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="site-main">
      <Navbar />

      <section className="section" style={{ paddingTop: "180px" }}>
        <div className="container section-intro">
          <span className="tag-label">About</span>

          <h1 className="title">CRBRO.</h1>

          <p className="body" style={{ marginTop: "26px", maxWidth: "720px" }}>
            Panamanian producer, DJ and engineer shaping the sonic identity
            behind some of Latin music&apos;s most impactful records.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
