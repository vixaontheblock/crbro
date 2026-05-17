"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { label: "About", href: "/#about" },
  { label: "Credits", href: "/#credits" },
  { label: "Sound Packs", href: "/#sound-packs" },
  { label: "Booking", href: "/#booking" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = links
      .map((l) => l.href.replace("/#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`/#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="brand-nav-wrap">
        <nav className="brand-nav">
          <Link href="/" className="brand-logo-wrap" onClick={closeMenu}>
            <img
              src="/images/crbro-logo.png"
              alt="CRBRO"
              className="brand-logo-img"
            />
          </Link>

          <div className="brand-nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={activeHref === link.href ? "is-active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/#booking" className="brand-book-link desktop-book">
            Book
          </Link>

          <button
            type="button"
            className={`mobile-menu-button ${menuOpen ? "is-open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className={`mobile-menu-panel ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-head">
            <p className="eyebrow">Navigation</p>
            <span>CRBRO</span>
          </div>

          <div className="mobile-menu-links">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={activeHref === link.href ? "is-active" : ""}
              >
                <span>0{index + 1}</span>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mobile-menu-footer">
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
    </>
  );
}
