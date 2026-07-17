import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aimal Asim — Full Stack Developer",
  description:
    "Aimal Asim, full stack developer. Backend, real-time systems, MERN stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
