"use client"

import { motion } from "framer-motion"
import Sidebar from "@/components/SideBar"
import TxHistory from "@/components/TxHistory"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Transaction History</h1>
            <p className="text-[#555555]">View your past transactions</p>
          </div>

          <TxHistory />
        </motion.div>
      </main>
    </div>
  )
}
