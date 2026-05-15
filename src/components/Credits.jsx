"use client";

import { useEffect, useMemo, useState } from "react";

const credits = [
  {
    title: "RELACIÓN REMIX",
    meta: "Sech · Remix",
    role: "Production Credit",
    spotifyId: "PEGAR_ID_AQUI",
  },
  {
    title: "LA LUZ",
    meta: "Sech · J Balvin",
    role: "Production Credit",
    spotifyId: "PEGAR_ID_AQUI",
  },
  {
    title: "GIRL LIKE YOU",
    meta: "Sech",
    role: "Production Credit",
    spotifyId: "PEGAR_ID_AQUI",
  },
  {
    title: "911 REMIX",
    meta: "Sech · Remix",
    role: "Production Credit",
    spotifyId: "PEGAR_ID_AQUI",
  },
  {
    title: "SAL Y PERREA",
    meta: "Sech",
    role: "Production Credit",
    spotifyId: "PEGAR_ID_AQUI",
  },
  {
    title: "LLUEVE",
    meta: "Wisin & Yandel · Sech",
    role: "Production Credit",
    spotifyId: "PEGAR_ID_AQUI",
  },
];

function formatDuration(ms) {
  if (!ms) return "";
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function Credits() {
  const [spotifyTracks, setSpotifyTracks] = useState({});
  const [loading, setLoading] = useState(true);

  const validIds = useMemo(() => {
    return credits
      .map((credit) => credit.spotifyId)
      .filter((id) => id && id !== "PEGAR_ID_AQUI");
  }, []);

  useEffect(() => {
    if (validIds.length === 0) {
      setLoading(false);
      return;
    }

    async function loadTracks() {
      try {
        const response = await fetch(
          `/api/spotify/tracks?ids=${validIds.join(",")}`
        );

        const data = await response.json();

        const mappedTracks = {};

        data.tracks?.forEach((track) => {
          mappedTracks[track.id] = track;
        });

        setSpotifyTracks(mappedTracks);
      } catch (error) {
        console.error("Spotify fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTracks();
  }, [validIds]);

  return (
    <section id="credits" className="section credits-section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Credits</p>

            <h2 className="title">Selected works.</h2>
          </div>

          <p className="body" style={{ maxWidth: "430px" }}>
            Live Spotify metadata connected to selected CRBRO credits: official
            artwork, track data, preview availability and streaming links.
          </p>
        </div>

        <div className="credits-grid spotify-credits-grid">
          {credits.map((credit, index) => {
            const track = spotifyTracks[credit.spotifyId];
            const title = track?.name || credit.title;
            const artists = track?.artists || credit.meta;
            const image = track?.image;
            const duration = formatDuration(track?.durationMs);

            return (
              <article className="credit-card spotify-credit-card" key={credit.title}>
                <div className="credit-top">
                  <span className="credit-index">0{index + 1}</span>
                  <span className="credit-pill">
                    {loading ? "Loading" : "Spotify"}
                  </span>
                </div>

                <div className="spotify-art-wrap">
                  {image ? (
                    <img
                      className="spotify-art"
                      src={image}
                      alt={`${title} album artwork`}
                    />
                  ) : (
                    <div className="spotify-art-placeholder">
                      <span>CRBRO</span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="credit-meta">{artists}</p>

                  <h3 className="credit-title">{title}</h3>

                  <div className="spotify-track-info">
                    <span>{credit.role}</span>
                    {duration && <span>{duration}</span>}
                  </div>

                  {track?.previewUrl ? (
                    <audio
                      className="spotify-preview"
                      controls
                      src={track.previewUrl}
                    />
                  ) : (
                    <p className="spotify-no-preview">
                      Preview unavailable. Listen on Spotify.
                    </p>
                  )}

                  <div className="spotify-actions">
                    {track?.spotifyUrl ? (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        className="spotify-button"
                      >
                        Open on Spotify
                      </a>
                    ) : (
                      <span className="spotify-button disabled">
                        Add Spotify ID
                      </span>
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