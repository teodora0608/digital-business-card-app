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
  variant = "default", // "default" | "standalone" - new prop for reusability
}) => {
  if (!cardData) return null;

  const baseCardContent = (textColor, buttonStyle) => (
    <>
      <div className="flex items-start space-x-4 mb-6">
        {showProfilePhoto &&
          (variant === "standalone" ? (
            // standalone mode: dacă există profileImage, o afișăm, altfel inițiala
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
                      : cardData.template === "corporate"
                      ? "text-blue-600"
                      : "text-fuchsia-600"
                  } font-bold text-xl`}
                >
                  {cardData.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            )
          ) : (
            // dashboard mode: folosește ProfilePhoto component
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
            className={`${variant === "standalone" ? "text-2xl" : "text-xl"} font-bold ${textColor} ${
              variant === "standalone" ? "mb-2" : "mb-1"
            } transition-all duration-300`}
          >
            {cardData.name}
          </h3>
          <p
            className={`${
              textColor === "text-white" ? "text-white/90" : "text-gray-600"
            } ${variant === "standalone" ? "text-lg mb-3" : "text-base mb-2"} transition-all duration-300`}
          >
            {cardData.title}
          </p>
          <div
            className={`flex items-center text-sm ${
              textColor === "text-white" ? "text-white/80" : "text-gray-500"
            } transition-all duration-300`}
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
        {cardData.github?.trim() && (
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
            {/* …SVG GitHub… */}
            <span className="font-medium">GitHub</span>
          </button>
        )}
        {cardData.linkedin?.trim() && (
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
            {/* …SVG LinkedIn… */}
            <span className="font-medium">LinkedIn</span>
          </button>
        )}
        {cardData.website?.trim() && (
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
            {/* …SVG Website… */}
            <span className="font-medium">Website</span>
          </button>
        )}
      </div>
    </>
  );

  const cardClasses = `w-full max-w-[400px] mx-auto rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl ${
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
        <div className={`${cardClasses} bg-white border border-gray-300`} onClick={handleCardClick}>
          {baseCardContent(
            "text-gray-900",
            "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300"
          )}
        </div>
      );
    case "dark":
      return (
        <div className={`${cardClasses} bg-slate-900 border border-slate-600 text-white`} onClick={handleCardClick}>
          {baseCardContent(
            "text-white",
            "bg-transparent border border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 active:bg-slate-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500"
          )}
        </div>
      );
    case "corporate":
      return (
        <div className={`${cardClasses} bg-blue-600 border border-blue-400 text-white`} onClick={handleCardClick}>
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
