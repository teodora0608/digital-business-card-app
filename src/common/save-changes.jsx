const SaveChanges = ({ onClick, isSaved }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-2 bg-white text-fuchsia-600 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100 hover:scale-105 ${
        isSaved ? "bg-green-100 text-green-700" : ""
      }`}
    >
      {isSaved ? (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Saved!
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  )
}

export default SaveChanges
