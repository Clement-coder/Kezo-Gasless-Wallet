import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Transaction {
  hash: string
  type: "send" | "receive"
  amount: number
  to?: string
  from?: string
  status: "pending" | "success" | "failed"
  timestamp: number
}

interface WalletState {
  address: string | null
  balance: number
  isLocked: boolean
  autoLock: boolean
  inactivityTimeout: number
  transactions: Transaction[]
  setAddress: (address: string) => void
  setBalance: (balance: number) => void
  lock: () => void
  unlock: () => void
  setAutoLock: (enabled: boolean) => void
  setInactivityTimeout: (timeout: number) => void
  addTransaction: (tx: Transaction) => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      balance: 0,
      isLocked: false,
      autoLock: true,
      inactivityTimeout: 300000,
      transactions: [],
      setAddress: (address) => set({ address }),
      setBalance: (balance) => set({ balance }),
      lock: () => set({ isLocked: true }),
      unlock: () => set({ isLocked: false }),
      setAutoLock: (enabled) => set({ autoLock: enabled }),
        setInactivityTimeout: (timeout) => set({ inactivityTimeout: timeout }),
          addTransaction: (tx) =>
            set((state) => ({
              transactions: [tx, ...state.transactions].slice(0, 10),
            })),        setTransactions: (transactions) => set({ transactions }),
      
    }),
    {
      name: "kezo_wallet_state",
      partialize: (state) => ({
        address: state.address,
        balance: state.balance,
        isLocked: state.isLocked,
        autoLock: state.autoLock,
        inactivityTimeout: state.inactivityTimeout,
        transactions: state.transactions,
      }),
    },
  ),
)
