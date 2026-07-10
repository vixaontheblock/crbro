import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tracks = [
  "RELACIÓN REMIX",
  "LA LUZ",
  "GIRL LIKE YOU",
  "911 REMIX",
  "SAL Y PERREA",
  "LLUEVE",
];

export default function CreditsPage() {
  return (
    <main className="site-main">
      <Navbar />

      <section className="credits-section" style={{ paddingTop: "180px" }}>
        <div className="container">
          <div className="section-intro">
            <span className="tag-label">Credits</span>
            <h1 className="title">Selected works.</h1>
          </div>

          <div className="work-grid" style={{ marginTop: "56px", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {tracks.map((track) => (
              <div
                key={track}
                className="glass"
                style={{ padding: "28px", borderRadius: "20px" }}
              >
                <h3
                  style={{
                    fontFamily: '"Gobold","Anton","Impact","Arial Narrow",sans-serif',
                    fontSize: "28px",
                    fontWeight: 950,
                    textTransform: "uppercase",
                    color: "var(--crbro-black)",
                  }}
                >
                  {track}
                </h3>

                <p style={{ marginTop: "14px", color: "rgba(17,17,17,0.55)" }}>
                  Production Credit
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
