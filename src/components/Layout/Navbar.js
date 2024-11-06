'use client'
import React, { useEffect, useState } from 'react'
import { FiBell, FiMenu } from 'react-icons/fi';

import RightSidebar from './RightSidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <nav className="flex justify-between items-center p-4 bg-background text-white">
      <div className="text-xl font-bold">
        Documents Analysis Tool
      </div>

      <div className="flex space-x-4">
        <button className="flex items-center space-x-1">
          <FiBell className="text-2xl" />
          <span>Notifications</span>
        </button>

        <button className="flex items-center space-x-1" onClick={toggleSidebar}>
          <FiMenu className="text-2xl" />
          <span>Menu</span>
        </button>
      </div>

      {isOpen ? (
        <RightSidebar toggleSidebar={toggleSidebar}/>
      ) :
        null
      }

    </nav>
  )
}

export default Navbar
