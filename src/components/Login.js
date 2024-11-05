"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="rounded-lg shadow-lg p-10 w-4/12 bg-[#323A4F]">
        {/* Circular Image */}
        <div className="flex justify-center mb-2">
          <Image
            src="/path-to-your-image.png" // Replace with your image path in the public folder
            alt="Logo"
            width={60} // Width of the image
            height={60} // Height of the image
            className="rounded-full"
          />
        </div>

        <h2 className="text-center text-2xl font-bold mb-4">Log in</h2>

        <p className="text-center text-sm mb-4">
          Don&apos;t have an account? <a href="/signup" className="">Sign up</a>
        </p>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-xs">Your email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-white outline-none rounded bg-[#323A4F] text-white placeholder:text-gray-400"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative mb-2">
        <label htmlFor="password" className="block text-xs">Your password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-white outline-none rounded bg-[#323A4F] text-white placeholder:text-gray-400"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 bottom-4 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="text-sm mb-4 cursor-pointer text-right underline">
          Forgot your password?
        </p>

        {/* Login Button */}
        <button className="w-full bg-custom-green text-white text-sm py-2 rounded-xl">
          Log in
        </button>
      </div>
    </div>
  )
}

export default Login
