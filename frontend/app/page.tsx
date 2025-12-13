"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { FaWallet } from "react-icons/fa"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 px-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="bg-[#722F37] p-6 rounded-2xl shadow-lg">
            <FaWallet className="text-white text-5xl" />
          </div>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-[#1A1A1A] mb-3"
          >
            Kezo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#555555]"
          >
            Your gasless wallet for Starknet
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/login?mode=signup")}
            className="bg-[#722F37] text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow"
          >
            Create Wallet
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/login")}
            className="bg-white text-[#722F37] px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow border border-[#722F37]"
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
