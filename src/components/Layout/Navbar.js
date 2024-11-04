import React from 'react'
import { FiBell, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#202940] text-white">
      {/* Left side: Title */}
      <div className="text-xl font-bold">
        Documents Analysis Tool
      </div>

      {/* Right side: Notification and Menu */}
      <div className="flex space-x-4">
        {/* Notification Icon */}
        <button className="flex items-center space-x-1">
          <FiBell className="text-2xl" />
          <span>Notifications</span>
        </button>

        {/* Menu Icon */}
        <button className="flex items-center space-x-1">
          <FiMenu className="text-2xl" />
          <span>Menu</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
