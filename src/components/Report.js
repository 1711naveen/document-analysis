import React from 'react'

const Report = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-md">
      {/* Report Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Report</h2>

      {/* List Container */}
      <ul className="space-y-4">
        <li className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full text-lg font-bold">1</div>
          <span className="text-gray-700 text-md">Report Item 1</span>
        </li>

        <li className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full text-lg font-bold">2</div>
          <span className="text-gray-700 text-md">Report Item 2</span>
        </li>

        <li className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full text-lg font-bold">3</div>
          <span className="text-gray-700 text-md">Report Item 3</span>
        </li>

        <li className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full text-lg font-bold">4</div>
          <span className="text-gray-700 text-md">Report Item 4</span>
        </li>

        <li className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full text-lg font-bold">5</div>
          <span className="text-gray-700 text-md">Report Item 5</span>
        </li>
      </ul>
    </div>
  )
}

export default Report
