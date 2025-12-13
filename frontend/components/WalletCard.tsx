"use client"

import { motion } from "framer-motion"
import { FaPaperPlane, FaDownload, FaCheckCircle } from "react-icons/fa"
import { useWalletStore } from "@/state/useWalletStore"
import { useState } from "react"
import SendModal from "./SendModal"

export default function WalletCard() {
  const { address, balance } = useWalletStore()
  const [showSendModal, setShowSendModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#722F37] to-[#8d3a45] rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold">{balance.toFixed(4)} ETH</h2>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-lg">
            <p className="text-xs font-medium flex items-center gap-1">
              <FaCheckCircle className="text-green-300" />
              Gasless
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-white/80 text-xs mb-2">Wallet Address</p>
          <button
            onClick={copyAddress}
            className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors w-full text-left"
          >
            <p className="text-sm font-mono truncate">{copied ? "Copied!" : address}</p>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowSendModal(true)}
            className="bg-white text-[#722F37] py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            <span>Send</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 backdrop-blur text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <FaDownload />
            <span>Receive</span>
          </motion.button>
        </div>
      </motion.div>

      {showSendModal && <SendModal onClose={() => setShowSendModal(false)} />}
    </>
  )
}
