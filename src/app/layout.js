import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/common/components/Navbar";
import Footer from "@/common/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Occasionaly",
  description: "Make your occasions memorable",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
