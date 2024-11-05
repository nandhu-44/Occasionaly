// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/common/components/Navbar";
import Footer from "@/common/components/Footer";
import Loading from "./loading";
import { Suspense } from "react";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "Occasionaly",
    template: "%s | Occasionaly",
  },
  description: "Make your occasions memorable",
  icons: {
    icon: "/logo.svg",
  },
  // Add additional metadata for better SEO
  // manifest: "/manifest.json",
  openGraph: {
    title: "Occasionaly",
    description: "Make your occasions memorable",
    siteName: "Occasionaly",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {/* Providers wrapper to handle hydration properly */}
        <div className="flex min-h-screen flex-col">
          <UserProvider>
            <Suspense fallback={<Loading />}>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Toaster />
            </Suspense>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
