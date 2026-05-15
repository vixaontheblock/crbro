const credits = [
  {
    id: "relacion",
    title: "RELACIÓN",
    appleId: "1510779525",
    role: "Production Credit",
  },
  {
    id: "relacion-remix",
    title: "RELACIÓN REMIX",
    appleId: "1529959308",
    role: "Production Credit",
  },
  {
    id: "sal-y-perrea",
    title: "SAL Y PERREA",
    appleId: "1558956397",
    role: "Production Credit",
  },
  {
    id: "911",
    title: "911",
    appleId: "1558956305",
    role: "Production Credit",
  },
  {
    id: "la-luz",
    title: "LA LUZ",
    appleId: "1536517097",
    role: "Production Credit",
  },
  {
    id: "sal-y-perrea-remix",
    title: "SAL Y PERREA REMIX",
    appleId: "1587073235",
    role: "Production Credit",
  },
  {
    id: "911-remix",
    title: "911 REMIX",
    appleId: "1574998381",
    role: "Production Credit",
  },
  {
    id: "borracho",
    title: "BORRACHO",
    appleId: "1595211131",
    role: "Production Credit",
  },
  {
    id: "te-acuerdas",
    title: "TE ACUERDAS",
    appleId: "1558956297",
    role: "Production Credit",
  },
  {
    id: "1am-no-esperes-un-call",
    title: "1AM - NO ESPERES UN CALL",
    appleId: "1860339259",
    role: "Production Credit",
  },
];

function biggerArtwork(url) {
  if (!url) return null;

  return url
    .replace("100x100bb.jpg", "600x600bb.jpg")
    .replace("100x100bb.png", "600x600bb.png");
}

async function lookupAppleTrack(credit) {
  const params = new URLSearchParams({
    id: credit.appleId,
    country: "US",
    entity: "song",
  });

  const response = await fetch(`https://itunes.apple.com/lookup?${params}`, {
    next: { revalidate: 60 * 60 * 12 },
  });

  if (!response.ok) return null;

  const data = await response.json();

  const track = data.results?.find((item) => item.wrapperType === "track");

  if (!track) return null;

  return {
    ...credit,
    found: true,
    trackName: credit.title,
    officialTrackName: track.trackName,
    artistName: track.artistName,
    albumName: track.collectionName,
    artwork: biggerArtwork(track.artworkUrl100),
    previewUrl: track.previewUrl,
    storeUrl: track.trackViewUrl,
    collectionUrl: track.collectionViewUrl,
  };
}

export async function GET() {
  try {
    const results = await Promise.all(credits.map(lookupAppleTrack));
    const tracks = results.filter(Boolean);

    return Response.json({
      source: "Apple iTunes Lookup API",
      tracks,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Music API error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}