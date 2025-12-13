"use client"

import { useEffect } from "react"
import { useWalletStore } from "@/state/useWalletStore"

export function useActivityTracker() {
  const { autoLock, inactivityTimeout, lock } = useWalletStore()

  useEffect(() => {
    if (!autoLock) return

    let timeoutId: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lock()
      }, inactivityTimeout)
    }

    const events = ["mousedown", "keydown", "scroll", "touchstart"]

    events.forEach((event) => {
      document.addEventListener(event, resetTimer)
    })

    resetTimer()

    return () => {
      clearTimeout(timeoutId)
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer)
      })
    }
  }, [autoLock, inactivityTimeout, lock])
}
