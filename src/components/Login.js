"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { CgProfile } from "react-icons/cg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('temp@gmail.com');
  const [password, setPassword] = useState('12345');
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    console.log(email)
    console.log(password);
    router.push('/dashboard')
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

        <h2 className="text-center text-2xl font-bold mb-2">Log in</h2>

        <p className="text-center text-xs mb-4">
          Don&apos;t have an account? <a href="/signup" className="underline">Sign up</a>
        </p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">Your email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-white outline-none rounded-lg bg-light-background text-white placeholder:text-gray-400"
            required
          />
        </div>

        <div className="relative mb-2">
          <label htmlFor="password" className="block text-sm mb-1">Your password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-white outline-none rounded-lg bg-light-background text-white placeholder:text-gray-400"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute top-1 right-1 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="text-sm mb-4 cursor-pointer text-right underline">
          Forgot your password?
        </p>

        <button className="w-full bg-custom-green hover:bg-green-500 text-white text-sm py-2 rounded-xl" onClick={handleLogin}>
          Log in
        </button>
      </div>
    </div>
  )
}

export default Login
