"use client"

import { motion } from "framer-motion"
import { FaPaperPlane, FaDownload, FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa"
import { useWalletStore } from "@/state/useWalletStore"

export default function TxHistory() {
  const { transactions } = useWalletStore()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <FaCheckCircle className="text-green-500" />
      case "pending":
        return <FaSpinner className="text-yellow-500 animate-spin" />
      case "failed":
        return <FaTimesCircle className="text-red-500" />
      default:
        return null
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-md"
    >
      <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-[#555555] py-8">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.hash}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className={`p-3 rounded-lg ${tx.type === "send" ? "bg-[#722F37]/10" : "bg-green-100"}`}>
                {tx.type === "send" ? (
                  <FaPaperPlane className="text-[#722F37]" />
                ) : (
                  <FaDownload className="text-green-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[#1A1A1A] capitalize">{tx.type}</p>
                  {getStatusIcon(tx.status)}
                </div>
                <p className="text-sm text-[#555555] truncate">
                  {tx.type === "send" ? `To: ${tx.to}` : `From: ${tx.from}`}
                </p>
                <p className="text-xs text-[#555555] mt-1">{formatTimestamp(tx.timestamp)}</p>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${tx.type === "send" ? "text-red-600" : "text-green-600"}`}>
                  {tx.type === "send" ? "-" : "+"}
                  {tx.amount.toFixed(4)} ETH
                </p>
                <p className="text-xs text-[#555555] mt-1 font-mono truncate max-w-[100px]">
                  {tx.hash.slice(0, 10)}...
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
