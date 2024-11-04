"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="rounded-lg shadow-lg p-6 w-80 bg-blue-950">
        {/* Circular Image */}
        <div className="flex justify-center mb-4">
          <Image
            src="/path-to-your-image.png" // Replace with your image path in the public folder
            alt="Logo"
            width={100} // Width of the image
            height={100} // Height of the image
            className="rounded-full"
          />
        </div>

        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

        <p className="text-center text-sm mb-4">
          Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {/* Password Field */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="text-sm text-blue-500 mb-4 cursor-pointer">
          Forgot password?
        </p>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </div>
    </div>
  )
}

export default Page
