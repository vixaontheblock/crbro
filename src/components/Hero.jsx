import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero brand-hero">
      <div className="container hero-grid brand-hero-grid">
        <div className="hero-copy brand-hero-copy">
          <p className="eyebrow">Producer · DJ · Hitmaker</p>

          <div className="hero-logo-block">
            <img
              src="/images/crbro-logo.png"
              alt="CRBRO Logo"
              className="hero-logo-img"
            />
          </div>

          <p className="hero-lead">
            Panama-born sound architect shaping Latin music through rhythm,
            atmosphere and records built for global impact.
          </p>

          <div className="btn-row" style={{ marginTop: "34px" }}>
            <Link href="/#credits" className="btn btn-primary">
              View Credits
            </Link>

            <Link href="/#booking" className="btn btn-secondary">
              Booking
            </Link>
          </div>
        </div>

        <aside className="hero-panel glass brand-hero-panel">
          <div className="panel-number">
            <strong>1.4B+</strong>
            <span>
              Streams
              <br />
              Worldwide
            </span>
          </div>

          <p>
            Official landing experience for selected credits, live previews,
            bookings, sessions and creative direction.
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