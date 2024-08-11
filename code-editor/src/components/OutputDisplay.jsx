import React from 'react';

function OutputDisplay({ output, darkMode }) {
  return (
    <div className={`p-6 rounded-lg shadow-lg h-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Output</h2>
      <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
        {output || 'Your output will appear here...'}
      </pre>
    </div>
  );
}

export default OutputDisplay;