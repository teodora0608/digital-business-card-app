const BadgeDisplay = ({ badges = [], template = "creative", textColor = "text-white" }) => {
  if (!badges || badges.length === 0) return null

  const getBadgeStyle = () => {
    if (textColor === "text-white") {
      return "bg-white/20 text-white border border-white/30"
    }

    switch (template) {
      case "light":
        return "bg-purple-100 text-purple-700 border border-purple-200"
      case "dark":
        return "bg-slate-700 text-slate-200 border border-slate-600"
      case "corporate":
        return "bg-blue-500 text-white border border-blue-400"
      default:
        return "bg-white/20 text-white border border-white/30"
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {badges.map((badge) => (
        <span
          key={badge}
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${getBadgeStyle()}`}
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          {badge}
        </span>
      ))}
    </div>
  )
}

export default BadgeDisplay
