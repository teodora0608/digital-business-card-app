"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../common/navbar"
import Footer from "../common/footer"

const ProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { username } = useParams()
  const [cardData, setCardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  // Mock data - in real app, this would fetch from API based on username
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCardData({
        name: "teodora",
        title: "Senior Product Designer",
        location: "San Francisco, CA",
        bio: "Passionate about creating beautiful, user-centered digital experiences. 5+ years in product design with a focus on SaaS platforms.",
        email: "sdadsasssdas@gmail.com",
        phone: "+1 (555) 123-4567",
        website: "alexjohnson.design",
        linkedin: "linkedin.com/in/alexjohnson",
        github: "github.com/alexjohnson",
        customUrl: username || "alex-johnson",
        template: "creative",
        badges: ["Available for freelance", "Open to collaboration"],
      })
      setLoading(false)
    }, 500)
  }, [username])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleDownloadContact = () => {
    if (!cardData) return

    // Create vCard format
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
TITLE:${cardData.title}
EMAIL:${cardData.email}
TEL:${cardData.phone}
URL:${cardData.website}
NOTE:${cardData.bio}
END:VCARD`

    const blob = new Blob([vCard], { type: "text/vcard" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${cardData.name.replace(/\s+/g, "_")}_contact.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const renderProfileCard = () => {
    if (!cardData) return null

    const baseCardContent = (textColor, buttonStyle) => (
      <>
        <div className="flex items-start space-x-4 mb-6">
          <div
            className={`w-16 h-16 ${cardData.template === "light" ? "bg-gradient-to-r from-fuchsia-500 to-violet-600" : "bg-white"} rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300`}
          >
            <span className={`${cardData.template === "light" ? "text-white" : "text-fuchsia-600"} font-bold text-xl`}>
              {cardData.name.charAt(0).toLowerCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${textColor} mb-2 transition-all duration-300`}>{cardData.name}</h1>
            <p
              className={`${textColor === "text-white" ? "text-white/90" : "text-gray-600"} text-lg mb-3 transition-all duration-300`}
            >
              {cardData.title}
            </p>
            <div
              className={`flex items-center text-sm ${textColor === "text-white" ? "text-white/80" : "text-gray-500"} transition-all duration-300`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className={`${textColor === "text-white" ? "text-white/90" : "text-gray-600"} text-base mb-6 leading-relaxed transition-all duration-300`}
        >
          {cardData.bio}
        </p>

        {/* Professional Badges */}
        {cardData.badges && cardData.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {cardData.badges.map((badge) => (
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
          <a
            href={`mailto:${cardData.email}`}
            className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[48px] group text-center`}
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
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
          </a>
          <a
            href={`tel:${cardData.phone}`}
            className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[48px] group text-center`}
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
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
          </a>
        </div>

        <div className="space-y-3">
          <a
            href={`https://${cardData.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[48px] group`}
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium">GitHub</span>
          </a>
          <a
            href={`https://${cardData.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[48px] group`}
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href={`https://${cardData.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[48px] group`}
          >
            <svg
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
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
          </a>
        </div>
      </>
    )

    switch (cardData.template) {
      case "light":
        return (
          <div className="w-full max-w-[420px] mx-auto bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl">
            {baseCardContent(
              "text-gray-900",
              "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300",
            )}
          </div>
        )
      case "dark":
        return (
          <div className="w-full max-w-[420px] mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-8 text-white shadow-2xl transition-all duration-300 hover:shadow-3xl">
            {baseCardContent(
              "text-white",
              "bg-transparent border border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 active:bg-slate-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500",
            )}
          </div>
        )
      case "corporate":
        return (
          <div className="w-full max-w-[420px] mx-auto bg-blue-600 rounded-2xl p-8 text-white shadow-2xl transition-all duration-300 hover:shadow-3xl">
            {baseCardContent(
              "text-white",
              "bg-transparent border border-blue-400 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300",
            )}
          </div>
        )
      case "creative":
      default:
        return (
          <div className="w-full max-w-[420px] mx-auto bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-2xl p-8 text-white shadow-2xl transition-all duration-300 hover:shadow-3xl">
            {baseCardContent(
              "text-white",
              "bg-transparent border border-white text-white hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/80 active:bg-white/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50",
            )}
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"} flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
            </svg>
          </div>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} font-medium`}>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!cardData) {
    return (
      <div
        className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"} flex items-center justify-center`}
      >
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>
            Profile Not Found
          </h1>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-lg font-semibold hover:from-fuchsia-600 hover:to-violet-700 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} showShare={true} showCreateCard={true} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="mb-8">{renderProfileCard()}</div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <button
              onClick={handleDownloadContact}
              className={`flex items-center justify-center px-6 py-4 border rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Save Contact
            </button>

            <button
              onClick={handleCopyLink}
              className={`flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : isDarkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Link Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Call to Action */}
          <div
            className={`text-center rounded-2xl p-8 shadow-lg border ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
              </svg>
            </div>
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
              Create Your Own Digital Business Card
            </h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
              Join thousands of professionals who use KeepCard to share their contact information instantly.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-lg font-semibold hover:from-fuchsia-600 hover:to-violet-700 transition-all duration-200 hover:scale-105"
            >
              Get Started Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

export default ProfilePage
