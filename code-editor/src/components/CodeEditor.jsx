import React from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ language, code, setCode, darkMode }) {
  return (
    <div className="border rounded ">
      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={setCode}
        theme={darkMode ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
}

export default CodeEditor;