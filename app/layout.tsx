import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice Scheduling Assistant",
  description:
    "Schedule meetings effortlessly with our AI voice assistant. Just speak naturally — tell us your name, pick a time, and we'll create a calendar event for you.",
  keywords: ["voice assistant", "scheduling", "calendar", "AI", "meeting"],
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
