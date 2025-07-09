// src/common/save-changes.jsx
import React from "react";

const SaveChanges = ({ onClick, isSaved, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center px-6 py-2 rounded-lg font-semibold transition-all duration-200
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
        ${isSaved ? "bg-green-100 text-green-700" : "bg-white text-fuchsia-600 hover:bg-gray-100"}
      `}
    >
      {isLoading ? (
        // Loading icon & text
        <>
          <svg
            className="animate-spin w-4 h-4 mr-2 text-fuchsia-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
            ></path>
          </svg>
          Saving…
        </>
      ) : isSaved ? (
        // Saved icon & text
        <>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Saved!
        </>
      ) : (
        // Default icon & text
        <>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Save Changes
        </>
      )}
    </button>
  );
};

export default SaveChanges;
