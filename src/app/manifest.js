export default function manifest() {
  return {
    name: "CRBRO",
    short_name: "CRBRO",
    description:
      "Official CRBRO website for selected credits, sound packs, previews and bookings.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}