import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromotionWindow } from "@/components/PromotionWindow";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Stem Magnetics | The Best in ICT Products",
  description: "Zimbabwe's trusted partner for IT hardware, software, and consumables since 1997. Computers, printers, networking, communication solutions and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="5f0db1e3-35d1-482a-a963-4a07ae6ac0fe"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
          <ThemeProvider>
            <CartProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <PromotionWindow />
              <Toaster position="top-right" richColors />
            </CartProvider>
          </ThemeProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
