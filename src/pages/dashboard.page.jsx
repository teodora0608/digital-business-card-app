import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../common/navbar";
import UserDetailsForm from "../components/user-details-form"
import CustomUrl from "../components/custom-url";
import BadgeSelector from "../components/badge-selector"
import BadgeDisplay from "../components/badge-display"
import ProfilePhoto from "../common/profile-picture";
import BusinessCard from "../common/business-card";
import ActionButtons from "../common/action-buttons";
import VisualTemplate from "../common/visual-template";
import SaveChanges from "../common/save-changes";

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

  // Template data pentru TemplateSelector
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

  // Handler pentru selectarea template-ului
  const handleTemplateSelect = (templateName) => {
    setCardData({ ...cardData, template: templateName })
  }

  // Handlers pentru action buttons
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://keepcard.com/${cardData.customUrl}`)
      // Poți adăuga un toast notification aici
      console.log("Link copied!")
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleGenerateQR = () => {
    // Placeholder pentru QR code generation
    alert("QR Code generation will be implemented later!")
  }

  const handleShareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.name} - Digital Business Card`,
          text: `Check out ${cardData.name}'s digital business card`,
          url: `https://keepcard.com/${cardData.customUrl}`,
        })
      } catch (err) {
        console.log("Error sharing:", err)
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  // Array de butoane pentru dashboard
  const dashboardButtons = [
    {
      label: "Copy Link",
      onClick: handleCopyLink,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Generate QR Code",
      onClick: handleGenerateQR,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      label: "Share Card",
      onClick: handleShareCard,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
      ),
      extraClasses:
        "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:from-fuchsia-600 hover:to-violet-700 hover:shadow-lg border-0",
    },
  ]

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
          customUrl: "teodora-profile",
        }}
      />

      {/* Sticky Save Button */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-fuchsia-500 to-violet-600 shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Edit Your Card</h1>
            <SaveChanges onClick={handleSave} isSaved={isSaved} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Panel - Editor */}
          <div className="space-y-8">
            {/* Custom URL */}
            <CustomUrl
              customUrl={cardData.customUrl}
              onUrlChange={(newUrl) => setCardData({ ...cardData, customUrl: newUrl })}
              isDarkMode={isDarkMode}
            />

            {/* Professional Badges */}
            <BadgeSelector
              selectedBadges={selectedBadges}
              onBadgeToggle={toggleBadge}
              isDarkMode={isDarkMode}
              maxBadges={2}
            />

            {/* Profile Photo */}
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-6 shadow-lg border`}
            >
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Profile Photo</h2>

              <ProfilePhoto
                profileImage={cardData.profileImage}
                template={cardData.template}
                isDarkMode={isDarkMode}
                size="w-20 h-20"
                showUploadButton={true}
                onUploadClick={() => {
                  // Placeholder pentru viitoarea funcționalitate
                  alert("Upload functionality will be added later!")
                }}
              />
            </div>

            <UserDetailsForm cardData={cardData} handleInputChange={handleInputChange} isDarkMode={isDarkMode} />

            {/* Visual Template  */}
            <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <h3
                className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
              >
                Visual Template
              </h3>
              <VisualTemplate
                templates={templates}
                selectedTemplate={cardData.template}
                onSelectTemplate={handleTemplateSelect}
                isDarkMode={isDarkMode}
              />
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
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
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
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Business Card Preview using BusinessCard component */}
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-[400px]" style={{ minWidth: "336px" }}>
                  <BusinessCard
                    cardData={cardData}
                    selectedBadges={selectedBadges}
                    isDarkMode={isDarkMode}
                    showProfilePhoto={true}
                    isClickable={false}
                    variant="default"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <ActionButtons buttons={dashboardButtons} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
