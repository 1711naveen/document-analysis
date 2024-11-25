'use client'
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation'

const Page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password. Please try again.");
      }

      setSuccess(true);
      setTimeout(() => {
        console.log('login')
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="rounded-lg shadow-lg p-10 w-4/12 bg-light-background">
        <div className="flex justify-center mb-2">
          <CgProfile className="text-6xl text-light-black" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-2">Forgot Password</h2>


        {success ? (
          <p className="text-green-500">Password reset successfully! Redirecting to login...</p>
        ) : (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-1">Your Email</label>
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
        )}
        <button className="w-full bg-custom-green hover:bg-green-500 text-white text-sm py-2 rounded-xl mt-2" onClick={handleForgotPassword}>
          Send password to email
        </button>
      </div>
    </div>
  )
}

export default Page
