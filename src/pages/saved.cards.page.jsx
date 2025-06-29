"use client"

import { useState, useMemo } from "react"
import { Link } from "react-router-dom"

const SavedCardsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for saved cards - can be replaced with API call or localStorage
  const savedCards = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Senior Product Designer",
      location: "San Francisco, CA",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      website: "alexjohnson.design",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
      avatar: "/placeholder.svg?height=40&width=40",
      template: "creative",
      savedAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "Frontend Developer",
      location: "New York, NY",
      email: "sarah.chen@example.com",
      phone: "+1 (555) 987-6543",
      website: "sarahchen.dev",
      linkedin: "linkedin.com/in/sarahchen",
      github: "github.com/sarahchen",
      avatar: "/placeholder.svg?height=40&width=40",
      template: "light",
      savedAt: "2024-01-12",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      title: "Marketing Director",
      location: "Austin, TX",
      email: "m.rodriguez@example.com",
      phone: "+1 (555) 456-7890",
      website: "michaelrodriguez.com",
      linkedin: "linkedin.com/in/mrodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      template: "corporate",
      savedAt: "2024-01-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "UX Researcher",
      location: "Seattle, WA",
      email: "emily.davis@example.com",
      phone: "+1 (555) 321-0987",
      website: "emilydavis.co",
      linkedin: "linkedin.com/in/emilydavis",
      github: "github.com/emilydavis",
      avatar: "/placeholder.svg?height=40&width=40",
      template: "dark",
      savedAt: "2024-01-08",
    },
    {
      id: 5,
      name: "David Kim",
      title: "Full Stack Engineer",
      location: "Los Angeles, CA",
      email: "david.kim@example.com",
      phone: "+1 (555) 654-3210",
      website: "davidkim.tech",
      linkedin: "linkedin.com/in/davidkim",
      github: "github.com/davidkim",
      avatar: "/placeholder.svg?height=40&width=40",
      template: "creative",
      savedAt: "2024-01-05",
    },
    {
      id: 6,
      name: "Lisa Thompson",
      title: "Data Scientist",
      location: "Boston, MA",
      email: "lisa.thompson@example.com",
      phone: "+1 (555) 789-0123",
      website: "lisathompson.ai",
      linkedin: "linkedin.com/in/lisathompson",
      github: "github.com/lisathompson",
      avatar: "/placeholder.svg?height=40&width=40",
      template: "light",
      savedAt: "2024-01-03",
    },
  ]

  // Filter cards based on search query
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return savedCards

    return savedCards.filter(
      (card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, savedCards])

  // Function to get avatar background color based on template
  const getAvatarStyle = (template) => {
    switch (template) {
      case "light":
        return "bg-gradient-to-r from-fuchsia-500 to-violet-600"
      case "dark":
        return "bg-slate-700"
      case "corporate":
        return "bg-blue-600"
      case "creative":
      default:
        return "bg-gradient-to-r from-fuchsia-500 to-violet-600"
    }
  }

  // Function to handle card actions
  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`, "_blank")
  }

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone}`, "_blank")
  }

  const handleWebsiteClick = (website) => {
    window.open(`https://${website}`, "_blank")
  }

  const handleLinkedInClick = (linkedin) => {
    window.open(`https://${linkedin}`, "_blank")
  }

  const handleGitHubClick = (github) => {
    window.open(`https://${github}`, "_blank")
  }

  // Export functions
  const exportToCSV = () => {
    const headers = ["Name", "Title", "Location", "Email", "Phone", "Website", "LinkedIn", "GitHub", "Saved Date"]
    const csvContent = [
      headers.join(","),
      ...filteredCards.map((card) =>
        [
          `"${card.name}"`,
          `"${card.title}"`,
          `"${card.location}"`,
          `"${card.email}"`,
          `"${card.phone}"`,
          `"${card.website || ""}"`,
          `"${card.linkedin || ""}"`,
          `"${card.github || ""}"`,
          `"${card.savedAt}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `keepcard-saved-contacts-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToVCard = () => {
    const vCardContent = filteredCards
      .map((card) => {
        return `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
TITLE:${card.title}
EMAIL:${card.email}
TEL:${card.phone}
${card.website ? `URL:https://${card.website}` : ""}
${card.linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:https://${card.linkedin}` : ""}
${card.github ? `X-SOCIALPROFILE;TYPE=github:https://${card.github}` : ""}
ADR:;;${card.location};;;;
NOTE:Saved from KeepCard on ${card.savedAt}
END:VCARD`
      })
      .join("\n\n")

    const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `keepcard-saved-contacts-${new Date().toISOString().split("T")[0]}.vcf`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b transition-colors duration-300`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
                <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
                  </svg>
                </div>
                <span
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
                >
                  KeepCard
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              <Link
                to="/dashboard"
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>Saved Cards</h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your collection of saved digital business cards
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search saved cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Export Buttons */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {filteredCards.length} card{filteredCards.length !== 1 ? "s" : ""} found
            </span>
          </div>

          {filteredCards.length > 0 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={exportToCSV}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export CSV
              </button>

              <button
                onClick={exportToVCard}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200"
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v1M7 4V3a1 1 0 011-1m0 0V1m0 0h8m-8 0a1 1 0 00-1 1v1m1-1V1a1 1 0 011-1m6 4H9m0 0v12a2 2 0 002 2h2a2 2 0 002-2V8m-6 0h6"
                  />
                </svg>
                Export vCard
              </button>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className={`${
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } rounded-2xl p-6 border shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group`}
              >
                {/* Card Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 transition-transform group-hover:scale-110">
                    <img
                      src={card.avatar || "/placeholder.svg"}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1 truncate`}>
                      {card.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1 truncate`}>
                      {card.title}
                    </p>
                    <div className={`flex items-center text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{card.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => handleEmailClick(card.email)}
                    className={`flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email
                  </button>
                  <button
                    onClick={() => handlePhoneClick(card.phone)}
                    className={`flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex space-x-2">
                  {card.website && (
                    <button
                      onClick={() => handleWebsiteClick(card.website)}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isDarkMode
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                        />
                      </svg>
                      Website
                    </button>
                  )}
                  {card.linkedin && (
                    <button
                      onClick={() => handleLinkedInClick(card.linkedin)}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isDarkMode
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </button>
                  )}
                  {card.github && (
                    <button
                      onClick={() => handleGitHubClick(card.github)}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isDarkMode
                          ? "bg-gray-600 text-white hover:bg-gray-500"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </button>
                  )}
                </div>

                {/* Saved Date */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Saved on {new Date(card.savedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className={`w-8 h-8 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
              No cards found
            </h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
              {searchQuery ? "Try adjusting your search terms" : "You haven't saved any cards yet"}
            </p>
            {!searchQuery && (
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-lg font-medium hover:from-fuchsia-600 hover:to-violet-700 transition-all duration-200"
              >
                Discover Cards
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default SavedCardsPage
