import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vadal.ai"),
  title: {
    default: "Vadal — the engagement operating system for the whole workforce",
    template: "%s · Vadal",
  },
  description:
    "Vadal connects your entire workforce — especially deskless and frontline teams — through one warm, mobile-first employee app, and gives leaders the analytics and AI to act. Score → Insight → Action → Impact.",
  keywords: [
    "employee engagement platform",
    "employee experience",
    "deskless workforce app",
    "internal communications",
    "frontline employee app",
    "mobile learning",
    "employee app",
  ],
  openGraph: {
    title: "Vadal — keep your company human, at any scale",
    description:
      "One mobile-first app for communication, training, culture and tasks — with the analytics and AI to drive engagement, not just measure it.",
    type: "website",
    siteName: "Vadal",
  },
  icons: {
    icon: "/brand/signal-mark.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--brand)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
