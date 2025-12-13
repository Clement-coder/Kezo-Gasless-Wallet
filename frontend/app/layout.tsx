import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Providers from "./Provider"
const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kezo - Starknet Gasless Wallet",
  description: "Web2-style gasless wallet for Starknet",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
