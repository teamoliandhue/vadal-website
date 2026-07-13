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
  // apex is canonical — www 308-redirects to it
  metadataBase: new URL("https://vadal.ai"),
  title: {
    default: "Vadal.ai — AI-powered workforce engagement & decision intelligence",
    template: "%s · Vadal.ai",
  },
  description:
    "Vadal.ai unifies workforce engagement, talent, leadership and organizational data into AI-powered decision intelligence — so CEOs, CHROs and business leaders can predict risks, uncover opportunities and act with confidence. Score → Insight → Action → Impact.",
  keywords: [
    "employee engagement platform",
    "workforce intelligence",
    "people analytics",
    "AI employee surveys",
    "decision intelligence",
    "employee experience",
    "eNPS",
    "attrition prediction",
  ],
  openGraph: {
    title: "Vadal.ai — transform workforce experiences across the employee lifecycle",
    description:
      "Go beyond engagement — lead with intelligence. AI-powered surveys, workforce analytics, action planning and enterprise-grade security, on one platform.",
    type: "website",
    siteName: "Vadal.ai",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Vadal.ai — Lead your workforce with intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadal.ai — Lead your workforce with intelligence",
    description:
      "Go beyond engagement — lead with intelligence. AI-powered surveys, workforce analytics, action planning and enterprise-grade security, on one platform.",
    images: ["/og.jpg"],
  },
  icons: {
    // brand assets were renamed (2e5b539) — the mark lives at /brand/mark.svg
    icon: "/brand/mark.svg",
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
