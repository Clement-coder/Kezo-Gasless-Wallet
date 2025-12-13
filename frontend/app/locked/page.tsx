"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/state/useWalletStore"
import LockScreen from "@/components/LockScreen"
import { usePrivy } from "@privy-io/react-auth"

export default function LockedPage() {
  const router = useRouter()
  const { isLocked } = useWalletStore()
  const { authenticated, ready } = usePrivy()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/")
    } else if (!isLocked) {
      router.push("/dashboard")
    }
  }, [isLocked, router, ready, authenticated])

  if (!ready || !authenticated) {
    return null
  }

  return <LockScreen />
}
