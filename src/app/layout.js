import "./globals.css";

export const metadata = {
  title: "CRBRO — Producer / DJ / Engineer",
  description:
    "Official website of CRBRO. Producer, DJ and engineer shaping the sound behind latin music.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}