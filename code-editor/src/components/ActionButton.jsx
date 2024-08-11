import React from 'react';

function ActionButton({ onClick, label, color }) {
  const baseClasses = "px-4 py-2 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
    yellow: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400",
    indigo: "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-400",
    purple: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-400",
    pink: "bg-pink-500 hover:bg-pink-600 focus:ring-pink-400",
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
    teal: "bg-teal-500 hover:bg-teal-600 focus:ring-teal-400",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[color]}`}
    >
      {label}
    </button>
  );
}

export default ActionButton;