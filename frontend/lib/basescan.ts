import { useWalletStore } from "@/state/useWalletStore"

const API_KEY = "YOUR_API_KEY" // Replace with your Basescan API key

export const fetchTransactions = async (address: string) => {
  const url = `https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === "1") {
      const transactions = data.result.map((tx: any) => ({
        hash: tx.hash,
        type: tx.from.toLowerCase() === address.toLowerCase() ? "send" : "receive",
        amount: Number(tx.value) / 1e18,
        to: tx.to,
        from: tx.from,
        status: tx.isError === "0" ? "success" : "failed",
        timestamp: Number(tx.timeStamp) * 1000,
      }))
      useWalletStore.getState().setTransactions(transactions)
    } else {
      console.error("Error fetching transactions:", data.message)
    }
  } catch (error) {
    console.error("Error fetching transactions:", error)
  }
}
