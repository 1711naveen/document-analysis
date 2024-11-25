'use client'; // Client Component

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const SidebarToggle = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`bg-background text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'
          }`}
      >
        {isOpen && children}
      </div>

      {/* <div className='absolute inset-0' onClick={() => setIsOpen(!isOpen)}></div>

      {

      } */}

      <button
        className="p-2 bg-gray-800 text-white fixed top-24 left-4 z-50 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
    </div>
  );
};

export default SidebarToggle;
