import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import BadgeDisplay from "../components/badge-display"
import BusinessCard from "../common/business-card"
import ActionButtons from "../common/action-buttons" 

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.name} - Digital Business Card`,
          text: `Check out ${cardData.name}'s digital business card`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  // Array de butoane pentru profile page
  const profileButtons = [
    {
      label: "Save Contact",
      onClick: handleDownloadContact,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      label: copied ? "Link Copied!" : "Share Profile",
      onClick: handleShare,
      icon: copied ? (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
      ),
      extraClasses: copied ? "bg-green-100 text-green-700 border-green-200 border-2" : undefined,
    },
  ]

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
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showShare={true}
        showGetStarted={true}
        showLogout={false}
        showProfileLink={false}
        cardData={null}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          {/* Profile Card */}
          <div className="mb-12">
            <BusinessCard
              cardData={cardData}
              selectedBadges={cardData.badges || []}
              isDarkMode={isDarkMode}
              showProfilePhoto={true}
              isClickable={true}
              variant="standalone"
            />
          </div>

          {/* Action Buttons */}
          <div className="mb-12">
            <ActionButtons buttons={profileButtons} isDarkMode={isDarkMode} />
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
