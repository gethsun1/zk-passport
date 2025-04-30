import React from 'react';
import { useZKPass } from '../contexts/ZKPassContext';
import { useTheme } from '../contexts/ThemeContext';
import { Clock, Check, Copy, ArrowLeft } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ProofDisplayProps = {
  onReset: () => void;
};

const ProofDisplay: React.FC<ProofDisplayProps> = ({ onReset }) => {
  const { proof, resetProof, twitterId } = useZKPass();
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState<boolean>(false);
  
  const isDarkMode = theme === 'dark';
  
  if (!proof) {
    return null;
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const handleCopyProof = () => {
    navigator.clipboard.writeText(proof.proof);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleBack = () => {
    resetProof();
    onReset();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Generated Proof</h2>
        <button
          onClick={handleBack}
          className={`flex items-center gap-1 py-1 px-3 rounded-md ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          } transition-colors duration-200`}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
      
      <div className={`rounded-lg p-4 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
      } transition-colors duration-200`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="mb-2 sm:mb-0">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Twitter ID
            </p>
            <p className="font-medium flex items-center">
              <Twitter size={16} className={`mr-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              {twitterId}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Created
              </p>
              <p className="font-medium flex items-center">
                <Clock size={16} className="mr-1" />
                {formatDate(proof.timestamp)}
              </p>
            </div>
            
            <div className={`px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-800'
            }`}>
              <div className="flex items-center">
                <Check size={16} className="mr-1" />
                <span className="text-sm font-medium">Valid</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={handleCopyProof}
              className={`p-2 rounded ${
                copied
                  ? isDarkMode ? 'bg-green-800' : 'bg-green-100'
                  : isDarkMode ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors duration-200`}
              aria-label="Copy proof to clipboard"
            >
              {copied ? (
                <Check size={16} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          
          <SyntaxHighlighter
            language="json"
            style={isDarkMode ? tomorrow : prism}
            customStyle={{
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              margin: 0,
            }}
          >
            {proof.proof}
          </SyntaxHighlighter>
        </div>
      </div>
      
      <div className={`rounded-lg p-4 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
      } transition-colors duration-200`}>
        <h3 className="text-lg font-semibold mb-3">Public Inputs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(proof.publicInputs).map(([key, value]) => (
            <div key={key}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {key}
              </p>
              <p className="font-medium">
                {typeof value === 'object' 
                  ? JSON.stringify(value) 
                  : typeof value === 'number' && key.toLowerCase().includes('timestamp')
                    ? formatDate(value)
                    : String(value)
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { Twitter } from 'lucide-react';

export default ProofDisplay;