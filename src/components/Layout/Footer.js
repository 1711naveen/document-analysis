import React from 'react'
import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center p-4 bg-[#101B36]">
      <span className="text-sm">
        <FaCopyright className="inline mb-1" /> Documents Analysis Tool, Reserved By NISP
      </span>
    </footer>
  )
}

export default Footer
