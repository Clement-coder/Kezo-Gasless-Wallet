"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { checkAuth } from "@/lib/mockAuth"
import { useWalletStore } from "@/state/useWalletStore"
import LockScreen from "@/components/LockScreen"

export default function LockedPage() {
  const router = useRouter()
  const { isLocked } = useWalletStore()

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/login")
    } else if (!isLocked) {
      router.push("/dashboard")
    }
  }, [isLocked, router])

  if (!checkAuth()) {
    return null
  }

  return <LockScreen />
}
