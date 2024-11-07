'use client'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { TiTick } from "react-icons/ti";

const Page = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setFiles(droppedFiles);
    console.log(droppedFiles);
    // Handle file upload logic here
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const uploadedFile = e.target.files;
    setFiles(uploadedFile);
    console.log(uploadedFile);
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload File</h1>

      <div className="flex bg-light-background rounded-lg mt-4 py-8">
        <div className="flex-1 p-4 mr-4 border-r">
          <div className="flex flex-col items-center">
            {
            files.length===0
            ?
            <div
              onClick={handleFileUploadClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className='flex items-center justify-center w-64 h-32 border rounded-lg cursor-pointer'>
              <FiUpload className="text-6xl mb-2" />
            </div>
            :
            <div
              onClick={handleFileUploadClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className='flex items-center justify-center w-64 h-32 border rounded-lg cursor-pointer'>
              {files[0].name}
            </div>
            }

            <div className='my-6'>
              <p className='text-center'>Drag or Drop File</p>
              <p className='text-center'>or</p>
            </div>
            <button
              onClick={handleFileUploadClick}
              className="bg-custom-green hover:bg-green-500 text-white py-2 px-4 rounded">
              BROWSE
            </button>
            <input
              type="file"
              accept=".doc,.docx"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </div>

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
              <TiTick className="text-green-500 text-xl" />
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {2}
              </div>
              <div>
                <span className="">Total Pages</span>
                <span className="block text-gray-400 text-xs">12 KB</span>
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {3}
              </div>
              <div>
                <span className="">Total Words</span>
                <span className="block text-gray-400 text-xs">12 KB</span>
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
                {4}
              </div>
              <div>
                <span className="">Total Characters</span>
                <span className="block text-gray-400 text-xs">12 KB</span>
              </div>
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green  text-white rounded-full w-10 h-10 mr-3">
                {5}
              </div>
              <div>
                <span className="">Change Tracker Status</span>
                <span className="block text-gray-400 text-xs">12 KB</span>
              </div>
            </li>
          </ul>
          <Link href="/automation">
            <div className="flex justify-end mt-6 ">
              <button className=" text-white hover:bg-custom-green px-6 py-2 rounded-md border border-white">NEXT</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
