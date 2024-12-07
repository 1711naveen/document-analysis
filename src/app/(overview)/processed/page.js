'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import FileTable from '@/components/FileTable'

const Page = () => {
  const searchParams = useSearchParams()
  const docId = searchParams.get('doc_id')


  const handleDownloadFile = async () => {
    try {
      const response = await fetch(`/api/download?final_doc_id=${docId}`);
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
  };

  const handleDownloadLogFile = () => {
    // Handle log file download logic here
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6">File Processed</h2>

      <div className="flex flex-col items-center p-8 bg-light-background rounded-lg my-6">

        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">File Successfully Scanned</h3>
        </div>

        <FileTable folderId={docId} />

        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md "
            onClick={handleDownloadFile}>
            Download All
          </button>
          {/* <button className="bg-custom-green hover:bg-green-500 text-white px-4 py-2 rounded-md ">
            Download Log File
          </button> */}
        </div>

      </div>
    </div>
  )
}

export default Page
