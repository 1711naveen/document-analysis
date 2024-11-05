'use client'
import React, { useState } from 'react'
import { FiBell, FiMenu } from 'react-icons/fi';
import { FaCog, FaKey, FaChartBar, FaQuestionCircle, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
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
        <button className="flex items-center space-x-1" onClick={toggleSidebar}>
          <FiMenu className="text-2xl" />
          <span>Menu</span>
        </button>
      </div>

      {isOpen ?
        <div className='w-1/4 h-screen backdrop-blur-lg bg-black visible absolute right-0 top-0 px-10'>
          <div onClick={toggleSidebar}>
          <RxCross2 className='text-white' />
          </div>
          <div className="flex items-center mt-10">
            <div className="">
              <CgProfile className='text-6xl' />
            </div>
            <div className="ml-4 text-white">
              <h2 className="text-lg ">XYZ</h2>
              <p className="text-sm text-gray-400">xyz.doe@example.com</p>
            </div>
          </div>


          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <ul className="w-full text-center">
              <li className="flex items-center  space-x-2 py-3 hover:bg-gray-700 rounded-md">
                <FaCog className="text-xl" />
                <span>Settings</span>
              </li>
              <li className="flex items-center  space-x-2 py-3 hover:bg-gray-700 rounded-md">
                <FaKey className="text-xl" />
                <span>Change Password</span>
              </li>
              <li className="flex items-center  space-x-2 py-3 hover:bg-gray-700 rounded-md">
                <FaChartBar className="text-xl" />
                <span>Statistics</span>
              </li>
              <li className="flex items-center  space-x-2 py-3 hover:bg-gray-700 rounded-md">
                <FaQuestionCircle className="text-xl" />
                <span>Help</span>
              </li>
              <li className="flex items-center  space-x-2 py-3 hover:bg-gray-700 rounded-md">
                <FaInfoCircle className="text-xl" />
                <span>About</span>
              </li>
              <li className="flex items-center  space-x-2 py-3 hover:bg-gray-700 rounded-md">
                <FaSignOutAlt className="text-xl" />
                <span>Sign Out</span>
              </li>
            </ul>
          </div>
        </div>
        : ""
      }


    </nav>
  )
}

export default Navbar
