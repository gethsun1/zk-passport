import React from 'react';
import { WalletProvider } from './contexts/WalletContext';
import { ZKPassProvider } from './contexts/ZKPassContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import PassportFlow from './components/PassportFlow';

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <ZKPassProvider>
          <Layout>
            <PassportFlow />
          </Layout>
        </ZKPassProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;