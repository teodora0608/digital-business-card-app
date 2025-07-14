// src/common/business-card.jsx
import ProfilePhoto from "../common/profile-picture";
import BadgeDisplay from "../components/badge-display";

const BusinessCard = ({
  cardData,
  selectedBadges = [],
  isDarkMode = false,
  showProfilePhoto = true,
  isClickable = false,
  onCardClick = () => {},
  variant = "default", // "default" | "standalone"
}) => {
  if (!cardData) return null;

  // Încearcă mailto:, după 500ms dă fallback către Gmail web
  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
        "_blank",
        "noopener"
      );
    }, 500);
  };

  const baseCardContent = (textColor, buttonStyle) => (
    <>
      <div className="flex items-start space-x-4 mb-6">
        {showProfilePhoto &&
          (variant === "standalone" ? (
            cardData.profileImage?.trim() ? (
              <div
                className="w-16 h-16 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url(${cardData.profileImage})` }}
              />
            ) : (
              <div
                className={`w-16 h-16 ${
                  cardData.template === "light"
                    ? "bg-gradient-to-r from-fuchsia-500 to-violet-600"
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
                      : "text-blue-600"
                  } font-bold text-xl`}
                >
                  {cardData.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            )
          ) : (
            <ProfilePhoto
              profileImage={cardData.profileImage}
              template={cardData.template}
              isDarkMode={isDarkMode}
              size="w-14 h-14"
              showUploadButton={false}
              name={cardData.name}
            />
          ))}
        <div className="flex-1">
          <h3
            className={`${
              variant === "standalone" ? "text-2xl" : "text-xl"
            } font-bold ${textColor} ${
              variant === "standalone" ? "mb-2" : "mb-1"
            } transition-all duration-300`}
          >
            {cardData.name}
          </h3>
          <p
            className={`${
              textColor === "text-white" ? "text-white/90" : "text-gray-600"
            } ${
              variant === "standalone" ? "text-lg mb-3" : "text-base mb-2"
            } transition-all duration-300`}
          >
            {cardData.jobTitle}
          </p>
          <div
            className={`flex items-center text-sm ${
              textColor === "text-white" ? "text-white/80" : "text-gray-500"
            } transition-all duration-300`}
          >
            <svg
              className={`w-4 h-4 ${
                variant === "standalone" ? "mr-2" : "mr-1"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 
                   0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {cardData.location}
          </div>
        </div>
      </div>

      <p
        className={`${
          textColor === "text-white" ? "text-white/90" : "text-gray-600"
        } text-sm mb-6 leading-relaxed transition-all duration-300`}
      >
        {cardData.bio}
      </p>

      <BadgeDisplay
        badges={selectedBadges}
        template={cardData.template}
        textColor={textColor}
      />

      {/* Email & Call */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => handleEmailClick(cardData.email)}
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
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 
                 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 
                 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium">Email</span>
        </button>
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
              d="M3 5a2 2 0 012-2h3.28a1 1 
                 0 01.948.684l1.498 4.493a1 1 
                 0 01-.502 1.21l-2.257 1.13a11.042 
                 11.042 0 005.516 5.516l1.13-2.257a1 
                 1 0 011.21-.502l4.493 1.498a1 
                 1 0 01.684.949V19a2 2 0 01-2 
                 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="font-medium">Call</span>
        </a>
      </div>

      {/* GitHub, LinkedIn, Website */}
      <div className="space-y-3">
        {cardData.github?.trim() && (
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group ${
              isClickable || variant === "standalone" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              window.open(
                cardData.github.startsWith("http")
                  ? cardData.github
                  : `https://${cardData.github}`,
                "_blank"
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 
                12 0 5.303 3.438 9.8 8.205 
                11.387.6.113.82-.258.82-.577
                0-.285-.01-1.04-.015-2.04-3.338.724
                -4.042-1.61-4.042-1.61-.546-1.387
                -1.333-1.756-1.333-1.756-1.087
                -.744.083-.729.083-.729 1.205.084
                1.84 1.236 1.84 1.236 1.07 1.836
                2.809 1.305 3.495.998.108-.776
                .42-1.305.763-1.605-2.665-.3
                -5.466-1.332-5.466-5.93 0-1.31.468
                -2.38 1.236-3.22-.124-.303-.536
                -1.523.116-3.176 0 0 1.008-.322
                3.301 1.23.957-.266 1.983-.399
                3.003-.404 1.02.005 2.047.138
                3.006.404 2.291-1.552 3.297-1.23
                3.297-1.23.653 1.653.241 2.873
                .118 3.176.77.84 1.234 1.91
                1.234 3.22 0 4.61-2.803 5.625
                -5.475 5.92.431.372.815 1.102
                .815 2.222 0 1.606-.014 2.899
                -.014 3.293 0 .322.216.694.825
                .576C20.565 22.092 24 17.592 24 
                12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span className="font-medium">GitHub</span>
          </button>
        )}
        {cardData.linkedin?.trim() && (
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group ${
              isClickable || variant === "standalone" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              window.open(
                cardData.linkedin.startsWith("http")
                  ? cardData.linkedin
                  : `https://${cardData.linkedin}`,
                "_blank"
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 
                2.239-5 5v14c0 2.761 2.239 
                5 5 5h14c2.761 0 5-2.239 
                5-5v-14c0-2.761-2.239-5
                -5-5zm-11 19h-3v-10h3v10zm
                -1.5-11.268c-.966 0-1.75-.785
                -1.75-1.75s.784-1.75 1.75-1.75
                1.75.785 1.75 1.75-.784
                1.75-1.75 1.75zm13.5 11.268h
                -3v-5.604c0-1.337-.027-3.057
                -1.865-3.057-1.865 0-2.151
                1.454-2.151 2.957v5.704h-3
                v-10h2.879v1.367h.041c.401
                -.761 1.379-1.561 2.838-1.561
                3.034 0 3.598 1.997 3.598 4.589
                v5.605z"/>
            </svg>
            <span className="font-medium">LinkedIn</span>
          </button>
        )}
        {cardData.website?.trim() && (
          <button
            className={`w-full flex items-center justify-center px-4 py-3 ${buttonStyle} rounded-lg transition-all duration-200 min-h-[44px] group ${
              isClickable || variant === "standalone" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              window.open(
                cardData.website.startsWith("http")
                  ? cardData.website
                  : `https://${cardData.website}`,
                "_blank"
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 3h7v7m0-7L10 14m-4 7H3v-7"
              />
            </svg>
            <span className="font-medium">Website</span>
          </button>
        )}
      </div>
    </>
  );

  const cardClasses = `w-full max-w-[400px] mx-auto rounded-2xl p-8 shadow-xl transition-all duration-300 ${
    isClickable ? "cursor-pointer hover:scale-105" : ""
  }`;

  const handleCardClick = () => {
    if (isClickable && onCardClick) {
      onCardClick();
    }
  };

  switch (cardData.template) {
    case "light":
      return (
        <div
          className={`${cardClasses} bg-white border border-gray-300`}
          onClick={handleCardClick}
        >
          {baseCardContent(
            "text-gray-900",
            "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300"
          )}
        </div>
      );
    case "dark":
      return (
        <div
          className={`${cardClasses} bg-slate-900 border border-slate-600 text-white`}
          onClick={handleCardClick}
        >
          {baseCardContent(
            "text-white",
            "bg-transparent border border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 active:bg-slate-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500"
          )}
        </div>
      );
    case "corporate":
      return (
        <div
          className={`${cardClasses} bg-blue-600 border border-blue-400 text-white`}
          onClick={handleCardClick}
        >
          {baseCardContent(
            "text-white",
            "bg-transparent border border-blue-400 text-white hover:bg-blue-500 hover:border-blue-300 active:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
          )}
        </div>
      );
    case "creative":
    default:
      return (
        <div
          className={`${cardClasses} bg-gradient-to-br from-fuchsia-500 to-violet-600 border border-white/30 text-white`}
          onClick={handleCardClick}
        >
          {baseCardContent(
            "text-white",
            "bg-transparent border border-white text-white hover:bg-white/20 hover:backdrop-blur-sm hover:border-white/80 active:bg-white/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
          )}
        </div>
      );
  }
};

export default BusinessCard;
