"use client"

import { motion } from "framer-motion"
import { FaUser, FaWallet } from "react-icons/fa"
import { useWalletStore } from "@/state/useWalletStore"
import { getCurrentUser } from "@/lib/mockAuth"

export default function ProfileCard() {
  const { address } = useWalletStore()
  const user = getCurrentUser()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Profile</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#722F37]/10 p-3 rounded-lg">
            <FaUser className="text-[#722F37] text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#555555]">Email</p>
            <p className="font-medium text-[#1A1A1A]">{user?.email || "Not available"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#722F37]/10 p-3 rounded-lg">
            <FaWallet className="text-[#722F37] text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#555555]">Wallet Address</p>
            <p className="font-mono text-sm text-[#1A1A1A] truncate">{address}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
