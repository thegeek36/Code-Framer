import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import ActionButton from './components/ActionButton';
import OutputDisplay from './components/OutputDisplay';
import ConversionModal from './components/Convert';
import CompileModal from './components/CompileModal';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [isCompileModalOpen, setIsCompileModalOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const boilerplateCode = {
        javascript: `console.log('Hello, World!');`,
        python: `print("Hello, World!")`,
        java: `public class Main {
          public static void main(String[] args) {
              System.out.println("Hello, World!");
          }
      }`,
        c: `#include <stdio.h>
      
      int main() {
          printf("Hello, World!");
          return 0;
      }`,
        cpp: `#include <iostream>
      
      int main() {
          std::cout << "Hello, World!" << std::endl;
          return 0;
      }`
      };
      
    const handleLanguageChange = (newLanguage) => {
      setLanguage(newLanguage);
      setCode(boilerplateCode[newLanguage]); 
    };

  const handleAction = async (action) => {
    if (action === 'convert') {
      setIsConversionModalOpen(true);
    } else if (action === 'compile') {
      setIsCompileModalOpen(true);
    } else {
      try {
        const response = await fetch(`http://localhost:5000/api/${action}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, language }),
        });

        if (!response.ok) {
          throw new Error(`${action} failed`);
        }

        const result = await response.json();
        setOutput(result[`${action}edCode`] || result[action] || result.output);
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    }
  };

  const handleConvert = async (targetLanguage) => {
    setIsConversionModalOpen(false);
    setOutput('Converting...');

    try {
      const response = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, fromLanguage: language, toLanguage: targetLanguage }),
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const result = await response.json();
      setOutput(result.convertedCode);
    } catch (error) {
      setOutput(`Conversion error: ${error.message}`);
    }
  };

  const handleCompile = async (input) => {
    setIsCompileModalOpen(false);
    setOutput('Compiling...');
    
    try {
      const response = await fetch('http://localhost:5000/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code, input }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Compilation failed');
      }
      
      setOutput(result.output);
    } catch (error) {
      setOutput(`Compilation error: ${error.message}`);
      console.error('Compilation error:', error);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-300 text-black'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">CodeCrafter</h1>
          <button
            onClick={toggleDarkMode}
            className="px-2 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-slate-300'}`}>
            <LanguageSelector language={language} setLanguage={handleLanguageChange} />
            <CodeEditor language={language} code={code} setCode={setCode} darkMode={darkMode} />
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <ActionButton onClick={() => handleAction('compile')} label="Compile" color="green" />
                {/* <ActionButton onClick={() => handleAction('run')} label="Run" color="blue" /> */}
                <ActionButton onClick={() => handleAction('convert')} label="Convert" color="yellow" />
                <ActionButton onClick={() => handleAction('pseudocode')} label="Pseudo Code" color="indigo" />
                <ActionButton onClick={() => handleAction('algorithm')} label="Algorithm" color="purple" />
                <ActionButton onClick={() => handleAction('comment')} label="Comment" color="pink" />
                <ActionButton onClick={() => handleAction('optimize')} label="Optimize" color="red" />
                {/* <ActionButton onClick={() => handleAction('alternatives')} label="Alternatives" color="teal" /> */}
              </div>
            </div>
          </div>
          <div>
            <OutputDisplay output={output} darkMode={darkMode} />
          </div>
        </div>
      </div>
      <footer className="relative z-10 mt-auto py-4 text-center text-l text-gray-600 dark:text-gray-400">
        <p>Designed and developed with ❤️ by Priyanshu Panda</p>
        <p>Powered by OpenAI GPT-3</p>
      </footer>
      <ConversionModal
        isOpen={isConversionModalOpen}
        onClose={() => setIsConversionModalOpen(false)}
        currentLanguage={language}
        onConvert={handleConvert}
      />
      <CompileModal
        isOpen={isCompileModalOpen}
        onClose={() => setIsCompileModalOpen(false)}
        onCompile={handleCompile}
        language={language}
      />
    </div>
  );
}

export default App;