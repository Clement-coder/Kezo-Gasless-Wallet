export function generateWalletAddress(): string {
  const chars = "0123456789abcdef"
  let address = "0x"
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)]
  }
  return address
}

export function generateTxHash(): string {
  const chars = "0123456789abcdef"
  let hash = "0x"
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}

export async function sendTransaction(
  to: string,
  amount: number,
  currentBalance: number,
): Promise<{ success: boolean; txHash: string }> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (amount > currentBalance || amount <= 0 || !to.startsWith("0x")) {
    return { success: false, txHash: "" }
  }

  return {
    success: true,
    txHash: generateTxHash(),
  }
}
