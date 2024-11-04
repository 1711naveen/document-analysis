import React from 'react'
import Link from 'next/link';
import { FiHome, FiUpload, FiFileText } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen flex flex-col items-center p-4 border-r-4 border-red">

      {/* Sidebar Items */}
      <div className="flex flex-col space-y-4 w-full">
        {/* Dashboard Card */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition">
          <FiHome className="text-3xl mb-2" />
          <span className="text-sm">Dashboard</span>
        </div>

        {/* Upload File Card */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition">
          <FiUpload className="text-3xl mb-2" />
          <span className="text-sm">Upload File</span>
        </div>

        {/* View Log Card */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition">
          <FiFileText className="text-3xl mb-2" />
          <span className="text-sm">View Log</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
