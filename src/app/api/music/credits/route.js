const credits = [
  {
    id: "relacion-remix",
    title: "RELACIÓN (REMIX)",
    query: "Relación Remix Sech Daddy Yankee J Balvin Rosalia Farruko",
    expectedArtists: ["sech", "daddy yankee", "j balvin", "rosalia", "farruko"],
    role: "Production Credit",
  },
  {
    id: "la-luz",
    title: "LA LUZ",
    query: "La Luz Sech J Balvin",
    expectedArtists: ["sech", "j balvin"],
    role: "Production Credit",
  },
  {
    id: "girl-like-you",
    title: "GIRL LIKE YOU",
    query: "Girl Like You Sech Tyga",
    expectedArtists: ["sech", "tyga", "dimelo flow"],
    role: "Production Credit",
  },
  {
    id: "911-remix",
    title: "911 REMIX",
    query: "911 Remix Sech Jhayco",
    expectedArtists: ["sech", "jhayco", "jhay cortez"],
    role: "Production Credit",
  },
  {
    id: "sal-y-perrea",
    title: "SAL Y PERREA (REMIX)",
    query: "Sal y Perrea Remix Sech Daddy Yankee J Balvin",
    expectedArtists: ["sech", "daddy yankee", "j balvin"],
    role: "Production Credit",
  },
  {
    id: "llueve",
    title: "LLUEVE",
    query: "Llueve Wisin Yandel Sech Jhayco",
    expectedArtists: ["wisin", "yandel", "sech", "jhayco"],
    role: "Production Credit",
  },
];

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function biggerArtwork(url) {
  if (!url) return null;

  return url
    .replace("100x100bb.jpg", "600x600bb.jpg")
    .replace("100x100bb.png", "600x600bb.png");
}

function scoreResult(item, credit) {
  const trackName = normalize(item.trackName);
  const artistName = normalize(item.artistName);
  const collectionName = normalize(item.collectionName);
  const combined = `${trackName} ${artistName} ${collectionName}`;

  let score = 0;

  const titleWords = normalize(credit.title).split(" ").filter(Boolean);

  titleWords.forEach((word) => {
    if (combined.includes(word)) score += 4;
  });

  credit.expectedArtists.forEach((artist) => {
    if (combined.includes(normalize(artist))) score += 8;
  });

  if (trackName.includes(normalize(credit.title))) score += 12;

  if (credit.id === "911-remix" && combined.includes("lady gaga")) {
    score -= 100;
  }

  if (credit.id === "911-remix" && combined.includes("madeon")) {
    score -= 100;
  }

  return score;
}

async function searchAppleMusic(credit) {
  const params = new URLSearchParams({
    term: credit.query,
    media: "music",
    entity: "song",
    limit: "25",
    country: "US",
  });

  const response = await fetch(`https://itunes.apple.com/search?${params}`, {
    next: { revalidate: 60 * 60 * 12 },
  });

  if (!response.ok) {
    return { ...credit, found: false };
  }

  const data = await response.json();
  const results = data.results || [];

  const ranked = results
    .map((item) => ({
      item,
      score: scoreResult(item, credit),
    }))
    .sort((a, b) => b.score - a.score);

  const bestMatch = ranked[0]?.score > 0 ? ranked[0].item : null;

  if (!bestMatch) {
    return { ...credit, found: false };
  }

  return {
    ...credit,
    found: true,
    trackName: bestMatch.trackName,
    artistName: bestMatch.artistName,
    albumName: bestMatch.collectionName,
    artwork: biggerArtwork(bestMatch.artworkUrl100),
    previewUrl: bestMatch.previewUrl,
    storeUrl: bestMatch.trackViewUrl,
    collectionUrl: bestMatch.collectionViewUrl,
  };
}

export async function GET() {
  try {
    const tracks = await Promise.all(credits.map(searchAppleMusic));

    return Response.json({
      source: "Apple iTunes Search API",
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