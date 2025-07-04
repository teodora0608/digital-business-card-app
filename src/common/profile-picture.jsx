"use client"

const ProfilePhoto = ({
  profileImage = null,
  template = "creative",
  isDarkMode = false,
  size = "w-20 h-20",
  showUploadButton = true,
  onUploadClick = () => {},
  name = "User", // Adaugă prop pentru nume
}) => {
  // Get gradient based on template
  const getGradient = () => {
    switch (template) {
      case "light":
        return "bg-gradient-to-r from-fuchsia-500 to-violet-600"
      case "dark":
        return "bg-white"
      case "corporate":
        return "bg-white"
      case "creative":
      default:
        return "bg-white" // Changed from gradient to white for creative template
    }
  }

  // Get text color for the first letter
  const getTextColor = () => {
    switch (template) {
      case "light":
        return "text-white"
      case "dark":
        return "text-fuchsia-600"
      case "corporate":
        return "text-blue-600"
      case "creative":
      default:
        return "text-fuchsia-600" // Changed from white to fuchsia for better contrast on white background
    }
  }

  // Get first letter from name
  const getFirstLetter = () => {
    if (!name || name.trim() === "") return "U"
    return name.trim().charAt(0).toUpperCase()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Photo Circle */}
      <div
        className={`
          ${size} 
          rounded-full 
          flex 
          items-center 
          justify-center 
          flex-shrink-0 
          transition-all 
          duration-300
          ${!profileImage ? getGradient() : ""}
        `}
        style={
          profileImage
            ? {
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {!profileImage && <span className={`${getTextColor()} font-bold text-2xl`}>{getFirstLetter()}</span>}
      </div>

      {/* Upload Button */}
      {showUploadButton && (
        <button
          onClick={onUploadClick}
          className={`
            flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105
            ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm"
            }
          `}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Upload Photo
        </button>
      )}
    </div>
  )
}

export default ProfilePhoto