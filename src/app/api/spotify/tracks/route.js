export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawIds = searchParams.get("ids");

  if (!rawIds) {
    return Response.json({ tracks: [] });
  }

  const ids = rawIds
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 10);

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json(
      { error: "Missing Spotify credentials" },
      { status: 500 }
    );
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      return Response.json(
        { error: "Could not authenticate with Spotify" },
        { status: tokenResponse.status }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const trackRequests = ids.map(async (id) => {
      const trackResponse = await fetch(
        `https://api.spotify.com/v1/tracks/${id}?market=PA`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          next: { revalidate: 3600 },
        }
      );

      if (!trackResponse.ok) return null;

      const track = await trackResponse.json();

      return {
        id: track.id,
        name: track.name,
        artists: track.artists?.map((artist) => artist.name).join(", "),
        album: track.album?.name,
        image: track.album?.images?.[0]?.url,
        spotifyUrl: track.external_urls?.spotify,
        previewUrl: track.preview_url,
        durationMs: track.duration_ms,
        explicit: track.explicit,
      };
    });

    const tracks = (await Promise.all(trackRequests)).filter(Boolean);

    return Response.json({ tracks });
  } catch (error) {
    return Response.json(
      { error: "Spotify API error", details: error.message },
      { status: 500 }
    );
  }
}