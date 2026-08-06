export default function EmptyIllustration() {
  return (
    <svg
      width="120"
      height="110"
      viewBox="0 0 120 110"
      aria-hidden="true"
      className="empty-illustration"
    >
      <polygon points="30,28 70,28 78,10 22,10" fill="#8c92b3" />
      <circle cx="50" cy="52" r="26" fill="#f2f4ff" stroke="#8c92b3" strokeWidth="2" />
      <circle cx="42" cy="50" r="2.5" fill="#3a4374" />
      <circle cx="58" cy="50" r="2.5" fill="#3a4374" />
      <path d="M42 62 Q50 58 58 62" stroke="#3a4374" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="46" y="72" width="8" height="22" rx="4" fill="#8c92b3" />
      <circle cx="86" cy="78" r="14" fill="none" stroke="#8c92b3" strokeWidth="4" />
      <line x1="96" y1="88" x2="106" y2="98" stroke="#8c92b3" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
