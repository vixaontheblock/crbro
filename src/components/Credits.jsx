"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Credits() {
  const audioRef = useRef(null);
  const railRef = useRef(null);
  const playingIdRef = useRef(null);
  const hasInteracted = useRef(false);

  const [tracks, setTracks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const activeTrack = useMemo(() => tracks[activeIndex] || null, [tracks, activeIndex]);

  // Load tracks
  useEffect(() => {
    let cancelled = false;
    async function loadTracks() {
      try {
        const res = await fetch("/api/music/credits");
        const data = await res.json();
        if (!cancelled && Array.isArray(data.tracks)) setTracks(data.tracks);
      } catch (err) {
        console.error("Credits load error:", err);
      }
    }
    loadTracks();
    return () => { cancelled = true; };
  }, []);

  // Audio setup
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleEnded = () => {
      playingIdRef.current = null;
      setPlayingId(null);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Scroll active card into view when activeIndex changes programmatically
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || tracks.length === 0) return;
    const card = rail.querySelector(`[data-credit-index="${activeIndex}"]`);
    if (!card) return;
    const railCenter = rail.clientWidth / 2;
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    rail.scrollTo({ left: cardCenter - railCenter, behavior: "smooth" });
  }, [activeIndex, tracks]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (!tracks.length) return;
      if (e.key === "ArrowRight") {
        setActiveIndex(i => Math.min(i + 1, tracks.length - 1));
        stopPreview();
      } else if (e.key === "ArrowLeft") {
        setActiveIndex(i => Math.max(i - 1, 0));
        stopPreview();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tracks]);

  function stopPreview() {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    playingIdRef.current = null;
    setPlayingId(null);
    setProgress(0);
  }

  function handleRailScroll() {
    const rail = railRef.current;
    if (!rail || tracks.length === 0) return;

    // Hide hint on first interaction
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      setShowHint(false);
    }

    const cards = Array.from(rail.querySelectorAll("[data-credit-index]"));
    const railCenter = rail.scrollLeft + rail.clientWidth / 2;

    let closestIndex = activeIndex;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const index = Number(card.dataset.creditIndex);
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - railCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      stopPreview();
      setActiveIndex(closestIndex);
    }
  }

  function handleWheel(event) {
    const rail = railRef.current;
    if (!rail) return;
    if (window.innerWidth <= 900) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX : event.deltaY;

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const atStart = rail.scrollLeft <= 2;
    const atEnd = rail.scrollLeft >= maxScroll - 2;
    if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

    event.preventDefault();
    rail.scrollBy({ left: delta, behavior: "auto" });
  }

  // Click card to activate it
  function handleCardClick(index) {
    if (index === activeIndex) return;
    stopPreview();
    setActiveIndex(index);
  }

  async function togglePreview(track, e) {
    e.stopPropagation(); // don't trigger card click
    if (!track?.previewUrl || !audioRef.current) return;
    const audio = audioRef.current;

    if (playingIdRef.current === track.id) {
      audio.pause();
      playingIdRef.current = null;
      setPlayingId(null);
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audio.src = track.previewUrl;
    try {
      await audio.play();
      playingIdRef.current = track.id;
      setPlayingId(track.id);
      setProgress(0);
    } catch (err) {
      console.error("Preview play error:", err);
      playingIdRef.current = null;
      setPlayingId(null);
    }
  }

  return (
    <section id="credits" className="credits-section credits-carousel-section">
      <div className="container">
        <div className="credits-carousel-head">
          <div className="section-intro">
            <span className="kicker">Selected Credits</span>
            <h2 className="title credits-carousel-title">Records in motion.</h2>
          </div>
          <p className="body credits-carousel-body">
            Selected records connected to CRBRO&apos;s production, sound and creative
            direction. Scroll through the credits and play previews.
          </p>
        </div>

        {activeTrack && (
          <div className="credits-current-row">
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(tracks.length).padStart(2, "0")}
            </span>
            <strong>{activeTrack.trackName || activeTrack.title}</strong>
            <p>{activeTrack.artistName}</p>
          </div>
        )}

        <div className="credits-carousel-shell" onWheel={handleWheel}>
          <div
            ref={railRef}
            className="credits-carousel-rail"
            onScroll={handleRailScroll}
          >
            {tracks.map((track, index) => (
              <article
                key={track.id}
                data-credit-index={index}
                className={`credits-carousel-card ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => handleCardClick(index)}
                style={{ cursor: index !== activeIndex ? "pointer" : "default" }}
              >
                <div className="credits-carousel-cover">
                  {track.artwork ? (
                    <Image
                      src={track.artwork}
                      alt={track.trackName || track.title}
                      fill
                      sizes="(max-width: 900px) 86vw, 420px"
                      className="credits-carousel-image"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="credits-carousel-fallback">CRBRO</div>
                  )}
                </div>

                <div className="credits-carousel-info">
                  <div className="credits-carousel-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{track.role || "Production Credit"}</span>
                  </div>

                  <div>
                    <p>{track.artistName}</p>
                    <h3>{track.trackName || track.title}</h3>
                  </div>

                  <div>
                    <div className="credits-carousel-meta">
                      <span>{track.albumName || "Selected Credit"}</span>
                      <span>{playingId === track.id ? "Playing" : "Preview"}</span>
                    </div>

                    <div className="credits-carousel-progress">
                      <span
                        style={{
                          width: playingId === track.id ? `${progress}%` : "0%",
                        }}
                      />
                    </div>

                    <div className="credits-carousel-actions">
                      <button
                        type="button"
                        disabled={!track.previewUrl}
                        onClick={(e) => togglePreview(track, e)}
                      >
                        {playingId === track.id ? "Pause" : "Play"}
                      </button>
                      {track.storeUrl && (
                        <a href={track.storeUrl} target="_blank" rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}>
                          Open
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="credits-carousel-footer">
          <span
            className="credits-scroll-hint"
            style={{
              opacity: showHint ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
          >
            Scroll / swipe
          </span>

          <div className="credits-carousel-bar">
            <i
              style={{
                width: tracks.length > 0
                  ? `${((activeIndex + 1) / tracks.length) * 100}%`
                  : "0%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
