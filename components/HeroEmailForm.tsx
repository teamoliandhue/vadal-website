"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui";
import { heroV2 } from "@/lib/content";

/* Hero conversion row — email box + "Book a Demo" (per Home page content doc).
   Submitting routes to /demo carrying the email along for the full form. */
export function HeroEmailForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(email ? `/demo?email=${encodeURIComponent(email)}` : "/demo");
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email"
          aria-label="Work email"
          className="h-12 min-h-12 flex-1 rounded-full border border-[var(--line)] bg-[var(--card)] px-5 text-[16px] shadow-[var(--shadow-sm)] transition-colors focus:border-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand)] sm:text-[15px]"
        />
        <Button type="submit" size="lg" className="justify-center" icon>
          {heroV2.emailCta}
        </Button>
      </form>
      <p className="mt-2.5 text-[13px] text-[var(--muted)]">{heroV2.emailCaption}</p>
    </div>
  );
}
