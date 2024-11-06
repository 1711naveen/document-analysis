'use client'
import React from 'react'

const Page = () => {
  const handleDownloadFile = () => {
    // Handle file download logic here
  };

  const handleDownloadLogFile = () => {
    // Handle log file download logic here
  };
  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 ">File Processed</h2>

      {/* Circle and Process Layout */}
      <div className="flex flex-col items-center p-8 bg-light-background rounded-lg my-6">

        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold">File Successfully Scanned</h3>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-custom-green text-white px-4 py-2 rounded-md ">Download File</button>
          <button className="bg-custom-green text-white px-4 py-2 rounded-md ">Download Log File</button>
        </div>

      </div>
    </div>
  )
}

export default Page
