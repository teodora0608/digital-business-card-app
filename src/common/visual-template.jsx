const VisualTemplate = ({ templates, selectedTemplate, onSelectTemplate, isDarkMode }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {templates.map((template) => (
        <button
          key={template.name}
          onClick={() => onSelectTemplate(template.name.toLowerCase())}
          title={template.preview}
          className={`relative aspect-square rounded-2xl ${template.color} border-3 transition-all duration-200 hover:scale-105 ${
            selectedTemplate === template.name.toLowerCase()
              ? "border-purple-500 ring-4 ring-purple-200 shadow-xl"
              : isDarkMode
                ? "border-gray-600 hover:border-gray-500"
                : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
            <span className={`text-sm font-bold ${template.name === "Light" ? "text-gray-900" : "text-white"} mb-1`}>
              {template.name}
            </span>
            {selectedTemplate === template.name.toLowerCase() && (
              <div className="absolute top-2 right-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

export default VisualTemplate

