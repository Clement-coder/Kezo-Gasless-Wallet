"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaTimes, FaSpinner } from "react-icons/fa"

interface ConfirmLogoutModalProps {
  onClose: () => void
  onConfirm: () => Promise<void>
}

export default function ConfirmLogoutModal({ onClose, onConfirm }: ConfirmLogoutModalProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    onClose()
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
          {loading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <FaSpinner className="text-5xl text-[#722F37] animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Logging Out</h3>
              <p className="text-[#555555]">Please wait...</p>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Confirm Logout</h2>
                <button onClick={onClose} className="text-[#555555] hover:text-[#1A1A1A] transition-colors">
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <p className="text-[#555555] mb-6">Are you sure you want to log out?</p>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="bg-gray-200 text-[#1A1A1A] py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className="bg-red-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  Logout
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
