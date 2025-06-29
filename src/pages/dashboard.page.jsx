"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../common/navbar";

const DashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const [cardData, setCardData] = useState({
    name: "teodora",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    bio: "Passionate about creating beautiful, user-centered digital experiences. 5+ years in product design with a focus on SaaS platforms.",
    email: "sdadsasssdas@gmail.com",
    phone: "+1 (555) 123-4567",
    website: "alexjohnson.design",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    customUrl: "alex-johnson",
    template: "creative",
  })

  const [selectedBadges, setSelectedBadges] = useState(["Available for freelance", "Open to collaboration"])

  const handleInputChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const toggleBadge = (badge) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter((b) => b !== badge))
    } else if (selectedBadges.length < 2) {
      setSelectedBadges([...selectedBadges, badge])
    }
  }

  const badges = [
    { name: "Available for freelance", tooltip: "Open to freelance projects and contract work" },
    { name: "Looking for new opportunities", tooltip: "Actively seeking new job opportunities" },
    { name: "Open to collaboration", tooltip: "Interested in collaborating on projects" },
    { name: "Remote only", tooltip: "Prefers remote work arrangements only" },
    { name: "Hiring", tooltip: "Currently hiring for their team or company" },
    { name: "Just updated", tooltip: "Recently updated their profile information" },
  ]

  const templates = [
    {
      name: "Light",
      color: "bg-white border-2 border-purple-300",
      preview: "Clean white design with purple accents",
    },
    {
      name: "Dark",
      color: "bg-slate-900",
      preview: "Sleek dark theme with modern styling",
    },
    {
      name: "Corporate",
      color: "bg-blue-600",
      preview: "Professional blue corporate theme",
    },
    {
      name: "Creative",
      color: "bg-gradient-to-r from-pink-500 to-purple-600",
      preview: "Vibrant gradient for creative professionals",
    },
  ]

  const renderPreviewCard = () => {
    const baseCardContent = (textColor, buttonStyle) => (
      <>
        <div className="flex items-start space-x-4 mb-6">
          <div
            className={`w-14 h-14 ${cardData.template === "light" ? "bg-gradient-to-r from-fuchsia-500 to-violet-600" : "bg-white"} rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300`}
          >
            <span className={`${cardData.template === "light" ? "text-white" : "text-fuchsia-600"} font-bold text-lg`}>
              t
            </span>
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${textColor} mb-1 transition-all duration-300`}>{cardData.name}</h3>
            <p
              className={`${textColor === "text-white" ? "text-white/90" : "text-gray-600"} text-base mb-2 transition-all duration-300`}
            >
              {cardData.title}
            </p>
            <div
              className={`flex items-center text-sm ${textColor === "text-white" ? "text-white/80" : "text-gray-500"} transition-all duration-300`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {cardData.location}
            </div>
          </div>
        </div>

        <p
          className={`${textColor === "text-white" ? "text-white/90" : "text-gray-600"} text-sm mb-6 leading-relaxed transition-all duration-300`}
        >
          {cardData.bio}
        </p>

        {/* Professional Badges */}
        {selectedBadges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedBadges.map((badge) => (
              <span
                key={badge}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  textColor === "text-white"
                    ? "bg-white/20 text-white border border-white/30"
                    : cardData.template === "light"
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : cardData.template === "dark"
                        ? "bg-slate-700 text-slate-200 border border-slate-600"
                        : cardData.template === "corporate"
                          ? "bg-blue-500 text-white border border-blue-400"
                          : "bg-white/20 text-white border border-white/30"
                }`}
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
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">Email</span>
          </button>
          <button
            className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-medium">Call</span>
          </button>
        </div>

        <div className="space-y-3">
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium">GitHub</span>
          </button>
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-medium">LinkedIn</span>
          </button>
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
              />
            </svg>
            <span className="font-medium">Website</span>
          </button>
        </div>
      </>
    )

    switch (cardData.template) {
      case "light":
        return (
          <div className="w-full max-w-[400px] mx-auto bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
            {baseCardContent(
              "text-gray-900",
              "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300",
            )}
          </div>
        )
      case "dark":
        return (
          <div className="w-full max-w-[400px] mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-8 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            {baseCardContent(
              "text-white",
              "bg-transparent border border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 active:bg-slate-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500",
            )}
          </div>
        )
      case "corporate":
        return (
          <div className="w-full max-w-[400px] mx-auto bg-blue-600 rounded-2xl p-8 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            {baseCardContent(
              "text-white",
              "bg-transparent border border-blue-400 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300",
            )}
          </div>
        )
      case "creative":
      default:
        return (
          <div className="w-full max-w-[400px] mx-auto bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-2xl p-8 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            {baseCardContent(
              "text-white",
              "bg-transparent border border-white text-white hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/80 active:bg-white/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50",
            )}
          </div>
        )
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>


<Navbar
  isDarkMode={isDarkMode}
  setIsDarkMode={setIsDarkMode}
  showLogout={true}
  showProfileLink={true}
  showShare={false}
  showGetStarted={false}
  cardData={{
    name: "Teodora",
    customUrl: "teodora-profile"
  }}
/>

      {/* Sticky Save Button */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-fuchsia-500 to-violet-600 shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Edit Your Card</h1>
            <button
              onClick={handleSave}
              className={`flex items-center px-6 py-2 bg-white text-fuchsia-600 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100 hover:scale-105 ${isSaved ? "bg-green-100 text-green-700" : ""}`}
            >
              {isSaved ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Panel - Editor */}
          <div className="space-y-8">
            {/* Custom URL */}
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <h3
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
                >
                  Custom URL
                </h3>
              </div>
              <div
                className={`flex items-center ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} border rounded-xl p-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-500`}
              >
                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm font-medium`}>
                  keepcard.app/
                </span>
                <input
                  type="text"
                  name="customUrl"
                  value={cardData.customUrl}
                  onChange={handleInputChange}
                  className={`flex-1 bg-transparent border-none outline-none ${isDarkMode ? "text-white" : "text-gray-900"} font-medium ml-1`}
                />
              </div>
              <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"} mt-3`}>
                Choose a unique URL for your digital business card
              </p>
            </div>

            {/* Professional Badges */}
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
                Select up to 2 badges to display on your card
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((badge) => (
                  <button
                    key={badge.name}
                    onClick={() => toggleBadge(badge.name)}
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
                {selectedBadges.length}/2 badges selected
              </p>
            </div>

            {/* Profile Photo */}
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <h3
                className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
              >
                Profile Photo
              </h3>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                  <span className="text-white font-bold text-2xl">t</span>
                </div>
                <button
                  className={`flex items-center px-6 py-3 border-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${isDarkMode ? "border-gray-600 hover:bg-gray-700 text-gray-300 hover:border-gray-500" : "border-gray-300 hover:bg-gray-50 text-gray-700 hover:border-gray-400"}`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload Photo
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <h3
                className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
              >
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={cardData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={cardData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={cardData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                />
              </div>

              <div className="mt-6">
                <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
                  Bio (300 characters max)
                </label>
                <textarea
                  name="bio"
                  value={cardData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={300}
                  className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                />
                <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"} mt-2 text-right`}>
                  {cardData.bio.length}/300 characters
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <h3
                className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
              >
                Contact Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={cardData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={cardData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={cardData.website}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <h3
                className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
              >
                Social Links
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}
                  >
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={cardData.linkedin}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}
                  >
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={cardData.github}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`}
                  />
                </div>
              </div>
            </div>

            {/* Visual Template */}
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <h3
                className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
              >
                Visual Template
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => setCardData({ ...cardData, template: template.name.toLowerCase() })}
                    title={template.preview}
                    className={`relative aspect-square rounded-2xl ${template.color} border-3 transition-all duration-200 hover:scale-105 ${
                      cardData.template === template.name.toLowerCase()
                        ? "border-purple-500 ring-4 ring-purple-200 shadow-xl"
                        : isDarkMode
                          ? "border-gray-600 hover:border-gray-500"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                      <span
                        className={`text-sm font-bold ${template.name === "Light" ? "text-gray-900" : "text-white"} mb-1`}
                      >
                        {template.name}
                      </span>
                      {cardData.template === template.name.toLowerCase() && (
                        <div className="absolute top-2 right-2">
                          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-8">
                <h2
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
                >
                  Live Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                  <button
                    className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Template-Based Business Card Preview */}
              <div className="flex justify-center mb-8">{renderPreviewCard()}</div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  className={`w-full flex items-center justify-center px-6 py-4 border-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${isDarkMode ? "border-gray-600 hover:bg-gray-700 text-gray-300 hover:border-gray-500" : "border-gray-300 hover:bg-gray-50 text-gray-700 hover:border-gray-400"}`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                     d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Link
                </button>
                <button
                  className={`w-full flex items-center justify-center px-6 py-4 border-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${isDarkMode ? "border-gray-600 hover:bg-gray-700 text-gray-300 hover:border-gray-500" : "border-gray-300 hover:bg-gray-50 text-gray-700 hover:border-gray-400"}`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  Generate QR Code 
                </button>
                <button className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage