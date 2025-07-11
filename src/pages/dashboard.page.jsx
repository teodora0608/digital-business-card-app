// src/pages/DashboardPage.jsx
"use client"

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
import VisualTemplate from "../common/visual-template"
import SaveChanges from "../common/save-changes"

const DashboardPage = () => {
  // Theme & save state
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Auth & loading
  const [userUid, setUserUid] = useState(null)
  const [loading, setLoading] = useState(true)

  // Custom URL validity
  const [isUrlValid, setIsUrlValid] = useState(true)

  // Profile data
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
    customUrl: "",    // start empty, default UID shown client-side
    template: "creative",
    profileImage: "",
  })
  const [selectedBadges, setSelectedBadges] = useState([])

  // 1️⃣ Subscribe to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserUid(user ? user.uid : null)
    })
    return () => unsub()
  }, [])

  // 2️⃣ Fetch user profile once UID is known
  useEffect(() => {
    if (!userUid) return
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userUid)
        if (data) {
          const { badges, visualTemplate, ...details } = data
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
            // keep blank if not set yet
            customUrl: details.customUrl || "",
            template: visualTemplate || "creative",
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

  // 3️⃣ Handlers for other fields
  const handleInputChange = (e) =>
    setCardData((c) => ({ ...c, [e.target.name]: e.target.value }))

  const toggleBadge = (badge) =>
    setSelectedBadges((prev) => {
      if (prev.includes(badge)) return prev.filter((b) => b !== badge)
      if (prev.length < 2) return [...prev, badge]
      return prev
    })

  const handleTemplateSelect = (templateName) =>
    setCardData((c) => ({ ...c, template: templateName }))

  // 4️⃣ Save handler with URL-validity guard & UID fallback
  const handleSave = async () => {
    if (!isUrlValid) {
      alert("Custom URL nu e disponibil, alege altul înainte de a salva.")
      return
    }
    // dacă user a șters slug-ul, folosește UID la salvare
    const finalSlug = cardData.customUrl || userUid

    setIsSaving(true)
    try {
      await updateUserProfile(userUid, {
        ...cardData,
        customUrl: finalSlug,
        badges: selectedBadges,
        visualTemplate: cardData.template,
      })
      // actualizează local pentru UI
      setCardData((c) => ({ ...c, customUrl: finalSlug }))
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (err) {
      console.error(err)
      alert(err.message || "Eroare la salvare")
    } finally {
      setIsSaving(false)
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
        cardData={{
          name: cardData.fullName,
          customUrl: cardData.customUrl || userUid,
          profileImage: cardData.profileImage,
        }}
      />

      {/* Sticky Save Button */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-fuchsia-500 to-violet-600 shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Edit Your Card</h1>
          <SaveChanges
            onClick={handleSave}
            isSaved={isSaved}
            isLoading={isSaving}
            disabled={!isUrlValid}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid lg:grid-cols-2 gap-12">
        {/* Left Panel */}
        <div className="space-y-8">
          <CustomUrl
            customUrl={cardData.customUrl}
            onUrlChange={(u) => setCardData((c) => ({ ...c, customUrl: u }))}
            onValidityChange={setIsUrlValid}
            userUid={userUid}
            isDarkMode={isDarkMode}
          />

          <BadgeSelector
            selectedBadges={selectedBadges}
            onBadgeToggle={toggleBadge}
            isDarkMode={isDarkMode}
            maxBadges={2}
          />

          <div className={`rounded-2xl p-6 shadow-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <h2 className={`mb-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Profile Photo
            </h2>
            <ProfilePhoto
              profileImage={cardData.profileImage}
              template={cardData.template}
              isDarkMode={isDarkMode}
              size="w-20 h-20"
              showUploadButton
              onImageChange={(base64) =>
                setCardData((c) => ({ ...c, profileImage: base64 }))
              }
              name={cardData.fullName}
            />
          </div>

          <UserDetailsForm
            cardData={cardData}
            handleInputChange={handleInputChange}
            isDarkMode={isDarkMode}
          />

          <div className={`rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <h3 className={`mb-6 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Visual Template
            </h3>
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
    className={`rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl 
      ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
  >
    <div className="flex items-center justify-between mb-8">
      <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        Live Preview
      </h2>
      {/* butoanele de edit au fost eliminate */}
    </div>

    <div className="flex justify-center mb-8">
      <div className="w-full max-w-[400px]" style={{ minWidth: "336px" }}>
        <BusinessCard
          cardData={{
            name: cardData.fullName,
            jobTitle: cardData.jobTitle,
            location: cardData.location,
            bio: cardData.bio,
            email: cardData.email,
            phone: cardData.phone,
            website: cardData.website,
            linkedin: cardData.linkedin,
            github: cardData.github,
            template: cardData.template,
            profileImage: cardData.profileImage,
            customUrl: cardData.customUrl || userUid,
          }}
          selectedBadges={selectedBadges}
          isDarkMode={isDarkMode}
          showProfilePhoto
          isClickable={false}
          variant="default"
        />
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

export default DashboardPage
