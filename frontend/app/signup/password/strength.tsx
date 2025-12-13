"use client"

import type React from "react"
import { motion } from "framer-motion"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = () => {
    if (password.length < 6) {
      return { label: "Weak", color: "bg-red-500", width: "w-1/3" }
    } else if (password.length < 10) {
      return { label: "Medium", color: "bg-yellow-500", width: "w-2/3" }
    } else {
      return { label: "Strong", color: "bg-green-500", width: "w-full" }
    }
  }

  const { label, color, width } = getStrength()

  return (
    <div className="mt-2">
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          className={`h-2 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-sm text-right mt-1 text-[#555555]">{label}</p>
    </div>
  )
}
