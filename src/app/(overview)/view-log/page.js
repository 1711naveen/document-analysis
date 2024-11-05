import React from 'react'

const Page = () => {
  return (
    <div className="p-6 w-full max-w-4xl mx-auto">

      <h2 className="text-3xl text-white font-bold mb-4 ">View Log</h2>

      <div className="overflow-x-auto bg-light-background rounded-xl">
        <div className="flex items-center space-x-4 p-4">
          <label className="text-white" htmlFor="fromDate">From:</label>
          <input
            type="date"
            id="fromDate"
            className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
          />
          <label className="text-white" htmlFor="toDate">To:</label>
          <input
            type="date"
            id="toDate"
            className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
          />
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Filter
          </button> */}
        </div>
        <div className='p-6'>

          <table className="min-w-full border">
            <thead>
              <tr className="w-full">
                <th className="py-2 px-4 border">S.No</th>
                <th className="py-2 px-4 border">File Name</th>
                <th className="py-2 px-4 border">Process Status</th>
                <th className="py-2 px-4 border">Download File</th>
                <th className="py-2 px-4 border">Download</th>
                <th className="py-2 px-4 border">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border text-center">1</td>
                <td className="py-2 px-4 border">SampleFile1.docx</td>
                <td className="py-2 px-4 border text-center">Completed</td>
                <td className="py-2 px-4 border text-center">Completed</td>
                <td className="py-2 px-4 border text-center">
                  <button className="text-blue-500 hover:underline">Download</button>
                </td>

                <td className="py-2 px-4 border text-center">
                  <button className="text-blue-500 hover:underline">Send Email</button>
                </td>
              </tr>
              {/* Additional Rows */}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Page
