"use client"

import ProfilePhoto from "../common/profile-picture"
import BadgeDisplay from "../components/badge-display"

const BusinessCard = ({
  cardData,
  selectedBadges = [],
  isDarkMode = false,
  showProfilePhoto = true,
  isClickable = false,
  onCardClick = () => {},
  variant = "default", // "default" | "standalone" - new prop for reusability
}) => {
  if (!cardData) return null

  const baseCardContent = (textColor, buttonStyle) => (
    <>
      <div className="flex items-start space-x-4 mb-6">
        {showProfilePhoto &&
          (variant === "standalone" ? (
            // Design mai mare pentru profile page
            <div
              className={`w-16 h-16 ${
                cardData.template === "light"
                  ? "bg-gradient-to-r from-fuchsia-500 to-violet-600"
                  : cardData.template === "creative"
                    ? "bg-white"
                    : "bg-white"
              } rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300`}
            >
              <span
                className={`${
                  cardData.template === "light"
                    ? "text-white"
                    : cardData.template === "creative"
                      ? "text-fuchsia-600"
                      : cardData.template === "dark"
                        ? "text-slate-900"
                        : cardData.template === "corporate"
                          ? "text-blue-600"
                          : "text-fuchsia-600"
                } font-bold text-xl`}
              >
                {cardData.name.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            // Design normal pentru dashboard
            <ProfilePhoto
              profileImage={cardData.profileImage}
              template={cardData.template}
              isDarkMode={isDarkMode}
              size="w-14 h-14"
              showUploadButton={false}
              name={cardData.name}
              onUploadClick={() => {}}
            />
          ))}
        <div className="flex-1">
          <h3
            className={`${variant === "standalone" ? "text-2xl" : "text-xl"} font-bold ${textColor} ${variant === "standalone" ? "mb-2" : "mb-1"} transition-all duration-300`}
          >
            {cardData.name}
          </h3>
          <p
            className={`${textColor === "text-white" ? "text-white/90" : "text-gray-600"} ${variant === "standalone" ? "text-lg mb-3" : "text-base mb-2"} transition-all duration-300`}
          >
            {cardData.title}
          </p>
          <div
            className={`flex items-center text-sm ${textColor === "text-white" ? "text-white/80" : "text-gray-500"} transition-all duration-300`}
          >
            <svg
              className={`w-4 h-4 ${variant === "standalone" ? "mr-2" : "mr-1"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {cardData.location}
          </div>
        </div>
      </div>

      <p
        className={`${textColor === "text-white" ? "text-white/90" : "text-gray-600"} text-sm mb-6 leading-relaxed transition-all duration-300`}
      >
        {cardData.bio}
      </p>

      {/* Professional Badges */}
      <BadgeDisplay badges={selectedBadges} template={cardData.template} textColor={textColor} />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {isClickable || variant === "standalone" ? (
          <>
            <a
              href={`mailto:${cardData.email}`}
              className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
            >
              <svg
                className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Email</span>
            </a>
            <a
              href={`tel:${cardData.phone}`}
              className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
            >
              <svg
                className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-medium">Call</span>
            </a>
          </>
        ) : (
          <>
            <button
              className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
            >
              <svg
                className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Email</span>
            </button>
            <button
              className={`flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group`}
            >
              <svg
                className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-medium">Call</span>
            </button>
          </>
        )}
      </div>

      <div className="space-y-3">
        {cardData.github && (
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group ${
              isClickable || variant === "standalone" ? "cursor-pointer" : ""
            }`}
            onClick={
              isClickable || variant === "standalone"
                ? () => window.open(`https://${cardData.github}`, "_blank")
                : undefined
            }
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium">GitHub</span>
          </button>
        )}
        {cardData.linkedin && (
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group ${
              isClickable || variant === "standalone" ? "cursor-pointer" : ""
            }`}
            onClick={
              isClickable || variant === "standalone"
                ? () => window.open(`https://${cardData.linkedin}`, "_blank")
                : undefined
            }
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-medium">LinkedIn</span>
          </button>
        )}
        {cardData.website && (
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group ${
              isClickable || variant === "standalone" ? "cursor-pointer" : ""
            }`}
            onClick={
              isClickable || variant === "standalone"
                ? () => window.open(`https://${cardData.website}`, "_blank")
                : undefined
            }
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
              />
            </svg>
            <span className="font-medium">Website</span>
          </button>
        )}
      </div>
    </>
  )

  const cardClasses = `w-full max-w-[400px] mx-auto rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl ${
    isClickable ? "cursor-pointer hover:scale-105" : ""
  }`

  const handleCardClick = () => {
    if (isClickable && onCardClick) {
      onCardClick()
    }
  }

  switch (cardData.template) {
    case "light":
      return (
        <div className={`${cardClasses} bg-white border border-gray-300`} onClick={handleCardClick}>
          {baseCardContent(
            "text-gray-900",
            "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300",
          )}
        </div>
      )
    case "dark":
      return (
        <div className={`${cardClasses} bg-slate-900 border border-slate-600 text-white`} onClick={handleCardClick}>
          {baseCardContent(
            "text-white",
            "bg-transparent border border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 active:bg-slate-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500",
          )}
        </div>
      )
    case "corporate":
      return (
        <div className={`${cardClasses} bg-blue-600 border border-blue-400 text-white`} onClick={handleCardClick}>
          {baseCardContent(
            "text-white",
            "bg-transparent border border-blue-400 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300",
          )}
        </div>
      )
    case "creative":
    default:
      return (
        <div
          className={`${cardClasses} bg-gradient-to-br from-fuchsia-500 to-violet-600 border border-white/30 text-white`}
          onClick={handleCardClick}
        >
          {baseCardContent(
            "text-white",
            "bg-transparent border border-white text-white hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/80 active:bg-white/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50",
          )}
        </div>
      )
  }
}

export default BusinessCard
