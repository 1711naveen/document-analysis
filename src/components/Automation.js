import React from 'react'

const Automation = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Automation Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Automation</h2>

      {/* Circle and Process Layout */}
      <div className="flex flex-col items-center">
        {/* Circles and Lines */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">1</div>
            <span className="text-sm mt-2">a</span>
          </div>
          <div className="w-full h-1 bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">2</div>
            <span className="text-sm mt-2">b</span>
          </div>
          <div className="w-full h-1 bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">3</div>
            <span className="text-sm mt-2">c</span>
          </div>
          <div className="w-full h-1 bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">4</div>
            <span className="text-sm mt-2">d</span>
          </div>
          <div className="w-full h-1 bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">5</div>
            <span className="text-sm mt-2">e</span>
          </div>
        </div>

        {/* File Process Status */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">File Process</h3>
          <p className="text-gray-700">75% Completed</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Pause</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Stop</button>
        </div>

        <div className="mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Next</button>
        </div>
      </div>
    </div>
  )
}

export default Automation
