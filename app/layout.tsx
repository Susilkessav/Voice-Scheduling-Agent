import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schedule a Meeting with Susilkessav",
  description:
    "Schedule, reschedule, or manage your meetings using my personal AI voice assistant.",
  keywords: ["susilkessav", "appointment scheduling", "voice assistant", "developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
