import type React from "react";
import type { Metadata } from "next";
import { FrontextInit } from "@/components/frontext-init";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FacebookPixel from "@/components/facebook-pixel";
import { Suspense } from "react";

const inter = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern E-commerce Store",
  description: "A modern and responsive e-commerce website",
  generator: "v0.dev"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Walkway+Semi+Bold&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <FrontextInit />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
