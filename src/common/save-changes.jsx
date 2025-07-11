// src/common/save-changes.jsx
import React from 'react'

const SaveChanges = ({ onClick, isSaved, isLoading, disabled = false }) => {
  const isDisabled = isLoading || disabled

  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`
        flex items-center px-6 py-2 rounded-lg font-semibold transition-all duration-200
        ${isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
          : 'bg-white text-fuchsia-600 hover:bg-gray-100 hover:scale-105 cursor-pointer'}
        ${isSaved && !isDisabled ? 'bg-green-100 text-green-700' : ''}
      `}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin w-4 h-4 mr-2 text-fuchsia-600" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" className="opacity-75"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
            />
          </svg>
          Saving…
        </>
      ) : isSaved ? (
        <>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Saved!
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          Save Changes
        </>
      )}
    </button>
  )
}

export default SaveChanges
