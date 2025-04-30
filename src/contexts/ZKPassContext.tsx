import React, { createContext, useContext, useState } from 'react';
import { useWallet } from './WalletContext';
import TransgateSDK from '@zkpass/transgate-js-sdk';

type Proof = {
  id: string;
  twitterId: string;
  proof: string;
  publicInputs: Record<string, any>;
  timestamp: number;
};

type ZKPassContextType = {
  twitterId: string;
  setTwitterId: (id: string) => void;
  isGeneratingProof: boolean;
  proof: Proof | null;
  error: string | null;
  generateProof: () => Promise<void>;
  resetProof: () => void;
};

const ZKPassContext = createContext<ZKPassContextType>({
  twitterId: '',
  setTwitterId: () => {},
  isGeneratingProof: false,
  proof: null,
  error: null,
  generateProof: async () => {},
  resetProof: () => {},
});

export const useZKPass = () => useContext(ZKPassContext);

export const ZKPassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signer, isConnected } = useWallet();
  const [twitterId, setTwitterId] = useState<string>('');
  const [isGeneratingProof, setIsGeneratingProof] = useState<boolean>(false);
  const [proof, setProof] = useState<Proof | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateProof = async () => {
    if (!isConnected || !signer) {
      setError('Please connect your wallet first');
      return;
    }

    if (!twitterId.trim()) {
      setError('Please enter a valid Twitter ID');
      return;
    }

    setIsGeneratingProof(true);
    setError(null);

    try {
      const sdk = new TransgateSDK({
        schemaId: import.meta.env.VITE_SCHEMA_ID,
        appId: import.meta.env.VITE_APP_ID,
        twitterBearerToken: import.meta.env.VITE_TWITTER_BEARER_TOKEN,
      });

      // Use the correct method name from the SDK
      const generatedProof = await sdk.createProof({
        twitterId,
        signer,
      });

      const proofData: Proof = {
        id: `proof-${Date.now()}`,
        twitterId,
        proof: JSON.stringify(generatedProof.proof, null, 2),
        publicInputs: generatedProof.publicInputs,
        timestamp: Date.now(),
      };

      setProof(proofData);
    } catch (err) {
      console.error('Error generating proof:', err);
      setError('Failed to generate proof. Please try again.');
    } finally {
      setIsGeneratingProof(false);
    }
  };

  const resetProof = () => {
    setProof(null);
    setError(null);
  };

  return (
    <ZKPassContext.Provider
      value={{
        twitterId,
        setTwitterId,
        isGeneratingProof,
        proof,
        error,
        generateProof,
        resetProof,
      }}
    >
      {children}
    </ZKPassContext.Provider>
  );
};
