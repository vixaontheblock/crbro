import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav">
        <Link href="/" className="nav-logo">
          CRBRO
        </Link>

        <div className="nav-links">
          <Link href="/#about">About</Link>
          <Link href="/#credits">Credits</Link>
          <Link href="/#booking">Booking</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <Link href="/#booking" className="btn btn-primary nav-action">
          Book
        </Link>
      </nav>
    </header>
  );
}