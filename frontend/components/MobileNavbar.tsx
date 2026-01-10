"use client"

import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { FaWallet } from "react-icons/fa"
import Sidebar from "./SideBar"

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-40 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#722F37] p-2 rounded-lg">
            <FaWallet className="text-white text-xl" />
          </div>
          <span className="text-xl font-bold text-[#1A1A1A]">Kezo</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#722F37]">
          {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
