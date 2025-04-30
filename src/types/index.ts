import { JsonRpcSigner, BrowserProvider } from 'ethers';

// Wallet Types
export type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface WalletState {
  status: WalletStatus;
  address: string | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  error: string | null;
}

// ZKPass Types
export interface ZKProof {
  id: string;
  twitterId: string;
  proof: string;
  publicInputs: Record<string, any>;
  timestamp: number;
}

export interface ZKPassState {
  twitterId: string;
  isGeneratingProof: boolean;
  proof: ZKProof | null;
  error: string | null;
}

// Theme Types
export type ThemeType = 'light' | 'dark';