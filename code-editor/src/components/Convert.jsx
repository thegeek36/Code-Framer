// src/components/ConversionModal.js
import React from 'react';

const languages = ['Python', 'C++', 'C', 'Java', 'JavaScript', 'PHP'];

function ConversionModal({ isOpen, onClose, currentLanguage, onConvert }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Convert to:</h2>
        <div className="grid grid-cols-2 gap-4">
          {languages.filter(lang => lang.toLowerCase() !== currentLanguage.toLowerCase()).map(lang => (
            <button
              key={lang}
              onClick={() => onConvert(lang.toLowerCase())}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {lang}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConversionModal;