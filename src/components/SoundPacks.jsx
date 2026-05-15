"use client";

import { useState } from "react";
import Link from "next/link";

const packs = [
  {
    id: "drum-kit",
    title: "Drum Kit",
    tag: "Producer Tools",
    price: "$29",
    description:
      "Punchy drums, percs, kicks, snares and textures built for Latin urban records.",
    includes: ["Kicks", "Snares", "Percs", "One-shots"],
    previews: ["Kick Preview", "Snare Preview", "Perc Loop"],
  },
  {
    id: "sample-pack",
    title: "Sample Pack",
    tag: "Melody Pack",
    price: "$39",
    description:
      "Melodic loops, atmospheres and ideas made for artists and producers looking for a darker CRBRO-inspired sound.",
    includes: ["Loops", "Stems", "Textures", "MIDI ideas"],
    previews: ["Melody Loop 01", "Atmosphere Loop", "Texture Preview"],
  },
  {
    id: "beat-pack",
    title: "Beat Pack",
    tag: "Starter Pack",
    price: "$99",
    description:
      "A curated pack of beats and ideas for artists who want to start writing immediately.",
    includes: ["Beats", "MP3 previews", "License info", "Session direction"],
    previews: ["Beat Preview 01", "Beat Preview 02", "Arrangement Idea"],
  },
];

export default function SoundPacks() {
  const [selectedPack, setSelectedPack] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  function openPack(pack) {
    setSelectedPack(pack);
    setShowPayment(false);
  }

  function closePack() {
    setSelectedPack(null);
    setShowPayment(false);
  }

  return (
    <>
      <section id="sound-packs" className="sound-packs-section crbro-packs">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Sound Packs</p>

              <h2 className="title">
                Sounds made for producers, artists and sessions.
              </h2>
            </div>

            <p className="body crbro-packs-intro">
              Exclusive CRBRO-inspired kits, samples and beat packs. Preview the
              experience before requesting access.
            </p>
          </div>

          <div className="crbro-packs-grid">
            {packs.map((pack, index) => (
              <article className="crbro-pack-card" key={pack.id}>
                <div className="crbro-pack-card-top">
                  <span>0{index + 1}</span>
                  <span>{pack.tag}</span>
                </div>

                <div className="crbro-pack-card-main">
                  <h3>{pack.title}</h3>
                  <p>{pack.description}</p>
                </div>

                <div className="crbro-pack-includes">
                  {pack.includes.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="crbro-pack-bottom">
                  <strong>{pack.price}</strong>

                  <button
                    type="button"
                    className="crbro-pack-button"
                    onClick={() => openPack(pack)}
                  >
                    Preview
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="crbro-packs-note">
            <p>
              Full packs are delivered after payment confirmation. Only short
              previews will be available on the website.
            </p>

            <Link href="/#booking">Book a custom sound pack</Link>
          </div>
        </div>
      </section>

      {selectedPack && (
        <div className="pack-modal-overlay" onClick={closePack}>
          <div className="pack-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="pack-modal-close"
              onClick={closePack}
            >
              Close
            </button>

            <div className="pack-modal-head">
              <p className="eyebrow">Pack Preview</p>

              <h2>{selectedPack.title}</h2>

              <p>
                This is a preview experience. Final sounds will be added as
                short protected snippets before launch. Full packs are never
                publicly exposed on the website.
              </p>
            </div>

            <div className="pack-preview-list">
              {selectedPack.previews.map((preview, index) => (
                <div className="pack-preview-item preview-locked" key={preview}>
                  <div>
                    <strong>{preview}</strong>
                    <span>Preview coming soon</span>
                  </div>

                  <button type="button" disabled>
                    Locked
                  </button>

                  <div className="pack-preview-progress">
                    <span style={{ width: `${20 + index * 18}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {!showPayment ? (
              <button
                type="button"
                className="pack-payment-main"
                onClick={() => setShowPayment(true)}
              >
                Proceed to Payment
              </button>
            ) : (
              <div className="pack-payment-panel">
                <div>
                  <h3>Direct Payment</h3>

                  <p>
                    Choose a direct payment method. Access is sent manually after
                    payment confirmation.
                  </p>
                </div>

                <div className="pack-payment-options">
                  <a
                    href={`mailto:crbrobooking@gmail.com?subject=${selectedPack.title} Payment Request&body=Hi CRBRO team,%0A%0AI want to purchase: ${selectedPack.title}%0APrice: ${selectedPack.price}%0A%0APlease send me payment instructions.%0A`}
                  >
                    Request Payment Details
                  </a>

                  <a
                    href={`mailto:crbrobooking@gmail.com?subject=${selectedPack.title} Payment Proof&body=Hi CRBRO team,%0A%0AI paid for: ${selectedPack.title}%0APrice: ${selectedPack.price}%0A%0AI am attaching my payment proof.%0A`}
                  >
                    Send Payment Proof
                  </a>
                </div>

                <p className="pack-payment-disclaimer">
                  The full sound pack is delivered manually after payment
                  verification.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}