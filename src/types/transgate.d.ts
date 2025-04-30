declare module '@zkpass/transgate-js-sdk' {
  interface TransgateConfig {
    schemaId: string;
    appId: string;
    twitterBearerToken: string;
  }

  interface ProofInput {
    twitterId: string;
    signer: any;
  }

  interface ProofOutput {
    proof: any;
    publicInputs: Record<string, any>;
  }

  export default class TransgateSDK {
    constructor(config: TransgateConfig);
    createProof(input: ProofInput): Promise<ProofOutput>;
  }
}