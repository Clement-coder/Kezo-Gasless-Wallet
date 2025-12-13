"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Sidebar from "@/components/SideBar"
import WalletCard from "@/components/WalletCard"
import TxHistory from "@/components/TxHistory"
import { useWalletStore } from "@/state/useWalletStore"
import { checkAuth } from "@/lib/mockAuth"
import { useActivityTracker } from "@/lib/activityTracker"

export default function DashboardPage() {
  const router = useRouter()
  const { isLocked, address } = useWalletStore()

  useActivityTracker()

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/login")
    } else if (isLocked) {
      router.push("/locked")
    }
  }, [isLocked, router])

  if (!checkAuth() || isLocked) {
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

          <WalletCard />

          <TxHistory />
        </motion.div>
      </main>
    </div>
  )
}
