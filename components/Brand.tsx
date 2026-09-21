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

/* VFlag — the V on its own, in the aurora gradient, WITHOUT the apricot
   spark. The spark is an accent built for light ground; on the deep Vadal AI
   canvas it reads as a wrong-coloured dot sitting on top of the shape. Use
   this wherever the mark appears on a dark surface, and as the background
   motif of the intelligence scene. */
export function VFlag({ className = "", size = 28, opacity = 1 }: { className?: string; size?: number; opacity?: number }) {
  return (
    <svg width={Math.round(size * (110 / 96))} height={size} viewBox="0 0 110 96" fill="none" className={className} aria-hidden="true" style={{ opacity }}>
      <path d="M41.6265 45.1902L34.9154 42.2734C30.0066 40.1273 30.0066 33.3332 34.9154 31.1989L41.6265 28.2821C53.501 23.159 63.0241 13.7713 68.3167 1.97128C68.729 1.04433 68.0505 0 67.036 0L12.5484 0C5.37066 0 1.78177 0 0.44201 2.32987C-0.897758 4.65973 0.907462 7.76155 4.51789 13.9652L46.9075 86.8014C50.4759 92.9327 52.2601 95.9984 54.9297 96C57.5993 96.0016 59.3872 92.9381 62.963 86.811L67.938 78.2862C68.641 77.0817 68.9925 76.4794 69.1531 75.835C69.296 75.2617 69.3283 74.6664 69.2481 74.081C69.158 73.4231 68.8736 72.7863 68.3049 71.5129C63.0176 59.7106 53.4987 50.3187 41.6265 45.1902Z" fill="url(#vflag-grad)"/>
      <path d="M99.4813 0L88.4815 0C87.7233 0 87.2165 0.780767 87.5251 1.47327C89.4761 5.80892 91.9963 9.81723 94.9923 13.4076C96.9822 15.7923 97.9772 16.9847 99.5882 17.3042C100.366 17.4585 101.418 17.3684 102.158 17.0839C103.691 16.4949 104.577 14.9641 106.347 11.9026C108.851 7.57403 110.102 5.40974 109.715 3.64749C109.509 2.71258 109.02 1.86405 108.313 1.21792C106.982 0 104.482 0 99.4813 0Z" fill="url(#vflag-grad)"/>
      <defs>
        <linearGradient id="vflag-grad" x1="0" y1="2" x2="85" y2="51" gradientUnits="userSpaceOnUse">
          <stop stopColor="#23D7BE"/><stop offset="0.5" stopColor="#3B9EFF"/><stop offset="1" stopColor="#7C5CF8"/>
        </linearGradient>
      </defs>
    </svg>
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
      aria-label="Vadal, home"
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
