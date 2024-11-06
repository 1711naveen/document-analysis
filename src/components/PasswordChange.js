"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { CgProfile } from "react-icons/cg";

const PasswordChange = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="rounded-lg shadow-lg p-10 w-4/12 bg-light-background">
        <div className="flex justify-center mb-2">
          {/* <Image
            src="/path-to-your-image.png"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full"
          /> */}
          <CgProfile className="text-6xl text-light-black" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-2">Change Your Password</h2>

        <p className="text-center text-xs mb-4">
          Enter a new password below to change your password
        </p>

        <div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-sm">New Password</label>
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-white outline-none rounded-lg bg-light-background text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="confirm-password" className="block text-sm">Confirm Password</label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-white outline-none rounded-lg bg-light-background text-white placeholder:text-gray-400"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button className="w-full bg-custom-green text-white text-sm py-2 rounded-xl" >
          Change Password
        </button>
      </div>
    </div>
  )
}

export default PasswordChange
