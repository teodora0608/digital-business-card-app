const UserDetailsForm = ({ cardData, handleInputChange, isDarkMode }) => {
  return (
    <div
      className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
    >
      <h3
        className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
      >
        Personal Information
      </h3>

      <div className="space-y-6">
        {/* Name and Title Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={cardData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={cardData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Your professional title"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={cardData.location}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="City, State/Country"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
          >
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
            placeholder="Tell people about yourself and what you do..."
          />
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6 mt-6 border-gray-200 dark:border-gray-600">
          <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Contact Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={cardData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={cardData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
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
          <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Social Links</h4>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="website"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={cardData.website}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="yourwebsite.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="linkedin"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
                >
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={cardData.linkedin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label
                  htmlFor="github"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}
                >
                  GitHub
                </label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value={cardData.github}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="github.com/yourusername"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsForm
