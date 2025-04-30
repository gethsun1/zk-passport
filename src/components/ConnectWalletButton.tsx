import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, Loader2, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ConnectWalletButton: React.FC = () => {
  const { isConnected, isConnecting, address, connectWallet, disconnectWallet } = useWallet();
  const { theme } = useTheme();
  
  // Format address for display (0x1234...5678)
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className={`hidden sm:inline text-sm ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {formatAddress(address)}
        </span>
        
        <button
          onClick={disconnectWallet}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          } transition-colors duration-200`}
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Disconnect</span>
        </button>
      </div>
    );
  }
  
  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        isConnecting
          ? theme === 'dark'
            ? 'bg-indigo-800 cursor-not-allowed'
            : 'bg-indigo-300 cursor-not-allowed'
          : theme === 'dark'
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-indigo-500 hover:bg-indigo-600'
      } text-white transition-colors duration-200`}
    >
      {isConnecting ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet size={16} />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};

export default ConnectWalletButton;