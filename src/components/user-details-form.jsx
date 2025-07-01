
const UserDetailsForm = ({ cardData, handleInputChange, isDarkMode = false }) => {
  return (
    <div className="space-y-8">
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
            <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
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
            <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
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
            <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
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
            <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
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
            <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
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
            <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
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
            <label className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-3`}>
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
    </div>
  )
}

export default UserDetailsForm
