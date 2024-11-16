import Link from 'next/link';
import React from 'react'
import { MdUploadFile, MdHistory } from 'react-icons/md';

const Card = ({ icon, text }) => (
  <div className="flex flex-col items-center justify-center bg-light-background rounded-lg shadow-md hover:bg-gray-600 transition p-4 w-full max-w-xs mx-auto">
    <div className="mb-2">{icon}</div>
    <span className="text-lg font-semibold text-center">{text}</span>
  </div>
);

const Page = () => {
  return (
      <div className="px-2 py-6 rounded-lg w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-left text-white">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/upload-file">
            <Card icon={<MdUploadFile className='text-6xl' />} text="Upload File" />
          </Link>
          <Link href="/view-log">
            <Card icon={<MdHistory className='text-6xl' />} text="View Log" />
          </Link>
        </div>
      </div>
  )
}

export default Page
