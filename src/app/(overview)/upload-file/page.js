'use client'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const Page = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState({});
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [docId, setDocId] = useState();
  const [language, setLanguage] = useState('');
  const [step, setStep] = useState(1);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleNextClick = () => {
    if (!language) {
      setError('Please select a language to proceed.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileType = droppedFile.name.split('.').pop().toLowerCase();
      if (fileType === 'doc' || fileType === 'docx') {
        setError('');
        setFiles(droppedFile);
      } else {
        setError('Only .doc or docx files are accepted.');
        setFiles([]);
        setTimeout(() => {
          setError('');
        }, 5000);
        return;
      }
    }

    const formData = new FormData();
    formData.append('file', droppedFile);
    formData.append('name', droppedFile.name);
    formData.append('type', droppedFile.type);
    formData.append('size', droppedFile.size);
    formData.append('file', droppedFile);

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      })
      const data = await response.json();
      setDocId(data.doc_id)
      setFileData(data);
    }
    catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'doc' || fileType === 'docx') {
        setError('');
        setFiles(file);
      } else {
        setError('Only .doc or docx files are accepted.');
        setFiles([]);
        setTimeout(() => {
          setError('');
        }, 5000);
        return;
      }
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('type', file.type);
    formData.append('size', file.size);

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setDocId(data.doc_id)
      setFileData(data);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload File</h1>
      <div className="flex bg-light-background rounded-lg mt-4 py-8">
        {/* <div className="flex-1 p-4 mr-4 border-r">
          {error && <p className='text-white text-center pb-4'>{error}</p>}
          <div className="flex flex-col items-center">
            {
              files.length === 0
                ?
                <div
                  onClick={handleFileUploadClick}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className='flex items-center justify-center w-72 h-48 border rounded-lg cursor-pointer'>
                  <FiUpload className="text-6xl mb-2" />
                </div>
                :
                <div
                  onClick={handleFileUploadClick}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className='flex flex-col items-center justify-center w-72 h-48 border rounded-lg cursor-pointer'
                >
                  <p className='text-lg font-semibold text-center'>
                    {files.name}
                  </p>
                  <p className='text-sm text-gray-500 text-center'>
                    {parseFloat(files.size / 1024).toFixed(2)} KB
                  </p>
                </div>
            }

            <div className='my-6'>
              <p className='text-center'>Drag and Drop File</p>
              <p className='text-center'>or</p>
            </div>
            <button
              onClick={handleFileUploadClick}
              className="bg-custom-green hover:bg-green-500 text-white py-2 px-4 rounded">
              BROWSE
            </button>
            <input
              type="file"
              accept=".doc,.docx"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </div> */}

        {/* <div className="flex-1 p-4 mr-4 border-r">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-center" htmlFor="language">
              Select Document Language:
            </label>
            <select
              id="language"
              className="w-full p-2 border rounded outline-none bg-light-background"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="">-- Select Language --</option>
              <option value="en">English-US</option>
              <option value="es">English-UK</option>
            </select>
          </div>

          {language && (
            <div className="flex-1 p-4 mr-4 border-r">
              {error && <p className="text-white text-center pb-4">{error}</p>}
              <div className="flex flex-col items-center">
                {files.length === 0 ? (
                  <div
                    onClick={handleFileUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex items-center justify-center w-72 h-48 border rounded-lg cursor-pointer"
                  >
                    <FiUpload className="text-6xl mb-2" />
                  </div>
                ) : (
                  <div
                    onClick={handleFileUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex flex-col items-center justify-center w-72 h-48 border rounded-lg cursor-pointer"
                  >
                    <p className="text-lg font-semibold text-center">
                      {files.name}
                    </p>
                    <p className="text-sm text-gray-500 text-center">
                      {parseFloat(files.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}

                <div className="my-6">
                  <p className="text-center">Drag and Drop File</p>
                  <p className="text-center">or</p>
                </div>
                <button
                  onClick={handleFileUploadClick}
                  className="bg-custom-green hover:bg-green-500 text-white py-2 px-4 rounded"
                >
                  BROWSE
                </button>
                <input
                  type="file"
                  accept=".doc,.docx"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
        </div> */}
        <div className="flex-1 p-4 mr-4 border-r">
          {step === 1 && (
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2 text-center"
                htmlFor="language"
              >
                Select Document Language:
              </label>
              <select
                id="language"
                className="w-full p-2 border rounded outline-none bg-light-background"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="">-- Select Language --</option>
                <option value="en">English-US</option>
                <option value="es">English-UK</option>
              </select>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
              <button
                onClick={handleNextClick}
                className="mt-4 bg-custom-green hover:bg-green-500 text-white py-2 px-4 rounded w-full"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 p-4 mr-4">
              {error && <p className="text-white text-center pb-4">{error}</p>}
              <div className="flex flex-col items-center">
                {files.length === 0 ? (
                  <div
                    onClick={handleFileUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex items-center justify-center w-80 h-52 border rounded-lg cursor-pointer"
                  >
                    <FiUpload className="text-6xl mb-2" />
                  </div>
                ) : (
                  <div
                    onClick={handleFileUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex flex-col items-center justify-center w-80 h-52 border rounded-lg cursor-pointer"
                  >
                    <p className="text-lg font-semibold text-center">
                      {files.name}
                    </p>
                    <p className="text-sm text-gray-500 text-center">
                      {parseFloat(files.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}

                <div className="my-6">
                  <p className="text-center">Drag and Drop File</p>
                  <p className="text-center">or</p>
                </div>
                <button
                  onClick={handleFileUploadClick}
                  className="bg-custom-green hover:bg-green-500 text-white py-2 px-4 rounded"
                >
                  BROWSE
                </button>
                <input
                  type="file"
                  accept=".doc,.docx"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 ">
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-sm text-white rounded-full w-10 h-10 mr-3">
                DOC
              </div>
              <div className="flex-1">
                <span className="">Uploaded {files.name}</span>
                <span className="block text-gray-400 text-xs">{parseFloat(files.size / 1024).toFixed(2)} KB</span>
              </div>
              <TiTick className="text-green-500 text-xl" />
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-sm text-white rounded-full w-10 h-10 mr-3">
                {fileData.pages || '---'}
              </div>
              <div className="flex-1">
                <span className="">Total Pages</span>
                <span className="block text-gray-400 text-xs">{fileData.pages || '---'}</span>
              </div>
              {fileData.pages ? <TiTick className="text-green-500 text-xl" /> : <RxCross2 className='text-red-500 font-bold' />}
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-sm text-white rounded-full w-10 h-10 mr-3">
                {fileData.words || '---'}
              </div>
              <div className="flex-1">
                <span className="">Total Words</span>
                <span className="block text-gray-400 text-xs">{fileData.words || '---'}</span>
              </div>
              {fileData.words ? <TiTick className="text-green-500 text-xl" /> : <RxCross2 className='text-red-500 font-bold' />}
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-sm text-white rounded-full w-10 h-10 mr-3">
                {Math.floor(fileData.characters / 1000) ? `${Math.floor(fileData.characters / 1000)}K` : '---'}
              </div>
              <div className="flex-1">
                <span className="">Total Characters</span>
                <span className="block text-gray-400 text-xs">{fileData.characters || '---'}</span>
              </div>
              {fileData.characters ? <TiTick className="text-green-500 text-xl" /> : <RxCross2 className='text-red-500 font-bold' />}
            </li>
            <li className="flex items-center">
              <div className="flex items-center justify-center bg-custom-green text-sm text-white rounded-full w-10 h-10 mr-3">
                off
              </div>
              <div className="flex-1">
                <span className="">Change Tracker Status</span>
                <span className="block text-gray-400 text-xs">off</span>
              </div>
              {/* <TiTick className="text-green-500 text-xl" />
              {fileData.characters?<TiTick className="text-green-500 text-xl" />:<RxCross2 className='text-red-500 font-bold'/>} */}
              <RxCross2 className='text-red-500 font-bold' />
            </li>
          </ul>
          <Link href={{ pathname: "/automation", query: { doc_id: docId } }} >
            <div className="flex justify-end mt-6 ">
              <>
                {Object.keys(fileData).length === 0 ? (
                  <>
                    <button
                      data-tooltip-target="Upload File"
                      className="text-white hover:bg-custom-green px-6 py-2 rounded-md border border-white cursor-not-allowed"
                      disabled
                    >
                      NEXT
                    </button>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
                      Button is disabled
                    </div>
                  </>
                ) : (
                  <button className="text-white hover:bg-custom-green px-6 py-2 rounded-md border border-white">
                    NEXT
                  </button>
                )}
              </>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
