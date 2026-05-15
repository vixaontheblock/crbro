import "./globals.css";

export const metadata = {
  title: "CRBRO — Producer / DJ / Hitmaker",
  description:
    "Official website of CRBRO. Panamanian producer and DJ shaping the sound behind Latin music.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}