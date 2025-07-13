// src/common/profile-photo.jsx
"use client";

import { useRef, useEffect } from "react";

const ProfilePhoto = ({
  profileImage = null,
  template = "creative",
  isDarkMode = false,
  size = "w-20 h-20",
  showUploadButton = true,
  onImageChange = () => {},
  name = "User",
}) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const myFile = e.target.files[0];
    if (myFile) {
      const fr = new FileReader();
      fr.addEventListener("load", () => {
        const imageURL = fr.result;
        onImageChange(imageURL);
        localStorage.setItem("profileImage", imageURL);
      });
      fr.readAsDataURL(myFile);
    }
  };

  const handleRemove = () => {
    localStorage.removeItem("profileImage");
    onImageChange(null);
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage && !profileImage) {
      onImageChange(storedImage);
    }
  }, []);

  const getGradient = () => {
    switch (template) {
      case "light":
        return "bg-gradient-to-r from-fuchsia-500 to-violet-600";
      case "dark":
      case "corporate":
      case "creative":
      default:
        return "bg-white";
    }
  };

  const getTextColor = () => {
    switch (template) {
      case "light":
        return "text-white";
      case "dark":
        return "text-fuchsia-600";
      case "corporate":
        return "text-blue-600";
      case "creative":
      default:
        return "text-fuchsia-600";
    }
  };

  const getFirstLetter = () => {
    if (!name || name.trim() === "") return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`
          ${size}
          rounded-full
          flex
          items-center
          justify-center
          overflow-hidden
          transition-all duration-300
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
        {!profileImage && (
          <span className={`${getTextColor()} font-bold text-2xl`}>
            {getFirstLetter()}
          </span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {showUploadButton && (
        <div className="flex space-x-4">
          <button
            onClick={handleUploadClick}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105
              ${isDarkMode
                ? "bg-gray-700 text-gray-300 border border-gray-600"
                : "bg-white text-gray-700 border border-gray-200 shadow-sm"}
            `}
          >
            Upload Photo
          </button>

          {profileImage && (
            <button
              onClick={handleRemove}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105
                ${isDarkMode
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 border border-red-200"}
              `}
            >
              Remove Photo
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
