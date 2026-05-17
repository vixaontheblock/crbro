import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer brand-footer">
      <img
        src="/images/crbro-isotype.png"
        alt=""
        className="footer-isotype-desktop"
        aria-hidden="true"
      />

      <img
        src="/images/crbro-isotype.png"
        alt=""
        className="footer-isotype-mobile"
        aria-hidden="true"
      />

      <div className="container footer-grid brand-footer-grid">
        <div>
          <img
            src="/images/crbro-logo.png"
            alt="CRBRO"
            className="footer-logo-img"
          />

          <h2 className="footer-title">Built for impact.</h2>
        </div>

        <div className="footer-links">
          <Link href="/#about">About</Link>
          <Link href="/#credits">Credits</Link>
          <Link href="/#sound-packs">Sound Packs</Link>
          <Link href="/#booking">Booking</Link>
          <Link href="/#contact">Contact</Link>
        </div>

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

      <div className="container footer-bottom">
        <p>© {year} CRBRO</p>
        <p>Designed by Rupta Studios</p>
      </div>
    </footer>
  );
}
