"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { useWalletStore } from "@/state/useWalletStore"
import { FaSpinner } from "react-icons/fa"

export default function HomePage() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const { isLocked } = useWalletStore()

  useEffect(() => {
    if (ready) {
      if (authenticated) {
        if (isLocked) {
          router.push("/locked")
        } else {
          router.push("/dashboard")
        }
      } else {
        router.push("/signup")
      }
    }
  }, [ready, authenticated, isLocked, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <FaSpinner className="animate-spin text-4xl text-[#722F37]" />
    </div>
  )
}
