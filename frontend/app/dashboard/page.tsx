"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import WalletCard from "@/components/WalletCard"
import TxHistory from "@/components/TxHistory"
import { useWalletStore } from "@/state/useWalletStore"
import { useActivityTracker } from "@/lib/activityTracker"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import ProfileCard from "@/components/ProfileCard"
import { fetchTransactions } from "@/lib/basescan"
import MobileNavbar from "@/components/MobileNavbar"

export default function DashboardPage() {
  const router = useRouter()
  const { isLocked, setAddress, setBalance } = useWalletStore()
  const { authenticated, ready: privyReady, user } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()

  useActivityTracker()

  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy")

  useEffect(() => {
    if (privyReady && !authenticated) {
      router.push("/")
    } else if (isLocked) {
      router.push("/locked")
    }

    if (walletsReady && embeddedWallet) {
      setAddress(embeddedWallet.address)
      embeddedWallet.getErc20Balance("84532").then((balance) => {
        setBalance(Number(balance.value))
      })
    }
  }, [isLocked, router, privyReady, authenticated, walletsReady, embeddedWallet, setAddress, setBalance])

  useEffect(() => {
    if (walletsReady && embeddedWallet) {
      fetchTransactions(embeddedWallet.address)
    }
  }, [walletsReady, embeddedWallet])

  if (!privyReady || !authenticated || isLocked) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      <MobileNavbar />

      <main className="flex-1 p-6 lg:p-8 pt-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Dashboard</h1>
            <p className="text-[#555555]">Manage your gasless wallet</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WalletCard />
            </div>
            <div>
              <ProfileCard user={user} />
            </div>
          </div>

          <TxHistory />
        </motion.div>
      </main>
    </div>
  )
}
