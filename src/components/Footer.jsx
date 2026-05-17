import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer brand-footer">
      <Image
        src="/images/crbro-isotype.png"
        alt=""
        width={1080}
        height={1080}
        className="footer-isotype-desktop"
        aria-hidden="true"
      />

      <Image
        src="/images/crbro-isotype.png"
        alt=""
        width={540}
        height={540}
        className="footer-isotype-mobile"
        aria-hidden="true"
      />

      <div className="container brand-footer-grid">
        <div className="footer-hero">
          <Image
            src="/images/crbro-logo.png"
            alt="CRBRO"
            width={440}
            height={180}
            className="footer-logo-img"
          />

          <p className="footer-eyebrow">Producer · DJ · Hitmaker</p>

          <h2 className="footer-title">Built for impact.</h2>

          <p className="footer-copy">
            Music production, DJ sets, sound packs and creative direction built
            from Panama for global records.
          </p>
        </div>

        <div className="footer-nav-panel">
          <div className="footer-link-group">
            <span>Navigation</span>

            <div className="footer-links">
              <Link href="/#about">About</Link>
              <Link href="/#credits">Credits</Link>
              <Link href="/#sound-packs">Sound Packs</Link>
              <Link href="/#booking">Booking</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </div>

          <div className="footer-link-group">
            <span>Contact</span>

            <div className="footer-links">
              <a
                href="https://instagram.com/crbro_"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>

              <a href="mailto:crbrobooking@gmail.com">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-cta-card">
          <span>Availability</span>

          <strong>Open for selected sessions.</strong>

          <p>
            Custom production, private studio sessions, sound direction and
            booking requests.
          </p>

          <Link href="/#booking" className="footer-cta-link">
            Book CRBRO
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} CRBRO</p>

        <p>
          Designed by{" "}
          <a
            href="https://ruptastudios.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rupta-footer-link"
          >
            Rupta Studios
          </a>
        </p>
      </div>
    </footer>
  );
}