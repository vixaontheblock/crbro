"use client";

import { useEffect, useRef, useState } from "react";

export default function Credits() {
  const audioRef = useRef(null);

  const [tracks, setTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function loadCredits() {
      try {
        const response = await fetch("/api/music/credits");
        const data = await response.json();
        setTracks(data.tracks || []);
      } catch (error) {
        console.error("Music credits error:", error);
      }
    }

    loadCredits();
  }, []);

  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
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

  async function togglePreview(track) {
    const audio = audioRef.current;

    if (!audio || !track.previewUrl) return;

    if (activeTrack === track.id && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (activeTrack !== track.id) {
      audio.pause();
      audio.src = track.previewUrl;
      audio.currentTime = 0;
      setProgress(0);
      setActiveTrack(track.id);
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Preview play error:", error);
      setIsPlaying(false);
    }
  }

  return (
    <section id="credits" className="section credits-section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Credits</p>
            <h2 className="title">Selected works.</h2>
          </div>

          <p className="body" style={{ maxWidth: "440px" }}>
            Selected records connected to CRBRO’s sound, with live artwork,
            official metadata and preview playback.
          </p>
        </div>

        <div className="music-grid">
          {tracks.map((track, index) => {
            const active = activeTrack === track.id;
            const playing = active && isPlaying;

            return (
              <article
                className={`music-card ${active ? "is-playing" : ""}`}
                key={track.id}
              >
                <div className="music-card-top">
                  <span>0{index + 1}</span>
                  <span>{track.previewUrl ? "Preview" : "Credit"}</span>
                </div>

                <div className="music-cover">
                  {track.artwork ? (
                    <img
                      src={track.artwork}
                      alt={`${track.trackName || track.title} artwork`}
                    />
                  ) : (
                    <div className="music-cover-fallback">CRBRO</div>
                  )}
                </div>

                <div className="music-copy">
                  <p className="music-artist">
                    {track.artistName || "CRBRO Credit"}
                  </p>

                  <h3>{track.trackName || track.title}</h3>

                  <div className="music-meta">
                    <span>{track.role}</span>
                    <span>{track.previewUrl ? "30s Preview" : "No Preview"}</span>
                  </div>

                  <div className="music-progress">
                    <span style={{ width: active ? `${progress}%` : "0%" }} />
                  </div>

                  <div className="music-actions">
                    <button
                      type="button"
                      disabled={!track.previewUrl}
                      onClick={() => togglePreview(track)}
                    >
                      {playing ? "Pause" : "Play"}
                    </button>

                    {track.storeUrl && (
                      <a href={track.storeUrl} target="_blank">
                        Open
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}