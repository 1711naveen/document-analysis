import React from 'react'
import { FaCog, FaKey, FaChartBar, FaQuestionCircle, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { redirect } from 'next/navigation'
import Link from 'next/link';

const RightSidebar = ({ toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.clear();
    redirect('/')
  }
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={toggleSidebar}
      ></div>

      <div
        className="absolute right-0 top-0 w-1/4 h-lvh z-100 bg-light-background text-white overflow-y-auto p-10"
      >
        <div onClick={toggleSidebar} className="text-light-background absolute top-5 left-4 cursor-cursor-pointer">
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
          <ul className="text-center">
            <Link href="/change-password">
              <li className="flex items-center space-x-2 py-3 px-1 hover:bg-gray-700 rounded-md text-light-black cursor-pointer">
                <FaCog className="text-xl" />
                <span>Settings</span>
              </li>
            </Link>
            <Link href="/change-password">
              <li className="flex items-center space-x-2 py-3 px-1 hover:bg-gray-700 rounded-md text-light-black cursor-pointer">
                <FaKey className="text-xl" />
                <span>Change Password</span>
              </li>
            </Link>

            <Link href="/change-password">
              <li className="flex items-center space-x-2 py-3 px-1 hover:bg-gray-700 rounded-md text-light-black cursor-pointer">
                <FaChartBar className="text-xl" />
                <span>Statistics</span>
              </li>
            </Link>
            <Link href="/change-password">
              <li className="flex items-center space-x-2 py-3 px-1 hover:bg-gray-700 rounded-md text-light-black cursor-pointer">
                <FaQuestionCircle className="text-xl" />
                <span>Help</span>
              </li>
            </Link>
            <Link href="/change-password">
              <li className="flex items-center space-x-2 py-3 px-1 hover:bg-gray-700 rounded-md text-light-black cursor-pointer">
                <FaInfoCircle className="text-xl" />
                <span>About</span>
              </li>
            </Link>
            <li
              className="flex items-center space-x-2 py-3 px-1 hover:bg-gray-700 rounded-md text-light-black cursor-pointer"
              onClick={handleLogout}>
              <FaSignOutAlt className="text-xl" />
              <span>Sign Out</span>
            </li>
          </ul>

        </div>
      </div>
    </>
  )
}

export default RightSidebar
