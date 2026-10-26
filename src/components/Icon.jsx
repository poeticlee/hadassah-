const PATHS = {
  badge: (
    <>
      <path d="M12 3l2.4 1.6 2.9.2.9 2.8 2 2-1.1 2.7.3 2.9-2.6 1.4-1.6 2.5-2.8-.6-2.8.6-1.6-2.5-2.6-1.4.3-2.9L3.8 9.6l2-2 .9-2.8 2.9-.2L12 3Z" />
      <path d="m9.3 12.2 1.9 1.9 3.6-3.8" />
    </>
  ),
  box: (
    <>
      <path d="M21 8.5v7a1.6 1.6 0 0 1-.85 1.4l-7.2 3.9a1.9 1.9 0 0 1-1.9 0l-7.2-3.9A1.6 1.6 0 0 1 3 15.5v-7" />
      <path d="m3.4 7.3 8.1-4.1a1.8 1.8 0 0 1 1.6 0l7.5 3.8-8.6 4.5L3.4 7.3Z" />
      <path d="M12 11.5V21" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 3v3M20 4.5h-3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4a9.8 9.8 0 0 1-2.7-.4L4.5 20.5l1.3-3.6A7 7 0 0 1 3.5 12c0-4.1 3.8-7.4 8.5-7.4s8.5 3.3 8.5 7.4Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  hotel: (
    <>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5V21" />
      <path d="M16 10h3a1.5 1.5 0 0 1 1.5 1.5V21M2.5 21h19" />
      <path d="M7.5 8h1.5M11 8h1.5M7.5 12h1.5M11 12h1.5M9.5 21v-4h1.5v4" />
    </>
  ),
  house: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9.6V20h13V9.6" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="4.2" />
      <path d="M12.2 12H21M18 12v3M15 12v2.4" />
    </>
  ),
  gem: (
    <>
      <path d="m12 3 8 5.2-8 12.8L4 8.2 12 3Z" />
      <path d="M4 8.2h16M12 3 8.4 8.2 12 21l3.6-12.8L12 3Z" />
    </>
  ),
  people: (
    <>
      <circle cx="9.5" cy="8" r="3.3" />
      <path d="M3.5 19.5c0-3.1 2.7-5.3 6-5.3s6 2.2 6 5.3" />
      <path d="M16.5 5.2a3.3 3.3 0 0 1 0 6.1M17.5 14.6c2.1.6 3.5 2.2 3.5 4.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3.5V6.5M16 3.5V6.5" />
      <path d="M8 14h3M8 17h8" />
    </>
  ),
  phone: (
    <>
      <path d="M6.2 3.8h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.3 5.3l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 6a2 2 0 0 1 2-2.2Z" />
    </>
  ),
}

export default function Icon({ name, size = 26, className = '' }) {
  const paths = PATHS[name] ?? PATHS.sparkle
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths}
    </svg>
  )
}
