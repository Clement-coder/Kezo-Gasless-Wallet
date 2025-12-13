"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Sidebar from "@/components/SideBar"
import ProfileCard from "@/components/ProfileCard"
import { useWalletStore } from "@/state/useWalletStore"
import { useActivityTracker } from "@/lib/activityTracker"
import { FaLock, FaSignOutAlt } from "react-icons/fa"
import { usePrivy } from "@privy-io/react-auth"
import ConfirmLogoutModal from "@/components/ConfirmLogoutModal"

export default function SettingsPage() {
  const router = useRouter()
  const { isLocked, lock, inactivityTimeout, setInactivityTimeout, autoLock, setAutoLock } = useWalletStore()
  const { authenticated, ready, logout, user } = usePrivy()
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)

  useActivityTracker()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/")
    } else if (isLocked) {
      router.push("/locked")
    }
  }, [isLocked, router, ready, authenticated])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleLock = () => {
    lock()
    router.push("/locked")
  }

  if (!ready || !authenticated || isLocked) {
    return null
  }

  return (
    <>
      <div className="min-h-screen bg-[#F5F5F5] flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Settings</h1>
              <p className="text-[#555555]">Manage your wallet preferences</p>
            </div>

            <ProfileCard user={user} />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Security</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Auto-lock</p>
                    <p className="text-sm text-[#555555]">Lock wallet after inactivity</p>
                  </div>
                  <button
                    onClick={() => setAutoLock(!autoLock)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      autoLock ? "bg-[#722F37]" : "bg-gray-300"
                    }`}
                  >
                    <motion.div
                      animate={{ x: autoLock ? 24 : 0 }}
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                    />
                  </button>
                </div>

                {autoLock && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Inactivity Timeout</label>
                    <select
                      value={inactivityTimeout}
                      onChange={(e) => setInactivityTimeout(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#722F37] focus:outline-none transition-colors"
                    >
                      <option value={60000}>1 minute</option>
                      <option value={300000}>5 minutes</option>
                      <option value={900000}>15 minutes</option>
                    </select>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleLock}
                  className="w-full bg-[#722F37] text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <FaLock />
                  <span>Lock Wallet Now</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Account</h3>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowConfirmLogout(true)}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </main>
      </div>
      {showConfirmLogout && (
        <ConfirmLogoutModal onClose={() => setShowConfirmLogout(false)} onConfirm={handleLogout} />
      )}
    </>
  )
}