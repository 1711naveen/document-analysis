import React from 'react'
import { FaUpload } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

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
            {/* {Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="flex items-center">
                <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                  {index + 1}
                </div>
                <span className="">Dummy text for item {index + 1}</span>
              </li>
            ))} */}

            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {1}
              </div>
              <span className="">
                Uploaded Doc File.doc
              </span>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {2}
              </div>
              <span className="">
                Total Pages
              </span>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {3}
              </div>
              <span className="">
                Total Words
              </span>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {4}
              </div>
              <span className="">
                Total Characters
              </span>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {5}
              </div>
              <span className="">
                Change Tracker Status
              </span>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page
