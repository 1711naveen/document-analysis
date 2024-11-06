'use client'
import React, { useEffect, useState } from 'react'
import { FiBell, FiMenu } from 'react-icons/fi';
import { FaCog, FaKey, FaChartBar, FaQuestionCircle, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Clean up style on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <nav className="flex justify-between items-center p-4 bg-[#202940] text-white">
      <div className="text-xl font-bold">
        Documents Analysis Tool
      </div>

      <div className="flex space-x-4">
        <button className="flex items-center space-x-1">
          <FiBell className="text-2xl" />
          <span>Notifications</span>
        </button>

        <button className="flex items-center space-x-1" onClick={toggleSidebar}>
          <FiMenu className="text-2xl" />
          <span>Menu</span>
        </button>
      </div>

      {isOpen ? (
        <>
          {/* Blur Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={toggleSidebar}
          ></div>

          <div
            className="absolute right-0 top-0 w-1/4 h-lvh z-100 bg-light-background text-white overflow-y-auto p-10"
          > 
            <div onClick={toggleSidebar} className="text-light-background absolute top-5 left-4 cursor-pointer">
              <RxCross2 className="text-white text-xl" />
            </div>

      
            <div className="flex items-center mt-10">
              <CgProfile className="text-6xl text-light-black" />
              <div className="ml-4 text-white">
                <h2 className="text-lg">XYZ</h2>
                <p className="text-sm text-gray-400">xyz.doe@example.com</p>
              </div>
            </div>

            <div className="border-t border-white mt-6"></div>

            <div className="flex flex-col h-full mt-6">
              <ul className="space-y-4 text-center">
                {[
                  { icon: <FaCog className="text-xl" />, text: "Settings" },
                  { icon: <FaKey className="text-xl" />, text: "Change Password" },
                  { icon: <FaChartBar className="text-xl" />, text: "Statistics" },
                  { icon: <FaQuestionCircle className="text-xl" />, text: "Help" },
                  { icon: <FaInfoCircle className="text-xl" />, text: "About" },
                  { icon: <FaSignOutAlt className="text-xl" />, text: "Sign Out" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 py-3 px-1 hover:bg-gray-700 rounded-md text-light-black "
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}

    </nav>
  )
}

export default Navbar
