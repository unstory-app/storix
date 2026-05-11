import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import MobileBottomNav from "@/components/MobileBottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wify.my | Immersive Vertical Stories",
  description: "Read bite-sized, emotional, and addictive text stories with a premium swipe experience.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-background text-white min-h-screen pb-20 md:pb-0`}>
        {/* We'll handle header visibility within the page or a client wrapper if needed, 
            but for now let's just render it. The reader page is fixed and covers everything. */}
        <AppHeader />
        <main className="max-w-[1440px] mx-auto">
          {children}
        </main>
        <MobileBottomNav />
      </body>
    </html>
  );
}
