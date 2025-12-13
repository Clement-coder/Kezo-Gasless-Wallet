"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { FaLock, FaUnlock } from "react-icons/fa"
import { useWalletStore } from "@/state/useWalletStore"
import { useRouter } from "next/navigation"
import { getStoredPassword } from "@/lib/mockAuth"

export default function LockScreen() {
  const router = useRouter()
  const { unlock } = useWalletStore()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()

    const storedPassword = getStoredPassword()
    if (password === storedPassword) {
      unlock()
      router.push("/dashboard")
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <motion.div
          animate={error ? { rotate: [-5, 5, -5, 5, 0], x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-[#722F37] p-6 rounded-2xl">
            <FaLock className="text-white text-4xl" />
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-center mb-2 text-[#1A1A1A]">Wallet Locked</h2>
        <p className="text-center text-[#555555] mb-6">Enter your password to unlock</p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-4 py-3 rounded-xl border ${
                error ? "border-red-500" : "border-gray-300"
              } focus:border-[#722F37] focus:outline-none transition-colors`}
              autoFocus
            />
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-2">
                Incorrect password
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-[#722F37] text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            <FaUnlock />
            <span>Unlock Wallet</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
