"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../common/navbar";

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVisible, setIsVisible] = useState({})

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      
<Navbar
  isDarkMode={isDarkMode}
  setIsDarkMode={setIsDarkMode}
  showLogout={false}
  showProfileLink={false}
  showShare={false}
  showGetStarted={true}
  cardData={null}
/>

      {/* Hero Section */}
      <main className="container mx-auto px-6">
        <section className="py-24 lg:py-32 text-center">
          <div className="max-w-5xl mx-auto">
            <h1
              className={`text-5xl lg:text-7xl font-bold mb-8 leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Your Digital Business Card,{" "}
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                Ready in Minutes
              </span>
            </h1>

            <p
              className={`text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Create, customize, and share your professional digital business card instantly.
            </p>

            <Link
              to="/register"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl group"
            >
              Get Started Free
              <svg
                className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          data-animate
          className={`py-20 transition-all duration-1000 ${
            isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Responsive Design
              </h3>
              <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Perfect on any device, from mobile to desktop
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Instant Sharing
              </h3>
              <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Share via link or QR code instantly
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Personal Branding
              </h3>
              <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Customize themes and colors to match your style
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Dark/Light Mode
              </h3>
              <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Switch between themes for any preference
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section
          id="why-choose"
          data-animate
          className={`py-24 transition-all duration-1000 delay-200 ${
            isVisible["why-choose"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Why choose KeepCard?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Quick Start</h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Start creating immediately, upgrade for more features
                </p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Real-time Preview
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  See changes instantly as you customize your card
                </p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Professional Templates
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Choose from carefully designed themes for any industry
                </p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Mobile Optimized
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Perfect experience on smartphones and tablets
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`mt-24 transition-all duration-300 ${
          isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"
        } border-t`}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
                </svg>
              </div>
              <span
                className={`text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent`}
              >
                KeepCard
              </span>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z.017 0" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>

              <div className={`flex items-center space-x-6 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <a
                  href="#"
                  className={`${isDarkMode ? "hover:text-white" : "hover:text-gray-900"} transition-colors duration-200`}
                >
                  Contact
                </a>
                <a
                  href="#"
                  className={`${isDarkMode ? "hover:text-white" : "hover:text-gray-900"} transition-colors duration-200`}
                >
                  Terms
                </a>
                <a
                  href="#"
                  className={`${isDarkMode ? "hover:text-white" : "hover:text-gray-900"} transition-colors duration-200`}
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              © 2025 KeepCard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
