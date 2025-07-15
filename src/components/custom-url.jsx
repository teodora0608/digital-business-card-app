// src/components/CustomUrl.jsx
import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../api/firebase-config'

const CustomUrl = ({
  customUrl = "",
  onUrlChange,
  onValidityChange,
  isDarkMode = false,
  userUid
}) => {
  // initialize slug from props or uid
  const initial = customUrl || userUid || ""
  const [slug, setSlug] = useState(initial)
  const [checking, setChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState(null) // null, true, false

  // sync prop -> state once
  useEffect(() => {
    setSlug(initial)
    onUrlChange?.(initial)
    onValidityChange?.(true)
  }, [])

  // auto‐hide availability message after 4s
  useEffect(() => {
    if (isAvailable !== null) {
      const timer = setTimeout(() => setIsAvailable(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [isAvailable])

  const handleInputChange = e => {
    const v = e.target.value
    setSlug(v)
    onUrlChange?.(v)
    setIsAvailable(null)
    onValidityChange?.(true)
  }

  const checkSlugAvailability = async () => {
    const val = slug.trim()
    if (!val) {
      setIsAvailable(null)
      onValidityChange?.(true)
      return
    }
    setChecking(true)
    try {
      const snap = await getDocs(collection(db, "profiles"))
      const exists = snap.docs.some(doc => {
        if (doc.id === userUid) return false
        return (doc.data().customUrl || "").toLowerCase() === val.toLowerCase()
      })
      setIsAvailable(!exists)
      onValidityChange?.(!exists)
    } catch (err) {
      console.warn("Error checking slug:", err)
      setIsAvailable(null)
      onValidityChange?.(true)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div
      className={`rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl
        ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
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
        <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Custom URL
        </h3>
      </div>

      <div
        className={`flex items-center rounded-xl p-4 border
          ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}
          focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-200`}
      >
<span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm font-medium`}>
  {window.location.origin}/
</span>

        <input
          type="text"
          name="customUrl"
          value={slug}
          onChange={handleInputChange}
          onBlur={checkSlugAvailability}
          className={`flex-1 bg-transparent border-none outline-none font-medium ml-1
            ${isDarkMode ? "text-white" : "text-gray-900"}`}
          placeholder="your-slug"
        />
      </div>

      <p className={`mt-3 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
        Choose a unique URL for your digital business card
      </p>

      {checking && <p className="mt-1 text-sm text-blue-500">Verifying availability…</p>}
      {isAvailable === false && (
        <p className="mt-1 text-sm text-red-500">URL already taken. Please choose another.</p>
      )}
      {isAvailable === true && (
        <p className="mt-1 text-sm text-green-500">Nice! This URL is available.</p>
      )}
    </div>
  )
}

export default CustomUrl
