import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://www.d-nelson.com";

export const metadata: Metadata = {
  title: "Danny Nelson — Blog",
  description: "Personal blog by Danny Nelson. Thoughts and ideas.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Danny Nelson",
    description: "Personal blog by Danny Nelson. Thoughts and ideas.",
    url: siteUrl,
    siteName: "Danny Nelson",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danny Nelson",
    description: "Personal blog by Danny Nelson. Thoughts and ideas.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Danny Nelson. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
