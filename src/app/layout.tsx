import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interRegular = localFont({
  src: "./fonts/Inter-Regular.ttf",
  variable: "--font-inter-regular",
  weight: "400",
});

const interSemibold = localFont({
  src: "./fonts/Inter-Semibold.ttf",
  variable: "--font-inter-semibold",
  weight: "600",
});

export const metadata: Metadata = {
  title: "BMI Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interRegular.variable} ${interSemibold.variable} antialiased`}>{children}</body>
    </html>
  );
}
