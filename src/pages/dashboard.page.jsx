"use client"

// src/pages/DashboardPage.jsx
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../api/firebase-config"
import { getUserProfile, updateUserProfile } from "../api/profile"
import Navbar from "../common/navbar"
import UserDetailsForm from "../components/user-details-form"
import CustomUrl from "../components/custom-url"
import BadgeSelector from "../components/badge-selector"
import ProfilePhoto from "../common/profile-picture"
import BusinessCard from "../common/business-card"
import ActionButtons from "../common/action-buttons"
import VisualTemplate from "../common/visual-template"
import SaveChanges from "../common/save-changes"

const DashboardPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [userUid, setUserUid] = useState(null)
  const [loading, setLoading] = useState(true)

  // 1️⃣ Pe mount abonează-te la auth și salvează UID-ul
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid)
      } else {
        setUserUid(null)
        // dacă nu e logat: eventual redirect la /login
      }
    })
    return () => unsub()
  }, [])

// 2️⃣ datele profilului: ținem doar fullName + email ca fallback
  const [cardData, setCardData] = useState({
    fullName: "",
    email: "",
    jobTitle: "",
    location: "",
    bio: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    customUrl: "",
    template: "creative", // Default template
    profileImage: "",
  })
  const [selectedBadges, setSelectedBadges] = useState([])

  // 3️⃣ când avem userUid, tragem profilul din Firestore
  useEffect(() => {
    if (!userUid) return
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userUid)
        if (data) {
          // Separate badges from the rest of the card data
          const { badges, ...details } = data
          setCardData({
            fullName: details.fullName || "",
            email: details.email || "",
            jobTitle: details.jobTitle || "",
            location: details.location || "",
            bio: details.bio || "",
            phone: details.phone || "",
            website: details.website || "",
            linkedin: details.linkedin || "",
            github: details.github || "",
            customUrl: details.customUrl || "",
            template: details.visualTemplate || "creative",
            profileImage: details.profileImage || "",
          })
          setSelectedBadges(badges || [])
        }
      } catch (err) {
        console.error("Could not load profile:", err)
        alert("Error loading profile.")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [userUid])

  if (loading) return <div>Loading profile…</div>

  // 4️⃣ handlers UI (neschimbate)
  const handleInputChange = (e) => setCardData((c) => ({ ...c, [e.target.name]: e.target.value }))

  const toggleBadge = (badge) => {
    setSelectedBadges((prevBadges) => {
      const hasBadge = prevBadges.includes(badge)
      if (hasBadge) {
        return prevBadges.filter((b) => b !== badge)
      }
      if (prevBadges.length < 2) {
        return [...prevBadges, badge]
      }
      return prevBadges
    })
  }

  const handleTemplateSelect = (templateName) => setCardData((c) => ({ ...c, template: templateName }))

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://keepcard.com/${cardData.customUrl}`)
    } catch {}
  }

  const handleGenerateQR = () => alert("QR Code generation will be implemented later!")

  const handleShareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.fullName} – Digital Business Card`,
          url: `https://keepcard.com/${cardData.customUrl}`,
        })
      } catch {
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  const dashboardButtons = [
    { label: "Copy Link", onClick: handleCopyLink, icon: /* …SVG… */ null },
    { label: "Generate QR Code", onClick: handleGenerateQR, icon: /* …SVG… */ null },
    {
      label: "Share Card",
      onClick: handleShareCard,
      icon: /* …SVG… */ null,
      extraClasses:
        "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:from-fuchsia-600 hover:to-violet-700",
    },
  ]

  // 5️⃣ save changes: actualizează Firestore
  const handleSave = async () => {
    setIsSaved(true)
    try {
      await updateUserProfile(userUid, {
        ...cardData,
        badges: selectedBadges, // Add badges back for saving
        visualTemplate: cardData.template, // Ensure template is saved correctly
      })
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showLogout
        showProfileLink
        showShare={false}
        showGetStarted={false}
        cardData={{ name: cardData.fullName, customUrl: cardData.customUrl }}
      />

      {/* Sticky Save Button */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-fuchsia-500 to-violet-600 shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Edit Your Card</h1>
          <SaveChanges onClick={handleSave} isSaved={isSaved} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid lg:grid-cols-2 gap-12">
        {/* Left Panel */}
        <div className="space-y-8">
          <CustomUrl
            customUrl={cardData.customUrl}
            onUrlChange={(u) => setCardData((c) => ({ ...c, customUrl: u }))}
            isDarkMode={isDarkMode}
          />

          <BadgeSelector
            selectedBadges={selectedBadges}
            onBadgeToggle={toggleBadge}
            isDarkMode={isDarkMode}
            maxBadges={2}
          />

          <div
            className={`rounded-2xl p-6 shadow-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h2 className={`mb-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Profile Photo</h2>
            <ProfilePhoto
              profileImage={cardData.profileImage}
              template={cardData.template}
              isDarkMode={isDarkMode}
              size="w-20 h-20"
              showUploadButton
              onUploadClick={() => alert("Upload functionality will be added later!")}
            />
          </div>

          <UserDetailsForm cardData={cardData} handleInputChange={handleInputChange} isDarkMode={isDarkMode} />

          <div
            className={`rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h3 className={`mb-6 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Visual Template</h3>
            <VisualTemplate
              templates={[
                { name: "Light", color: "bg-white border-2 border-purple-300" },
                { name: "Dark", color: "bg-slate-900" },
                { name: "Corporate", color: "bg-blue-600" },
                { name: "Creative", color: "bg-gradient-to-r from-pink-500 to-purple-600" },
              ]}
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
       cardData={{
       name:     cardData.fullName,   // înlocuiește proprietatea „name”
       title:    cardData.jobTitle,   // mapăm jobTitle → title
       location: cardData.location,
       bio:      cardData.bio,
       email:    cardData.email,
       phone:    cardData.phone,
       website:  cardData.website,
       linkedin: cardData.linkedin,
       github:   cardData.github,
       template: cardData.template,
       profileImage: cardData.profileImage,
     }}
     selectedBadges={selectedBadges}
     isDarkMode={isDarkMode}
     showProfilePhoto
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
  )
}

export default DashboardPage
