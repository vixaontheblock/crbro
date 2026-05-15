import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">CRBRO</p>

          <h2 className="footer-title">
            Built for impact.
          </h2>
        </div>

        <div className="footer-links">
          <Link href="/#about">About</Link>
          <Link href="/#credits">Credits</Link>
          <Link href="/#booking">Booking</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <div className="footer-links">
          <a href="https://instagram.com/crbro_" target="_blank">
            Instagram
          </a>

          <a href="mailto:crbrobooking@gmail.com">
            Email
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 CRBRO</p>
        <p>Designed by Rupta Studios</p>
      </div>
    </footer>
  );
}