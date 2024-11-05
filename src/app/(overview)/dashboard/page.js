import React from 'react'
import { MdUploadFile, MdHistory } from 'react-icons/md';

const Card = ({ icon, text }) => (
  <div className="flex flex-col items-center justify-center bg-[#323A4F] rounded-lg shadow-md p-4 w-full max-w-xs mx-auto">
    <div className="mb-2">{icon}</div>
    <span className="text-lg font-semibold text-center">{text}</span>
  </div>
);

const Page = () => {
  return (
    <div className="p-6 rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-left text-white">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card icon={<MdUploadFile className='text-6xl' />} text="Upload File" />
        <Card icon={<MdHistory className='text-6xl' />} text="View Log" />
        {/* <Card icon={<MdSettings />} text="Settings" />
      <Card icon={<MdInfo />} text="About" /> */}
      </div>
    </div>
  )
}

export default Page
