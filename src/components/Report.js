import React from 'react'
import { TiTick } from "react-icons/ti";

const Report = () => {
  return (
    <div className="flex flex-col p-10">
      <h1 className="text-3xl font-bold mb-4 text-left">Upload File</h1>

      <div className="flex-1 p-4 bg-light-background rounded-lg">
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
            <div className="flex items-center justify-center bg-custom-green text-white rounded-full w-10 h-10 mr-3">
              {5}
            </div>
            <div>
              <span className="">Change Tracker Status</span>
              <span className="block text-gray-400 text-xs">12 KB</span>
            </div>
          </li>

        </ul>
      </div>
    </div>

  )
}

export default Report
