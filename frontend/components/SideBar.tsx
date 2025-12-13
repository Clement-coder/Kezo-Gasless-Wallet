"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FaWallet, FaChartLine, FaCog } from "react-icons/fa"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: FaWallet },
  { label: "History", path: "/history", icon: FaChartLine },
  { label: "Settings", path: "/settings", icon: FaCog },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-[#722F37] p-2 rounded-lg">
            <FaWallet className="text-white text-xl" />
          </div>
          <span className="text-xl font-bold text-[#1A1A1A]">Kezo</span>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <motion.button
              key={item.path}
              whileHover={{ x: 4 }}
              onClick={() => {
                router.push(item.path)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? "bg-[#722F37] text-white" : "text-[#555555] hover:bg-gray-100"
              }`}
            >
              <Icon className="text-lg" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          )
        })}
      </nav>
    </>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-lg text-[#722F37]"
      >
        {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
      </button>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "-100%" }}
        className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl"
      >
        <SidebarContent />
      </motion.aside>

      <aside className="hidden lg:block w-64 bg-white shadow-lg">
        <SidebarContent />
      </aside>

      {isOpen && <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 z-30" />}
    </>
  )
}
