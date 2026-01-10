"use client"

import { motion } from "framer-motion"
import {
  FaPaperPlane,
  FaDownload,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaExternalLinkAlt,
} from "react-icons/fa"
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

  const getTxDescription = (tx: any) => {
    if (tx.type === "send") {
      return (
        <p className="text-sm text-gray-500">
          You sent {tx.amount.toFixed(4)} ETH to{" "}
          <span className="font-semibold text-gray-700">{tx.to.slice(0, 10)}...</span>
        </p>
      )
    }
    return (
      <p className="text-sm text-gray-500">
        You received {tx.amount.toFixed(4)} ETH from{" "}
        <span className="font-semibold text-gray-700">{tx.from.slice(0, 10)}...</span>
      </p>
    )
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
        <div className="flex flex-col items-center justify-center py-8 text-[#555555]">
          <FaPaperPlane className="text-4xl mb-3 text-[#722F37]/60" />
          <p className="text-lg font-medium mb-1">No transactions yet</p>
          <p className="text-sm text-center">
            Your recent transactions will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.hash}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="mt-1">
                {tx.type === "send" ? (
                  <FaPaperPlane className="text-[#722F37]" />
                ) : (
                  <FaDownload className="text-green-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#1A1A1A]">{getTxDescription(tx)}</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(tx.status)}
                    <p
                      className={`font-semibold ${
                        tx.type === "send" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {tx.type === "send" ? "-" : "+"}
                      {tx.amount.toFixed(4)} ETH
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">{formatTimestamp(tx.timestamp)}</p>
                  <a
                    href={`https://sepolia.basescan.org/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                  >
                    View on Block Explorer <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
