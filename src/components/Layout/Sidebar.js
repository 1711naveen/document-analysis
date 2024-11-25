import React from 'react'
import Link from 'next/link';
import { FiHome, FiUpload, FiFileText } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="w-64 flex flex-col items-center p-4 border-r-4 h-full">

      <div className="flex flex-col space-y-4 w-full">
        <Link href="/dashboard">
          <div className="flex flex-col items-center bg-light-background p-4 rounded-lg shadow-md hover:bg-gray-600 transition hover:animate-pulse">
            <FiHome className="text-3xl mb-2" />
            <span className="text-sm">Dashboard</span>
          </div>
        </Link>

        <Link href="/upload-file">
          <div className="flex flex-col items-center bg-light-background p-4 rounded-lg shadow-md hover:bg-gray-600 transition hover:animate-pulse">
            <FiUpload className="text-3xl mb-2" />
            <span className="text-sm">Upload File</span>
          </div>
        </Link>

        <Link href="/view-log">
          <div className="flex flex-col items-center bg-light-background p-4 rounded-lg shadow-md hover:bg-gray-600 transition hover:animate-pulse">
            <FiFileText className="text-3xl mb-2" />
            <span className="text-sm">View Log</span>
          </div>
        </Link>
        
      </div>
    </div>
  )
}

export default Sidebar