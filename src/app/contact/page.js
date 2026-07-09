import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="site-main">
      <Navbar />

      <section
        className="section"
        style={{
          paddingTop: "200px",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span className="kicker">Contact</span>

          <h1 className="title" style={{ marginTop: "26px" }}>
            Let&apos;s talk.
          </h1>

          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "12px",
              justifyItems: "center",
            }}
          >
            <a className="body" href="mailto:crbrobooking@gmail.com">
              crbrobooking@gmail.com
            </a>

            <a
              className="body"
              href="https://instagram.com/crbro_"
              target="_blank"
              rel="noopener noreferrer"
            >
              @crbro_
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
