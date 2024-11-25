'use client'
import React, { useEffect, useState } from 'react'
import { FiBell, FiMenu } from 'react-icons/fi';

import RightSidebar from './RightSidebar';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const name = localStorage.getItem('name')
    setName(name);
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
    <nav className="flex justify-between items-center p-4 bg-background text-white border-b-2">
      {/* <div className="text-xl font-bold">
        Documents Analysis Tool
      </div> */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-36 h-12"
          />
        </Link>
      </div>

      <div className="flex space-x-4">
        <button className="flex items-center space-x-1">
          <FiBell className="text-2xl" />
          <span>Notifications</span>
        </button>

        <button className="flex items-center space-x-1" onClick={toggleSidebar}>
          <FiMenu className="text-2xl" />
          <div className="group">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[200%_200%] group-hover:animate-gradient">
              {name}
            </span>
          </div>
        </button>
      </div>

      {isOpen ? (
        <RightSidebar toggleSidebar={toggleSidebar} />
      ) :
        null
      }

    </nav>
  )
}

export default Navbar
