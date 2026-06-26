import type { IconName } from "@/lib/content";

// Line icons, 24px grid, ~1.6px stroke — Contra-inspired, light and friendly.
const paths: Record<IconName, React.ReactNode> = {
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M16.5 7.5a6.4 6.4 0 0 1 0 9M4.6 4.6a10.4 10.4 0 0 0 0 14.8M19.4 4.6a10.4 10.4 0 0 1 0 14.8" />
    </>
  ),
  graduation: (
    <>
      <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" />
      <path d="M6 11v4.5c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5V11" />
      <path d="M21.5 9v4.5" />
    </>
  ),
  heart: (
    <path d="M12 20.5S3.5 15.4 3.5 9.4A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 8.5 1.8c0 6-8.5 11.1-8.5 11.1Z" />
  ),
  rocket: (
    <>
      <path d="M5.5 14.5c-1.5.8-2 4-2 4s3.2-.5 4-2" />
      <path d="M13.5 6.5C16 4 19.5 3.5 20.5 3.5c0 1-.5 4.5-3 7-1.9 1.9-5.4 4.3-7.2 5.5L8 14c1.2-1.8 3.6-5.3 5.5-7.5Z" />
      <circle cx="15" cy="9" r="1.3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-1.7 4.3L9 15l1.7-4.3L15 9Z" />
    </>
  ),
  checks: (
    <>
      <path d="m3.5 12.5 3 3 4-4.5" />
      <path d="m10.5 15.5 3 3 7-8" />
      <path d="m3.5 7.5 3 3 4-4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.5 3 7.4 7 8.9 4-1.5 7-4.4 7-8.9V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="m6 6 3.6 3.6M14.4 14.4 18 18M18 6l-3.6 3.6M9.6 14.4 6 18" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-1 2-2 0-1.5 1-2 2.2-2H18a3 3 0 0 0 3-3c0-4.7-4-7-9-7Z" />
      <circle cx="8" cy="11" r="1" />
      <circle cx="12" cy="8" r="1" />
      <circle cx="16" cy="10.5" r="1" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v4M15 3v4" />
      <path d="M7 7h10v3a5 5 0 0 1-10 0V7Z" />
      <path d="M12 15v6" />
    </>
  ),
  spark: (
    <path d="M12 2.5c.4 4.7 1.8 6.6 6.5 7.5-4.7.9-6.1 2.8-6.5 7.5-.4-4.7-1.8-6.6-6.5-7.5 4.7-.9 6.1-2.8 6.5-7.5Z" />
  ),
  chart: (
    <>
      <path d="M4 19.5h16" />
      <rect x="5.5" y="11" width="3" height="6" rx="1" />
      <rect x="10.5" y="7" width="3" height="10" rx="1" />
      <rect x="15.5" y="13" width="3" height="4" rx="1" />
    </>
  ),
  chat: (
    <path d="M4.5 6.5A2 2 0 0 1 6.5 4.5h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4 3.5v-3.5H6.5a2 2 0 0 1-2-2v-7Z" />
  ),
  bell: (
    <>
      <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 4 1.5 5.5 1.5 5.5H5s1.5-1.5 1.5-5.5Z" />
      <path d="M10 18.5a2 2 0 0 0 4 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M15.5 6a3 3 0 0 1 0 6M16.5 14c2.4.3 4 2.3 4 5" />
    </>
  ),
  pulse: (
    <path d="M3.5 12.5h3l2-5 3 9 2.5-7 1.5 3h5" />
  ),
  play: <path d="M9 7.5v9l7-4.5-7-4.5Z" />,
  arrow: <path d="M5 12h13m-5-5 5 5-5 5" />,
  check: <path d="m5 12.5 4 4 10-10" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.4 3.9 5.4 3.9 8.5s-1.4 6.1-3.9 8.5c-2.5-2.4-3.9-5.4-3.9-8.5S9.5 5.9 12 3.5Z" />
    </>
  ),
  lock: (
    <>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3.5" width="10" height="17" rx="2.5" />
      <path d="M10.5 17.5h3" />
    </>
  ),
};

export function Icon({
  name,
  className = "",
  size = 24,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const filled = name === "spark" || name === "play";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
