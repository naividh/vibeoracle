'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
    appName: 'VibeOracle',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo',
    wallets: [
          ...wallets,
      {
              groupName: 'Other',
              wallets: [argentWallet, trustWallet, ledgerWallet],
      },
        ],
    chains: [base, baseSepolia],
    ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
          <WagmiProvider config={config}>
                  <QueryClientProvider client={queryClient}>
                            <RainbowKitProvider
                                        theme={darkTheme({
                                                      accentColor: '#f97316',
                                                      accentColorForeground: 'white',
                                                      borderRadius: 'medium',
                                                      fontStack: 'system',
                                        })}
                                        modalSize="compact"
                                      >
                              {children}
                            </RainbowKitProvider>RainbowKitProvider>
                  </QueryClientProvider>QueryClientProvider>
          </WagmiProvider>WagmiProvider>
        );
}</RainbowKitProvider>
