// src/components/UserDetailsForm.jsx
import React from "react"

const UserDetailsForm = ({
  cardData,
  handleInputChange,
  isDarkMode,
  fieldsValid, // { fullName, jobTitle, email, website, linkedin, github }
}) => {
  const inputBaseClasses =
    "w-full px-4 py-3 rounded-lg border transition-all duration-200"

  const getInputClasses = (field) => {
    const valid = fieldsValid[field]
    const base = `${inputBaseClasses} ${
      isDarkMode
        ? "bg-gray-700 text-white placeholder-gray-400"
        : "bg-white text-gray-900 placeholder-gray-500"
    }`
    return valid
      ? `${base} ${isDarkMode ? "border-gray-600" : "border-gray-300"}`
      : `${base} border-red-500`
  }

  const getLabelClasses = () =>
    `block text-sm font-medium mb-2 ${
      isDarkMode ? "text-gray-300" : "text-gray-700"
    }`

  const getError = (field) => {
    if (fieldsValid[field]) return null
    const msgs = {
      fullName: "Full Name is required.",
      jobTitle: "Job Title is required.",
      email: "Invalid email address.",
      website: "Invalid URL (must start with http/https).",
      linkedin: "Invalid LinkedIn URL.",
      github: "Invalid GitHub URL.",
    }
    return <p className="text-red-500 text-sm mt-1">{msgs[field]}</p>
  }

  return (
    <div
      className={`rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Personal Info */}
      <h3
        className={`text-xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Personal Information
      </h3>
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={getLabelClasses()}>
            Full Name*
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={cardData.fullName}
            onChange={handleInputChange}
            className={getInputClasses("fullName")}
            placeholder="Enter your full name"
          />
          {getError("fullName")}
        </div>

        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className={getLabelClasses()}>
            Job Title*
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            value={cardData.jobTitle}
            onChange={handleInputChange}
            className={getInputClasses("jobTitle")}
            placeholder="Your professional title"
          />
          {getError("jobTitle")}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className={getLabelClasses()}>
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={cardData.location}
            onChange={handleInputChange}
            className={`${inputBaseClasses} ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="City, State/Country"
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className={getLabelClasses()}>
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={cardData.bio}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Tell people about yourself..."
          />
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6 mt-6 border-gray-200 dark:border-gray-600">
          <h4
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Contact Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className={getLabelClasses()}>
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={cardData.email}
                onChange={handleInputChange}
                className={getInputClasses("email")}
                placeholder="you@example.com"
              />
              {getError("email")}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={getLabelClasses()}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={cardData.phone}
                onChange={handleInputChange}
                className={`${inputBaseClasses} ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t pt-6 mt-6 border-gray-200 dark:border-gray-600">
          <h4
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Social Links
          </h4>

          <div className="space-y-4">
            {/* Website */}
            <div>
              <label htmlFor="website" className={getLabelClasses()}>
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={cardData.website}
                onChange={handleInputChange}
                className={getInputClasses("website")}
                placeholder="https://example.com"
              />
              {getError("website")}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LinkedIn */}
              <div>
                <label htmlFor="linkedin" className={getLabelClasses()}>
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  value={cardData.linkedin}
                  onChange={handleInputChange}
                  className={getInputClasses("linkedin")}
                  placeholder="linkedin.com/in/yourprofile"
                />
                {getError("linkedin")}
              </div>

              {/* GitHub */}
              <div>
                <label htmlFor="github" className={getLabelClasses()}>
                  GitHub
                </label>
                <input
                  id="github"
                  name="github"
                  type="text"
                  value={cardData.github}
                  onChange={handleInputChange}
                  className={getInputClasses("github")}
                  placeholder="github.com/yourusername"
                />
                {getError("github")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsForm
