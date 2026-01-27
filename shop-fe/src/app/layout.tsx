import type { Metadata } from "next";
import { Geist_Mono, Karla } from "next/font/google";
import "./globals.css";
import LayoutRoot from "./RootLayout";
import { Toaster } from "@/components/ui/sonner";
import { getSession } from "@/lib/session";
import { AuthProvider } from "@/context/AuthContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: {
    default: "LUXE - Premium Fashion & Style",
    template: "%s | LUXE"
  },
  description: "Discover timeless elegance and contemporary style at LUXE. Curated premium fashion for the modern, sophisticated individual. Elevate your wardrobe with our exclusive collections.",
  keywords: [
    "luxury fashion",
    "premium clothing",
    "designer wear",
    "contemporary style",
    "high-end fashion",
    "elegant apparel",
    "LUXE fashion",
    "exclusive collections"
  ],
  authors: [{ name: "LUXE Fashion" }],
  creator: "LUXE",
  publisher: "LUXE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shop.hidras.xyz"), // Thay bằng domain thật của bạn
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://shop.hidras.xyz",
    siteName: "LUXE",
    title: "LUXE - Premium Fashion & Style",
    description: "Discover timeless elegance and contemporary style. Curated premium fashion for the sophisticated individual.",
    images: [
      {
        url: "/og-image.jpg", // Tạo image này 1200x630px
        width: 1200,
        height: 630,
        alt: "LUXE Premium Fashion",
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "LUXE - Premium Fashion & Style",
    description: "Discover timeless elegance and contemporary style. Curated premium fashion for the sophisticated individual.",
    images: ["/twitter-image.jpg"], // 1200x600px
    creator: "@luxe_fashion", // Thay bằng Twitter handle thật
  },
  
  // Icons & Favicons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Robots & Verification
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification (add your actual verification codes)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
  
  // Category
  category: "fashion",
  
  // Additional metadata
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#ffffff",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${karla.variable} ${geistMono.variable} karla antialiased bg-(--color-background)`}
      >
        <AuthProvider>
          <LayoutRoot>{children}</LayoutRoot>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
