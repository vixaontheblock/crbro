import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Producer · DJ · Engineer</p>

          <h1 className="display">CRBRO</h1>

          <p className="hero-lead">
            Crafting the sonic identity behind the next generation of Latin music.
          </p>

          <div className="btn-row" style={{ marginTop: "34px" }}>
            <Link href="/credits" className="btn btn-primary">
              View Credits
            </Link>

            <Link href="/booking" className="btn btn-secondary">
              Booking
            </Link>
          </div>
        </div>

        <aside className="hero-panel glass">
          <div className="panel-number">
            <strong>1.4B+</strong>
            <span>
              Streams
              <br />
              Worldwide
            </span>
          </div>

          <p>
            Official landing experience for bookings, selected credits, press,
            production work and creative direction.
          </p>

          <div className="mini-stats">
            <div className="mini-stat">
              <strong>Multi</strong>
              <span>Platinum</span>
            </div>

            <div className="mini-stat">
              <strong>PA</strong>
              <span>Global</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}