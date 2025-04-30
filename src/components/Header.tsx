import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Fingerprint, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ConnectWalletButton from './ConnectWalletButton';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`py-4 px-6 sm:px-8 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } transition-colors duration-200 shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Fingerprint className="h-8 w-8 text-indigo-500" />
          <h1 className="text-xl font-bold tracking-tight">ZKPass Twitter</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors duration-200`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>
          
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;