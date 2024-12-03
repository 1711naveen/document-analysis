'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Page = () => {
  const searchParams = useSearchParams()
  const docId = searchParams.get('doc_id');
  const lang = searchParams.get('lang');
  const [processState, setProcessState] = useState('idle');//Table
  const [processStatus, setProcessStatus] = useState("idle");//English
  const [loading, setLoading] = useState(false);

  //function to handle english spelling check
  const handleProcessClick = async () => {
    if (!lang) return;

    const apiEndpoint =
      lang === "UK"
        ? `/api/process/englishcheckUK?doc_id=${docId}`
        : `/api/process/englishcheckUS?doc_id=${docId}`;

    try {
      setProcessStatus("loading"); // Update state to loading
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        setProcessStatus("success"); // Update state to success
      } else {
        throw new Error("Failed to process");
      }
    } catch (error) {
      console.error("Error:", error);
      setProcessStatus("error"); // Handle errors
    }
  };

  const handleAutomation = async () => {
    setProcessState('loading');
    setLoading(true);
    try {
      const response = await fetch(`/api/process/table?doc_id=${docId}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (response.ok) {
        setProcessState('success');
      } else {
        setProcessState('error');
      }
      setLoading(false);
    } catch {
      setProcessState('error');
      setLoading(false);
    }
  };

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
            <div className="w-10 h-10 rounded-full flex justify-center items-center">
              {processState === 'idle' && (
                <p className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                  1
                </p>
              )}
              {processState === 'loading' && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden ">
                  <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
                </div>
              )}
              {processState === 'success' && (
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              )}
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">
              Table & Figures
            </p>
            <div className='mt-2'>
              <button
                className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleStart}
                disabled={processState === "loading"}
              >
                {processState === "loading" ? "Processing..." : "Start"}
              </button>
            </div>
          </div>

          <div className="w-full h-0.5 bg-gray-300 -mt-24"></div>
          {/* <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center">
              {processState === 'idle' && (
                <p className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                  2
                </p>
              )}
              {processState === 'loading' && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden ">
                  <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
                </div>
              )}
              {processState === 'success' && (
                <FaCheckCircle className="text-green-500 w-6 h-6"/>
              )}
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">
              US/ UK
            </p>
            <div className='mt-2'>
              <button
                className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={processState === "loading"}
              >
                {processState === "loading" ? "Processing..." : "Start"}
              </button>
            </div>
          </div> */}

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center">
              {processStatus === "idle" && (
                <p className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                  2
                </p>
              )}
              {processStatus === "loading" && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden">
                  <img
                    src="/loading.png"
                    alt="spinner"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {processStatus === "success" && (
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              )}
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">
              US/ UK
            </p>
            <div className="mt-2">
              <button
                onClick={handleProcessClick}
                className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={processStatus === "loading"}
              >
                {processStatus === "loading" ? "Processing..." : "Start"}
              </button>
            </div>
          </div>

          <div className="w-full h-0.5 bg-gray-300 -mt-24"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center">
              {processState === 'idle' && (
                <p className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                  3
                </p>
              )}
              {processState === 'loading' && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden ">
                  <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
                </div>
              )}
              {processState === 'success' && (
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              )}
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">
              Process 3
            </p>
            <div className='mt-2'>
              <button
                className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={processState === "loading"}
              >
                {processState === "loading" ? "Processing..." : "Start"}
              </button>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-24"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center">
              {processState === 'idle' && (
                <p className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                  4
                </p>
              )}
              {processState === 'loading' && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden ">
                  <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
                </div>
              )}
              {processState === 'success' && (
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              )}
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">
              Process 4
            </p>
            <div className='mt-2'>
              <button
                className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={processState === "loading"}
              >
                {processState === "loading" ? "Processing..." : "Start"}
              </button>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gray-300 -mt-24"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full flex justify-center items-center">
              {processState === 'idle' && (
                <p className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center overflow-hidden">
                  5
                </p>
              )}
              {processState === 'loading' && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center animate-spin duration-[60s] overflow-hidden ">
                  <img src="/loading.png" alt="spinner" className="w-full h-full object-cover" />
                </div>
              )}
              {processState === 'success' && (
                <FaCheckCircle className="text-green-500 w-6 h-6" />
              )}
            </div>
            <p className="text-sm mt-2 text-center bg-[#03030329] p-2 rounded-lg">
              Process 5
            </p>
            <div className='mt-2'>
              <button
                className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
                disabled={processState === "loading"}
              >
                {processState === "loading" ? "Processing..." : "Start"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          {/* <h3 className="text-2xl font-semibold">File Process....75% Completed</h3> */}
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          {processState !== "success" ? (
            <div>
              <div>
                <button
                  className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md"
                  disabled={processState === "loading"}
                >
                  {processState === "loading" ? "Processing..." : "Start"}
                </button>
              </div>

              {loading && (
                <div className="flex justify-center align-middle space-x-2">
                  <img
                    src="/loading-line.gif"
                    alt="Loading..."
                    className="w-16 h-12"
                  />
                </div>
              )}
            </div>
          ) : (
            <Link
              href={{
                pathname: "/processed",
                query: { doc_id: docId },
              }}
            >
              <button className="text-white px-6 py-2 rounded-md border border-white hover:bg-green-500">
                NEXT
              </button>
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}

export default Page
