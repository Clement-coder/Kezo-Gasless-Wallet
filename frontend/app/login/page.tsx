"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { FaWallet, FaSpinner } from "react-icons/fa"
import { login, signup } from "@/lib/mockAuth"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSignup = searchParams.get("mode") === "signup"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isSignup) {
      signup(email, password)
    } else {
      const success = login(email, password)
      if (!success) {
        alert("Invalid credentials")
        setLoading(false)
        return
      }
    }

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
            <FaWallet className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#1A1A1A]">
          {isSignup ? "Create Your Wallet" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#722F37] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#722F37] focus:outline-none transition-colors"
              required
            />
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
                <span>Processing...</span>
              </>
            ) : (
              <span>{isSignup ? "Create Wallet" : "Login"}</span>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-[#555555] mt-6">
          {isSignup ? "Already have a wallet?" : "Don't have a wallet?"}{" "}
          <button
            onClick={() => router.push(isSignup ? "/login" : "/login?mode=signup")}
            className="text-[#722F37] font-medium hover:underline"
          >
            {isSignup ? "Login" : "Create one"}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
