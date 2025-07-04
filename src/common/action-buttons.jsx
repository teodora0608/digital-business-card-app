"use client"

const ActionButtons = ({ buttons, isDarkMode }) => {
  if (!buttons || buttons.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg font-medium transition-all duration-200 text-sm ${
            button.extraClasses ||
            (isDarkMode
              ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
              : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400")
          }`}
        >
          {button.icon && <span className="w-4 h-4 mr-2">{button.icon}</span>}
          <span>{button.label}</span>
        </button>
      ))}
    </div>
  )
}

export default ActionButtons
