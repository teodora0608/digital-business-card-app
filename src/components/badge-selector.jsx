const BadgeSelector = ({ selectedBadges = [], onBadgeToggle, isDarkMode = false, maxBadges = 2 }) => {
  const badges = [
    { name: "Available for freelance", tooltip: "Open to freelance projects and contract work" },
    { name: "Looking for new opportunities", tooltip: "Actively seeking new job opportunities" },
    { name: "Open to collaboration", tooltip: "Interested in collaborating on projects" },
    { name: "Remote only", tooltip: "Prefers remote work arrangements only" },
    { name: "Hiring", tooltip: "Currently hiring for their team or company" },
    { name: "Just updated", tooltip: "Recently updated their profile information" },
  ]

  return (
    <div
      className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex items-center mb-6">
        <svg
          className={`w-6 h-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"} mr-3`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
        <h3
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
        >
          Professional Badges
        </h3>
      </div>
      <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"} mb-6`}>
        Select up to {maxBadges} badges to display on your card
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {badges.map((badge) => (
          <button
            key={badge.name}
            onClick={() => onBadgeToggle && onBadgeToggle(badge.name)}
            title={badge.tooltip}
            className={`p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
              selectedBadges.includes(badge.name)
                ? "border-purple-400 bg-purple-50 text-purple-700 shadow-lg"
                : isDarkMode
                  ? "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              {badge.name}
            </div>
          </button>
        ))}
      </div>
      <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"} mt-4 text-center`}>
        {selectedBadges.length}/{maxBadges} badges selected
      </p>
    </div>
  )
}

export default BadgeSelector
