"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Button } from "./ui";

export function NewsletterForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--brand-tint)] px-5 py-3 text-[15px] font-semibold text-[var(--brand)]">
        <Icon name="check" size={16} strokeWidth={2.4} /> You’re subscribed — thanks!
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Work email"
        aria-label="Work email"
        className="h-12 min-h-12 flex-1 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 text-[16px] transition-colors focus:border-[var(--brand)] focus:bg-[var(--card)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand)] sm:text-[15px]"
      />
      <Button type="submit" size="lg" className="justify-center">
        Subscribe
      </Button>
    </form>
  );
}
