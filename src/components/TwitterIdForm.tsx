import React, { useState } from 'react';
import { useZKPass } from '../contexts/ZKPassContext';
import { Twitter, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type TwitterIdFormProps = {
  onProofGenerated: () => void;
};

const TwitterIdForm: React.FC<TwitterIdFormProps> = ({ onProofGenerated }) => {
  const { twitterId, setTwitterId, isGeneratingProof, generateProof, proof, error } = useZKPass();
  const [localTwitterId, setLocalTwitterId] = useState<string>(twitterId);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwitterId(localTwitterId);
    await generateProof();
    
    if (!isGeneratingProof && !error) {
      onProofGenerated();
    }
  };
  
  // Trigger onProofGenerated when proof is generated
  React.useEffect(() => {
    if (proof && !isGeneratingProof) {
      onProofGenerated();
    }
  }, [proof, isGeneratingProof, onProofGenerated]);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Enter Your Twitter ID</h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400 text-center">
        Provide your Twitter ID to generate a ZK proof for Twitter verification.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Twitter size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
            </div>
            <input
              type="text"
              id="twitterId"
              value={localTwitterId}
              onChange={(e) => setLocalTwitterId(e.target.value)}
              placeholder="Enter your Twitter ID (e.g., elonmusk)"
              className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                error 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } transition-colors duration-200`}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGeneratingProof || !localTwitterId.trim()}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg ${
              isGeneratingProof || !localTwitterId.trim()
                ? isDarkMode ? 'bg-indigo-800 cursor-not-allowed' : 'bg-indigo-300 cursor-not-allowed'
                : isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white transition-colors duration-200`}
          >
            {isGeneratingProof ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Generating Proof...</span>
              </>
            ) : (
              <>
                <span>Generate Proof</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwitterIdForm;