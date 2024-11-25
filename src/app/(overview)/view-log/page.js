'use client'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [fileName, setFileName] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState(fileName);

  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await fetch('/api/raw-document-name');
        if (!response.ok) {
          throw new Error('Failed to fetch filenames');
        }
        const data = await response.json();
        console.log(data)
        setFileName(data.name);
        setFilteredData(data.name);
      } catch (error) {
        console.error('Error fetching filenames:', error);
      }
    };

    fetchFileNames();
  }, []);

  const handleFilter = () => {
    const filtered = fileName.filter((file) => {
      console.log(file.creation_date);
      const creationDate = new Date(file.creation_date);
      console.log(creationDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      return (
        (!from || creationDate >= from) &&
        (!to || creationDate <= to)
      );
    });
    setFilteredData(filtered);
  };

  const handleDownload = async (finalDocId) => {
    try {
      const response = await fetch(`/api/download?final_doc_id=${finalDocId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Documents.zip';
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('ZIP file not found');
      }
    } catch (error) {
      console.error('Error downloading ZIP file:', error);
      alert('An error occurred while downloading the file');
    }
  }



  return (
    <div className="p-6 w-full max-w-4xl mx-auto">

      <h2 className="text-3xl text-white font-bold mb-4 ">View Log</h2>

      <div className="overflow-x-auto bg-light-background rounded-xl">
        <div className="flex items-center space-x-4 p-4">
          <label className="text-white" htmlFor="fromDate">From:</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
          />
          <label className="text-white" htmlFor="toDate">To:</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div className='p-6'>

          <table className="min-w-full border">
            <thead>
              <tr className="w-full">
                <th className="py-2 px-4 border">S.No</th>
                <th className="py-2 px-4 border">Document Id</th>
                <th className="py-2 px-4 border">File Name</th>
                <th className="py-2 px-4 border">Process Status</th>
                {/* <th className="py-2 px-4 border">Download File</th> */}
                <th className="py-2 px-4 border">Download</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((name, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">{name.row_doc_id}</td>
                  <td className="py-2 px-4 border">{name.row_doc_name} </td>
                  <td className="py-2 px-4 border text-center">Completed</td>
                  {/* <td className="py-2 px-4 border text-center">Completed</td> */}
                  <td className="py-2 px-4 border text-center">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleDownload(name.row_doc_id)}
                    >
                      Download
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button className="text-blue-500 hover:underline">Send Email</button>
                  </td>
                  <td className="py-2 px-4 border text-center">{name.creation_date.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Page
