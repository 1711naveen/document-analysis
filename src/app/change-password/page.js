"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation'

const Page = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShow) => !prevShow);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShow) => !prevShow);
  };


  const handleChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    try {
      const email = localStorage.getItem('email')
      const response = await fetch(`${API_BASE_URL}change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword, confirmPassword })
      })
      const data = await response.json();
      console.log(data)
      if (data.success) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.log("some error happened", error)
    }
  }

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
            <div className="flex items-center justify-between">
              <label htmlFor="new-password" className="block text-sm">
                New Password
              </label>
              <span
                className="cursor-pointer text-gray-400"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-white outline-none rounded-lg bg-light-background text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label htmlFor="confirm-password" className="block text-sm">
                Confirm Password
              </label>
              <span
                className="cursor-pointer text-gray-400"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-white outline-none rounded-lg bg-light-background text-white placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
        )}

        <button
          className="w-full bg-custom-green text-white text-sm py-2 rounded-xl"
          onClick={handleChange}>
          Change Password
        </button>
      </div>
    </div>
  )
}

export default Page
