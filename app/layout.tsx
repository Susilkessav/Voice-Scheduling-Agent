import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wellness Partners — Appointment Scheduling",
  description:
    "Schedule, reschedule, or manage your appointments with Riley, our AI voice scheduling assistant at Wellness Partners multi-specialty health clinic.",
  keywords: ["wellness partners", "appointment scheduling", "voice assistant", "health clinic"],
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
