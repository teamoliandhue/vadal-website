import Image from "next/image";
import Link from "next/link";

/* The Vadal brand mark — V-shape with aurora gradient and apricot spark.
   Use wherever you need the standalone icon (login, 404, favicons). */
export function SignalMark({ className = "", size = 28 }: { className?: string; size?: number }) {
  const w = Math.round(size * (110 / 96));
  return (
    <Image
      src="/brand/mark.svg"
      alt=""
      aria-hidden="true"
      width={110}
      height={96}
      style={{ height: size, width: w }}
      className={className}
      unoptimized
    />
  );
}

/* SparkMark — the 4-point spark filled with the Aurora gradient.
   This is the AI logo: use it wherever intelligence appears. */
export function SparkMark({
  className = "",
  size = 22,
  animate = false,
}: {
  className?: string;
  size?: number;
  animate?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`${animate ? "animate-spark" : ""} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 1.5c.5 5.6 2.4 7.9 8 8.5-5.6.6-7.5 2.9-8 8.5-.5-5.6-2.4-7.9-8-8.5 5.6-.6 7.5-2.9 8-8.5Z"
        fill="url(#spark-grad)"
      />
      <defs>
        <linearGradient id="spark-grad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#23D7BE" />
          <stop offset="0.5" stopColor="#3B9EFF" />
          <stop offset="1" stopColor="#7C5CF8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* The full logo lockup — mark + wordmark.
   logo-dark.svg  → use on light backgrounds (header, footer, cards)
   logo-light.svg → use on dark backgrounds (dark panels, CTA images) */
export function Logo({ className = "", size = 32 }: { className?: string; size?: number }) {
  const w = Math.round(size * (498 / 96));
  return (
    <Link
      href="/"
      aria-label="Vadal — home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/brand/logo-dark.svg"
        alt="Vadal"
        width={498}
        height={96}
        style={{ height: size, width: w }}
        unoptimized
        priority
      />
    </Link>
  );
}
