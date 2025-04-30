import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import TwitterIdForm from './TwitterIdForm';
import ProofDisplay from './ProofDisplay';
import { Check, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type Step = 'connect' | 'input' | 'proof';

const PassportFlow: React.FC = () => {
  const { isConnected } = useWallet();
  const [currentStep, setCurrentStep] = useState<Step>(isConnected ? 'input' : 'connect');
  const { theme } = useTheme();
  
  // Set the current step based on wallet connection status
  React.useEffect(() => {
    if (isConnected) {
      setCurrentStep(prevStep => prevStep === 'connect' ? 'input' : prevStep);
    } else {
      setCurrentStep('connect');
    }
  }, [isConnected]);
  
  const handleProofGenerated = () => {
    setCurrentStep('proof');
  };
  
  const handleReset = () => {
    setCurrentStep('input');
  };
  
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'connect' 
                ? isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
                : currentStep === 'input' || currentStep === 'proof'
                  ? isDarkMode ? 'bg-green-600' : 'bg-green-500'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            } transition-colors duration-200`}>
              {currentStep === 'connect' ? (
                <span className="text-white font-medium">1</span>
              ) : (
                <Check className="text-white" size={20} />
              )}
            </div>
            <span className={`mt-2 text-sm ${
              currentStep === 'connect'
                ? isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                : isDarkMode ? 'text-green-400' : 'text-green-600'
            } font-medium`}>
              Connect Wallet
            </span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${
            currentStep === 'input' || currentStep === 'proof'
              ? isDarkMode ? 'bg-green-600' : 'bg-green-500'
              : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          } transition-colors duration-200`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'input' 
                ? isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
                : currentStep === 'proof'
                  ? isDarkMode ? 'bg-green-600' : 'bg-green-500'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            } transition-colors duration-200`}>
              {currentStep === 'proof' ? (
                <Check className="text-white" size={20} />
              ) : currentStep === 'input' ? (
                <span className="text-white font-medium">2</span>
              ) : (
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>2</span>
              )}
            </div>
            <span className={`mt-2 text-sm ${
              currentStep === 'input'
                ? isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                : currentStep === 'proof'
                  ? isDarkMode ? 'text-green-400' : 'text-green-600'
                  : isDarkMode ? 'text-gray-500' : 'text-gray-600'
            } font-medium`}>
              Enter Twitter ID
            </span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${
            currentStep === 'proof'
              ? isDarkMode ? 'bg-green-600' : 'bg-green-500'
              : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          } transition-colors duration-200`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'proof' 
                ? isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            } transition-colors duration-200`}>
              {currentStep === 'proof' ? (
                <span className="text-white font-medium">3</span>
              ) : (
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>3</span>
              )}
            </div>
            <span className={`mt-2 text-sm ${
              currentStep === 'proof'
                ? isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                : isDarkMode ? 'text-gray-500' : 'text-gray-600'
            } font-medium`}>
              View Proof
            </span>
          </div>
        </div>
      </div>
      
      {/* Content based on current step */}
      <div className={`rounded-xl p-6 shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } transition-all duration-300`}>
        {currentStep === 'connect' && (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Connect your Ethereum wallet to get started with ZKPass Twitter verification.
            </p>
            <div className="flex justify-center">
              <ConnectWalletButton />
            </div>
          </div>
        )}
        
        {currentStep === 'input' && (
          <TwitterIdForm onProofGenerated={handleProofGenerated} />
        )}
        
        {currentStep === 'proof' && (
          <ProofDisplay onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

import ConnectWalletButton from './ConnectWalletButton';

export default PassportFlow;