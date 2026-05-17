"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") closeMenu();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 18);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.replace("/#", ""));

    function setActiveFromHash() {
      if (window.location.hash) {
        setActiveHref(`/${window.location.hash}`);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveHref(`/#${visible[0].target.id}`);
        }
      },
      {
        root: null,
        threshold: [0.18, 0.28, 0.42],
        rootMargin: "-24% 0px -58% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    setActiveFromHash();
    window.addEventListener("hashchange", setActiveFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", setActiveFromHash);
    };
  }, []);

  return (
    <>
      <header
        className={`brand-nav-wrap ${scrolled ? "is-scrolled" : ""}`}
      >
        <nav className="brand-nav" aria-label="Main navigation">
          <Link href="/" className="brand-logo-wrap" onClick={closeMenu}>
            <Image
              src="/images/crbro-logo.png"
              alt="CRBRO"
              width={220}
              height={90}
              priority
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

          <Link
            href="/#booking"
            className="brand-book-link desktop-book"
            onClick={closeMenu}
          >
            Book
          </Link>

          <button
            type="button"
            className={`mobile-menu-button ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu-panel ${menuOpen ? "is-open" : ""}`}
        onClick={closeMenu}
      >
        <div
          className="mobile-menu-inner"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-menu-head">
            <div>
              <p className="eyebrow">Navigation</p>
              <strong>CRBRO</strong>
            </div>
          </div>

          <div className="mobile-menu-links">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={activeHref === link.href ? "is-active" : ""}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
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

            <Link href="/#booking" onClick={closeMenu}>
              Book CRBRO
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}