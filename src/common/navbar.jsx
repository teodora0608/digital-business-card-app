"use client"

import { Link } from "react-router-dom"

const Navbar = ({
  isDarkMode = false,
  setIsDarkMode,
  showLogout = false,
  showProfileLink = false,
  showShare = false,
  showGetStarted = false,
  cardData = null,
}) => {
  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked")
  }

  const handleShare = () => {
    // Add share logic here
    console.log("Share clicked")
  }

  const getInitials = (name) => {
    if (!name) return "U"
    return name.charAt(0).toUpperCase()
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-gray-100"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-3">
            {/* Hamburger Menu */}
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Logo */}
            <Link to="/" className="transition-transform hover:scale-105">
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                KeepCard
              </span>
            </Link>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {setIsDarkMode && (
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            )}

            {/* Share Button */}
            {showShare && (
              <button
                onClick={handleShare}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share
              </button>
            )}

            {/* Sign In Button */}
            {!showProfileLink && (
              <Link
                to="/login"
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Sign In
              </Link>
            )}

            {/* Get Started Button */}
            {showGetStarted && (
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-200"
              >
                Get Started
              </Link>
            )}

            {/* Profile Link */}
            {showProfileLink && cardData && (
              <Link
                to={`/profile/${cardData.customUrl}`}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{getInitials(cardData.name)}</span>
                </div>
                <span className="font-medium">{cardData.name}</span>
              </Link>
            )}

            {/* Logout Button */}
            {showLogout && (
              <button
                onClick={handleLogout}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


export default Navbar;