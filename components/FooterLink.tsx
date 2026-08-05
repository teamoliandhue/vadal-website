"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* A footer link that knows whether you're standing on it.

   Isolated into its own client component so SiteFooter itself stays a server
   component — usePathname is the only thing here that needs the client.

   `activeFor` covers links that can't match the URL directly: a Platform layer
   points at /platform#<id>, but you reach it by being on one of its 25 module
   pages, so the layer row lights up for any of them. */
export function FooterLink({
  href,
  label,
  activeFor,
}: {
  href: string;
  label: string;
  activeFor?: string[];
}) {
  const pathname = usePathname();
  const active = activeFor ? activeFor.includes(pathname) : pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-[15px] transition-colors ${
        active
          ? "font-semibold text-[var(--brand)]"
          : "text-[var(--foreground)] hover:text-[var(--brand)]"
      }`}
    >
      {label}
    </Link>
  );
}
