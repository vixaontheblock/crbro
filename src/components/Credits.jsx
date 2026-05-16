"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Credits() {
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const activeIndexRef = useRef(0);
  const playingIdRef = useRef(null);

  const [tracks, setTracks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState(0);

  const activeTrack = useMemo(() => {
    return tracks[activeIndex] || null;
  }, [tracks, activeIndex]);

  useEffect(() => {
    let cancelled = false;

    async function loadTracks() {
      try {
        const response = await fetch("/api/music/credits");
        const data = await response.json();

        if (!cancelled && Array.isArray(data.tracks)) {
          setTracks(data.tracks);
        }
      } catch (error) {
        console.error("Credits load error:", error);
      }
    }

    loadTracks();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    function updateProgress() {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    }

    function handleEnded() {
      playingIdRef.current = null;
      setPlayingId(null);
      setProgress(0);
    }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    let frameId = null;

    function stopPreview() {
      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      playingIdRef.current = null;
      setPlayingId(null);
      setProgress(0);
    }

    function updateActiveTrack() {
      const section = sectionRef.current;

      if (!section || tracks.length === 0) {
        ticking = false;
        return;
      }

      const start = section.offsetTop;
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const currentScroll = window.scrollY - start;

      const rawProgress = currentScroll / scrollableDistance;
      const safeProgress = Math.min(Math.max(rawProgress, 0), 1);

      const nextIndex = Math.min(
        tracks.length - 1,
        Math.round(safeProgress * (tracks.length - 1))
      );

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        stopPreview();
        setActiveIndex(nextIndex);
      }

      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true;
        frameId = window.requestAnimationFrame(updateActiveTrack);
      }
    }

    frameId = window.requestAnimationFrame(updateActiveTrack);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveTrack);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveTrack);
    };
  }, [tracks.length]);

  function scrollToTrack(index) {
    const section = sectionRef.current;

    if (!section || tracks.length <= 1) return;

    const start = section.offsetTop;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const target = start + scrollableDistance * (index / (tracks.length - 1));

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  }

  async function togglePreview(track) {
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
    } catch (error) {
      console.error("Preview play error:", error);
      playingIdRef.current = null;
      setPlayingId(null);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="credits"
      className="credits-section credits-scroll-section"
      style={{ "--credits-count": Math.max(tracks.length, 1) }}
    >
      <div className="credits-sticky">
        <div className="container credits-showcase-grid">
          <div className="credits-showcase-copy">
            <p className="eyebrow">Selected Credits</p>

            <h2 className="title credits-showcase-title">
              Records in motion.
            </h2>

            <p className="body credits-showcase-body">
              Selected records connected to CRBRO’s production, sound and
              creative direction. Keep scrolling to move through each credit.
            </p>

            {activeTrack && (
              <div className="credits-active-meta">
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(tracks.length).padStart(2, "0")}
                </span>

                <strong>{activeTrack.trackName || activeTrack.title}</strong>

                <p>{activeTrack.artistName}</p>
              </div>
            )}

            <div className="credits-scroll-rail">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  type="button"
                  className={index === activeIndex ? "is-active" : ""}
                  onClick={() => scrollToTrack(index)}
                  aria-label={`Go to ${track.trackName || track.title}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{track.trackName || track.title}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="credits-slide-stage">
            {activeTrack ? (
              <article key={activeTrack.id} className="credits-slide-card">
                <div className="credits-slide-cover">
                  {activeTrack.artwork ? (
                    <Image
                      src={activeTrack.artwork}
                      alt={activeTrack.trackName || activeTrack.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 320px"
                      className="credits-slide-image"
                      priority={activeIndex === 0}
                    />
                  ) : (
                    <div className="credits-slide-fallback">CRBRO</div>
                  )}
                </div>

                <div className="credits-slide-content">
                  <div>
                    <div className="credits-slide-top">
                      <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                      <span>{activeTrack.role || "Production Credit"}</span>
                    </div>

                    <p>{activeTrack.artistName}</p>

                    <h3>{activeTrack.trackName || activeTrack.title}</h3>
                  </div>

                  <div>
                    <div className="credits-slide-meta">
                      <span>{activeTrack.albumName || "Selected Credit"}</span>
                      <span>
                        {playingId === activeTrack.id ? "Playing" : "Preview"}
                      </span>
                    </div>

                    <div className="credits-slide-progress">
                      <span
                        style={{
                          width:
                            playingId === activeTrack.id ? `${progress}%` : "0%",
                        }}
                      />
                    </div>

                    <div className="credits-slide-actions">
                      <button
                        type="button"
                        disabled={!activeTrack.previewUrl}
                        onClick={() => togglePreview(activeTrack)}
                      >
                        {playingId === activeTrack.id ? "Pause" : "Play"}
                      </button>

                      {activeTrack.storeUrl && (
                        <a
                          href={activeTrack.storeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <div className="credits-slide-loading">
                <p className="eyebrow">Loading</p>
                <h3>Fetching credits.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}