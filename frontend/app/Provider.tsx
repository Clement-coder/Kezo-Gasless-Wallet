"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PrivyProvider } from "@privy-io/react-auth"
import { WagmiProvider } from "@privy-io/wagmi"
import { privyConfig } from "./PrivyConfig"
import { wagmiConfig } from "./wagmiConfig"
import { useRouter } from "next/navigation"

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <PrivyProvider
      appId="cmj45f7n101ncjv0cp273t54a"
      config={{
        ...privyConfig,
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}

