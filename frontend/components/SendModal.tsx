"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaTimes, FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa"
import { useWalletStore } from "@/state/useWalletStore"
import { useWallets } from "@privy-io/react-auth"

type TxStatus = "idle" | "pending" | "success" | "failed"

export default function SendModal({ onClose }: { onClose: () => void }) {
  const { balance, addTransaction } = useWalletStore()
  const { wallets } = useWallets()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState<TxStatus>("idle")
  const [txHash, setTxHash] = useState("")

  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy")

  const handleSend = async () => {
    if (!recipient || !amount || Number.parseFloat(amount) <= 0 || !embeddedWallet) return

    setStatus("pending")

    try {
      const tx = await embeddedWallet.sendTransaction({
        to: recipient,
        value: Number.parseFloat(amount),
        data: "0x",
      })
      setStatus("success")
      setTxHash(tx.hash)
      addTransaction({
        hash: tx.hash,
        type: "send",
        amount: Number.parseFloat(amount),
        to: recipient,
        status: "success",
        timestamp: Date.now(),
      })
      setTimeout(() => {
        onClose()
      }, 2500)
    } catch (error) {
      console.error(error)
      setStatus("failed")
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        >
          {status === "idle" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Send ETH</h2>
                <button onClick={onClose} className="text-[#555555] hover:text-[#1A1A1A] transition-colors">
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Recipient Address</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#722F37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Amount (ETH)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#722F37] focus:outline-none transition-colors"
                  />
                  <p className="text-xs text-[#555555] mt-1">Available: {balance.toFixed(4)} ETH</p>
                </div>

                <div className="bg-[#722F37]/10 p-4 rounded-xl">
                  <p className="text-sm text-[#722F37] font-medium flex items-center gap-2">
                    <FaCheckCircle />
                    Gasless transaction - No fees required
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSend}
                  disabled={
                    !recipient || !amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > balance
                  }
                  className="w-full bg-[#722F37] text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Transaction
                </motion.button>
              </div>
            </>
          )}

          {status === "pending" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <FaSpinner className="text-5xl text-[#722F37] animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Processing Transaction</h3>
              <p className="text-[#555555]">Please wait...</p>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Transaction Successful</h3>
              <p className="text-sm text-[#555555] mb-4">Your transaction has been processed</p>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-xs text-[#555555] mb-1">Transaction Hash</p>
                <p className="text-xs font-mono text-[#1A1A1A] break-all">{txHash}</p>
              </div>
            </motion.div>
          )}

          {status === "failed" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Transaction Failed</h3>
              <p className="text-[#555555] mb-4">Insufficient balance or invalid recipient</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStatus("idle")}
                className="bg-[#722F37] text-white px-6 py-2 rounded-xl font-medium"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
