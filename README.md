# ZKPass Twitter Passport Proof Flow

[![Screenshot-from-2025-04-30-21-35-07.png](https://i.postimg.cc/L8ypgmk0/Screenshot-from-2025-04-30-21-35-07.png)](https://postimg.cc/4YhMrkSz)

---

A React application demonstrating the ZKPass Twitter Passport proof generation flow, built with React, TypeScript, and Vite.

## Features

- Wallet connection using ethers.js v6
- Twitter ID input and validation
- ZK proof generation for Twitter accounts using ZKPass SDK
- Responsive, modern UI with Tailwind CSS
- Dark/light mode support
- Step-by-step guided user flow

## ZKPass SDK Integration

This application demonstrates the integration of the ZKPass SDK (`@zkpass/transgate-js-sdk`) for generating zero-knowledge proofs for Twitter accounts. The integration includes:

### Mock Implementation

Currently, the application uses a mock version of the ZKPass SDK for demonstration purposes. The mock implementation:

1. Simulates proof generation for Twitter accounts
2. Demonstrates the expected data flow and UI interactions
3. Shows the structure of proofs and public inputs

### SDK Configuration

```typescript
const sdk = new TransgateSDK({
  schemaId: import.meta.env.VITE_SCHEMA_ID,
  appId: import.meta.env.VITE_APP_ID,
  twitterBearerToken: import.meta.env.VITE_TWITTER_BEARER_TOKEN,
});
```

### Proof Generation Flow

1. Connect wallet using ethers.js
2. Input Twitter ID
3. Generate proof using `sdk.createProof()`
4. Display proof and public inputs

### Example Proof Structure

```typescript
type Proof = {
  id: string;
  twitterId: string;
  proof: string;
  publicInputs: Record<string, any>;
  timestamp: number;
};
```

## Technologies Used

- React 18
- TypeScript
- Vite
- ethers.js v6
- @zkpass/transgate-js-sdk
- Tailwind CSS
- react-syntax-highlighter

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/gethsun1/zk-passport
cd zk-passport
```

2. Install dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── PassportFlow.tsx    # Main flow component
│   │   ├── ProofDisplay.tsx    # Proof visualization
│   │   └── TwitterIdForm.tsx   # Twitter ID input
│   ├── contexts/        # React contexts
│   │   ├── ZKPassContext.tsx   # ZKPass SDK integration
│   │   └── WalletContext.tsx   # Wallet connection
│   ├── types/          # TypeScript types
│   │   └── transgate.d.ts      # ZKPass SDK types
│   ├── App.tsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
└── ...
```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SCHEMA_ID=your_schema_id
VITE_APP_ID=your_app_id
VITE_TWITTER_BEARER_TOKEN=your_twitter_token
```

Note: For the mock implementation, these values can be any non-empty string.

## License

MIT
