'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const searchParams = useSearchParams()
  const docId = searchParams.get('doc_id')
  // const {id} = router.query

  const handleAutomation = async () => {
    const response = await fetch(`/api/process?doc_id=${docId}`);
    console.log(response)
  }

  const handleStart = () => {
    handleAutomation();
    console.log(docId)
  }

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 ">Automation</h2>
      <div className="flex flex-col items-center p-8 bg-light-background rounded-lg my-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden">
              <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">Process 1</p>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden ">
              <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">Process 1</p>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden">
              <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">Process 1</p>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden">
              <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">Process 1</p>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-14"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden">
              <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">Process 1</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold">File Process....75% Completed</h3>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleStart}
          >Start</button>
          {/* <button className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md ">STOP</button> */}
        </div>

        <Link href="/processed">
          <div className="mt-6">
            <button className=" text-white px-6 py-2 rounded-md border border-white hover:bg-green-500">NEXT</button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Page
