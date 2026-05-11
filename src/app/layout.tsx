import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Wify.my | Premium Story Platform",
    template: "%s | Wify.my",
  },
  description: "Experience immersive text stories through a seamless swipe interface. Premium stories for the modern age.",
  metadataBase: new URL("https://wify.my"),
  keywords: ["stories", "swipe stories", "reading app", "short stories", "immersive reading", "Wify"],
  authors: [{ name: "Unstory Team" }],
  creator: "Unstory Team",
  publisher: "Wify.my",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Wify.my | Premium Story Platform",
    description: "Experience immersive text stories through a seamless swipe interface.",
    url: "https://wify.my",
    siteName: "Wify.my",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Wify.my - Swipe to Immerse",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wify.my | Premium Story Platform",
    description: "Experience immersive text stories through a seamless swipe interface.",
    images: ["/og-image.png"],
    creator: "@unstory_app",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Wify",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-background text-white min-h-screen pb-20 md:pb-0 flex flex-col`}>
        <AppHeader />
        <main className="max-w-[1440px] mx-auto flex-1 w-full">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
