"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaLock, FaSpinner } from "react-icons/fa"
import { PasswordStrength } from "./strength"
import { storePassword } from "@/lib/mockAuth"

export default function PasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    storePassword(password)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-[#722F37] p-4 rounded-xl">
            <FaLock className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#1A1A1A]">
          Create Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#722F37] focus:outline-none transition-colors"
              required
            />
            <PasswordStrength password={password} />
          </div>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#722F37] text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Creating Wallet...</span>
              </>
            ) : (
              <span>Create Wallet</span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
