"use client";

import { useState } from "react";

export default function Booking() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="booking" className="section">
      <div className="container booking-grid">
        <div>
          <p className="eyebrow">Booking</p>

          <h2 className="title">Let&apos;s create something iconic.</h2>

          <p className="body" style={{ marginTop: "26px", maxWidth: "460px" }}>
            For production, DJ sets, studio sessions, collaborations and
            official inquiries.
          </p>

          <div style={{ marginTop: "34px", display: "grid", gap: "12px" }}>
            <a className="body" href="mailto:crbrobooking@gmail.com">
              crbrobooking@gmail.com
            </a>

            <a
              className="body"
              href="https://instagram.com/crbro_"
              target="_blank"
              rel="noopener noreferrer"
            >
              @crbro_
            </a>
          </div>
        </div>

        <form className="booking-card glass" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              className="field"
              type="text"
              name="name"
              placeholder="Name"
              required
            />

            <input
              className="field"
              type="email"
              name="email"
              placeholder="Email"
              required
            />

            <select className="field" name="inquiry" defaultValue="" required>
              <option value="" disabled>
                Inquiry Type
              </option>
              <option>Production</option>
              <option>DJ Set</option>
              <option>Studio Session</option>
              <option>Collaboration</option>
              <option>Press / Media</option>
            </select>

            <select className="field" name="budget" defaultValue="">
              <option value="">Budget Range (optional)</option>
              <option>Under $500</option>
              <option>$500 – $2,000</option>
              <option>$2,000 – $10,000</option>
              <option>$10,000+</option>
              <option>Prefer to discuss</option>
            </select>

            <textarea
              className="field"
              name="message"
              placeholder="Tell us about the project"
              required
            />

            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Request"}
            </button>

            {status === "success" && (
              <p style={{ color: "#c9a84c", fontSize: "0.85rem" }}>
                ✓ Request sent. We&apos;ll be in touch soon.
              </p>
            )}

            {status === "error" && (
              <p style={{ color: "#c0392b", fontSize: "0.85rem" }}>
                Something went wrong. Email us directly at crbrobooking@gmail.com
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
