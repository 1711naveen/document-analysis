import React from 'react'
import { FaUpload } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { TiTick } from "react-icons/ti";

const Page = () => {
  return (
    <div className="flex flex-col p-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-left">Upload File</h1>

      <div className="flex bg-[#323A4F] rounded-lg mt-4 py-8">
        {/* Left Box */}
        <div className="flex-1 p-4 mr-4 border-r">
          <div className="flex flex-col items-center">
            {/* <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-16 h-16 mb-2">
              <FaUpload className="text-2xl" />
            </div> */}
            <div className='flex items-center justify-center w-64 h-32 border rounded-lg'>
              <FiUpload className="text-6xl mb-2" />
            </div>
            <div className='my-6'>
              <p className='text-center'>Drag or Drop File</p>
              <p className='text-center'>or</p>
            </div>
            <button className="bg-custom-green text-white py-2 px-4 rounded">
              BROWSE
            </button>
          </div>
        </div>

        {/* Right Box */}
        <div className="flex-1 p-4 ">
          <ul className="space-y-4">
        

            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {1}
              </div>
              <div className="flex-1">
                <span className="">Uploaded Doc File.doc</span>
                <span className="block text-gray-400 text-xs">12 KB</span> 
              </div>
              <TiTick className="text-custom-green text-xl" />
            </li>

            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {2}
              </div>
              <div>
                <span className="">Total Pages</span>
                <span className="block text-gray-400 text-xs">12 KB</span> {/* File size in small font */}
              </div>
            </li>

            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {3}
              </div>
              <div>
                <span className="">Total Words</span>
                <span className="block text-gray-400 text-xs">12 KB</span> {/* File size in small font */}
              </div>
            </li>

            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {4}
              </div>
              <div>
                <span className="">Total Characters</span>
                <span className="block text-gray-400 text-xs">12 KB</span> {/* File size in small font */}
              </div>
            </li>

            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {5}
              </div>
              <div>
                <span className="">Change Tracker Status</span>
                <span className="block text-gray-400 text-xs">12 KB</span> {/* File size in small font */}
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page
