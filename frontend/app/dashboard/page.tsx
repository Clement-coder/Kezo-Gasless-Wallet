"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Sidebar from "@/components/SideBar"
import WalletCard from "@/components/WalletCard"
import TxHistory from "@/components/TxHistory"
import { useWalletStore } from "@/state/useWalletStore"
import { useActivityTracker } from "@/lib/activityTracker"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import ProfileCard from "@/components/ProfileCard"
import { fetchTransactions } from "@/lib/basescan"

export default function DashboardPage() {
  const router = useRouter()
  const { isLocked, setAddress, setBalance } = useWalletStore()
  const { authenticated, ready, user } = usePrivy()
  const { wallets } = useWallets()

  useActivityTracker()

  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy")

  console.log("Privy wallets:", wallets)
  console.log("Embedded wallet:", embeddedWallet)
  if (embeddedWallet) {
    console.log("Embedded wallet address:", embeddedWallet.address)
  }

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/")
    } else if (isLocked) {
      router.push("/locked")
    }

    if (embeddedWallet) {
      setAddress(embeddedWallet.address)
      embeddedWallet.getErc20Balance("84532").then((balance) => {
        setBalance(Number(balance.value))
      })
    }
  }, [isLocked, router, ready, authenticated, embeddedWallet, setAddress, setBalance, wallets])

  useEffect(() => {
    if (embeddedWallet) {
      fetchTransactions(embeddedWallet.address)
    }
  }, [embeddedWallet])

  if (!ready || !authenticated || isLocked) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8">
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
