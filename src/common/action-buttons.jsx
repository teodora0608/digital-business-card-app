// src/common/action-buttons.jsx
import React from "react";

const ActionButtons = ({ buttons, isDarkMode }) => {
  if (!buttons?.length) return null;

  return (
    <div className="flex flex-col space-y-3">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={`
            w-full flex items-center justify-center px-4 py-3 border rounded-lg font-medium text-sm transition-all duration-200
            ${
              btn.extraClasses ||
              (isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400")
            }
          `}
        >
          {btn.icon && (
            <span className="w-4 h-4 mr-2 inline-flex">
              {btn.icon}
            </span>
          )}
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
