import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FacebookPixel from "@/components/facebook-pixel";
import { Suspense } from "react";

const inter = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "إيدن أجنسي - اشتراكات البرمجيات (شاتGBT، أدوبي، وغيرها)",
  description: "إيدن أجنسي متخصصة في بيع الاشتراكات الرقمية مثل شاتGBT، أدوبي، والمزيد بأفضل الأسعار.",
  keywords: ["إيدن أجنسي", "اشتراكات رقمية", "اشتراك شاتGBT", "اشتراك أدوبي", "برمجيات مميزة"],
  openGraph: {
    title: "إيدن أجنسي - اشتراكات البرمجيات الرقمية",
    description: "إيدن أجنسي متخصصة في بيع الاشتراكات الرقمية مثل شاتGBT، أدوبي، والمزيد بأفضل الأسعار.",
    siteName: "إيدن أجنسي",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "إيدن أجنسي - اشتراكات البرمجيات الرقمية",
    description: "إيدن أجنسي متخصصة في بيع الاشتراكات الرقمية مثل شاتGBT، أدوبي، والمزيد بأفضل الأسعار.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metaParamBuilderScriptUrl = process.env.META_PARAM_BUILDER_SCRIPT_URL;

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Walkway+Semi+Bold&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <Suspense fallback={null}>
          <FacebookPixel paramBuilderScriptUrl={metaParamBuilderScriptUrl} />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
