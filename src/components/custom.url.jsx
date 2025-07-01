const CustomUrl = ({ customUrl = "", onUrlChange, isDarkMode = false }) => {
  const handleInputChange = (e) => {
    if (onUrlChange) {
      onUrlChange(e.target.value);
    }
  };

  return (
    <div>
      <div
              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl`}
            >
              <div className="flex items-center mb-6">
                <svg
                  className={`w-6 h-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"} mr-3`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <h3
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
                >
                  Custom URL
                </h3>
              </div>
              <div
                className={`flex items-center ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} border rounded-xl p-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-500`}
              >
                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm font-medium`}>
                  keepcard.app/
                </span>
                <input
                  type="text"
                  name="customUrl"
                  value={customUrl}
                  onChange={handleInputChange}
                  className={`flex-1 bg-transparent border-none outline-none ${isDarkMode ? "text-white" : "text-gray-900"} font-medium ml-1`}
                />
              </div>
              <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"} mt-3`}>
                Choose a unique URL for your digital business card
              </p>
            </div>

    </div>
  );
};

export default CustomUrl;