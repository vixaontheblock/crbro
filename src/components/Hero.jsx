import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero brand-hero">
      <div className="container hero-grid brand-hero-grid">
        <div className="hero-copy brand-hero-copy">
          <p className="eyebrow">Producer · DJ · Hitmaker · Panama</p>

          <div className="hero-logo-block">
            <Image
              src="/images/crbro-logo.png"
              alt="CRBRO Logo"
              width={420}
              height={120}
              className="hero-logo-img"
              priority
            />
          </div>

          <p className="hero-lead">
            The sound behind the records. Panama-born producer and DJ shaping
            Latin music through rhythm, atmosphere and multi-platinum
            collaborations built for global impact.
          </p>

          <div className="btn-row" style={{ marginTop: "34px" }}>
            <Link href="/#booking" className="btn btn-primary">
              Book a Session
            </Link>

            <Link href="/#credits" className="btn btn-secondary">
              View Credits
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
            Selected credits, live previews, bookings, sessions and creative
            direction — all in one place.
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

            <div className="mini-stat">
              <strong>BMI</strong>
              <span>Recognized</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
