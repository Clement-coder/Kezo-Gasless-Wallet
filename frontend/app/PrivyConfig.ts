import type { PrivyClientConfig } from '@privy-io/react-auth';
import { baseSepolia } from 'viem/chains';

export const privyConfig: PrivyClientConfig = {
  defaultChain: baseSepolia,
  supportedChains: [baseSepolia],
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    showWalletUIs: true
  },
  loginMethods: ['google'],
  appearance: { showWalletLoginFirst: true }
};
