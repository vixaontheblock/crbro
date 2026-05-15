import Link from "next/link";

export default function Navbar() {
  return (
    <header className="brand-nav-wrap">
      <nav className="brand-nav">
        <Link href="/" className="brand-logo-wrap">
          <img
            src="/images/crbro-logo.png"
            alt="CRBRO"
            className="brand-logo-img"
          />
        </Link>

        <div className="brand-nav-links">
          <Link href="/#about">About</Link>
          <Link href="/#credits">Credits</Link>
          <Link href="/#booking">Booking</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <Link href="/#booking" className="brand-book-link">
          Book
        </Link>
      </nav>
    </header>
  );
}