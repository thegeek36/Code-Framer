// src/components/CompileModal.js
import React, { useState } from 'react';

function CompileModal({ isOpen, onClose, onCompile, language }) {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Compile {language}</h2>
        <textarea
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          rows="4"
          placeholder="Enter input for your code (optional)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onCompile(input)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Compile
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompileModal;