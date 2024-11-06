'use client'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 ">Automation</h2>

      {/* Circle and Process Layout */}
      <div className="flex flex-col items-center p-8 bg-light-background rounded-lg my-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">1</div>
            <span className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">Reading File</span>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">2</div>
            <span className="text-sm mt-2 text-center">Analyzing Rule</span>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">3</div>
            <span className="text-sm mt-2 text-center">Analyzing Rule</span>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">4</div>
            <span className="text-sm mt-2 text-center">Analyzing Rule</span>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">5</div>
            <span className="text-sm mt-2 text-center">Analyzing Rule</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold">File Process....75% Completed</h3>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-custom-green text-white px-4 py-2 rounded-md ">PAUSE</button>
          <button className="bg-custom-green text-white px-4 py-2 rounded-md ">STOP</button>
        </div>

        <Link href="/processed">
          <div className="mt-6">
            <button className=" text-white px-6 py-2 rounded-md border border-white">NEXT</button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Page
