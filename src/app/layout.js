import "./globals.css";

export const metadata = {
  title: "CRBRO — Producer / DJ / Hitmaker",
  description:
    "Official website of CRBRO. Panamanian producer and DJ shaping the sound behind Latin music.",
  icons: {
    icon: [
      {
        url: "/icons/icon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "CRBRO — Producer / DJ / Hitmaker",
    description:
      "Official website of CRBRO. Selected credits, music previews, sound packs and bookings.",
    siteName: "CRBRO",
    type: "website",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "CRBRO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRBRO — Producer / DJ / Hitmaker",
    description:
      "Official website of CRBRO. Selected credits, music previews, sound packs and bookings.",
    images: ["/icons/icon-512.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#111111",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}