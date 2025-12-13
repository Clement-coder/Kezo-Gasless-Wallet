"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { FaWallet } from "react-icons/fa"

export default function SignupPage() {
  const router = useRouter()
  const { login, authenticated } = usePrivy()

  const handleSignup = () => {
    if (authenticated) {
      router.push("/dashboard")
    } else {
      login()
      router.push("/signup/password")
    }
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
            <FaWallet className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#1A1A1A]">
          Create Your Wallet
        </h2>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSignup}
          className="w-full bg-[#722F37] text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <span>Sign up with Privy</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
