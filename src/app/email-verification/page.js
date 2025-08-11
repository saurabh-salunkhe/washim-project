'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { sendVerificationEmail } from '@/lib/api'; 
import React from 'react';

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setMessage('No user session found. Please start over from signup.');
      setIsError(true);
      setTimeout(() => router.push('/signup'), 2000);
    }
  }, [router]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage('');
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setMessage('User session expired. Please sign up again.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setMessage('Email is required.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage('Please enter a valid email address.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await sendVerificationEmail(userId, email.trim());

      if (response.data.success) {
        setMessage('Verification email sent. Please check your inbox and click the link.');
        setIsError(false);
      } else {
        setMessage(response.data.message || 'Failed to send verification email.');
        setIsError(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  return (
  <div
    className="flex items-center justify-center min-h-screen"
    style={{
      backgroundImage: `
        radial-gradient(circle at top right, #A5E3FF 0%, transparent 40%),
        radial-gradient(circle at bottom left, #A5E3FF 0%, transparent 40%)
      `,
    }}
  >
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-md rounded-lg w-full max-w-md border-2 border-gray-300"
    >
      <h2 className="text-2xl font-semibold mb-2 text-center">Email Verification</h2>

      <p className="mb-6 text-sm text-center text-gray-700">
        Enter your <span className="font-medium">Email address</span> to receive a <span className="font-medium">verification</span> link
        <br />
        Or skip if you want to proceed without verification
      </p>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
          placeholder="Enter Your Email Address"
          disabled={isLoading}
        />
      </div>

      {/* Message */}
      {message && (
        <p className={`text-sm mb-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}

      {/* Send Verification Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300 text-sm font-medium"
        disabled={isLoading || !email.trim()}
      >
        {isLoading ? 'Sending...' : 'Send Verification Email'}
      </button>

      {/* Skip Link */}
      <button
        type="button"
        onClick={handleSkip}
        className="w-full text-sm text-blue-600 text-center mt-4 hover:underline"
        disabled={isLoading}
      >
        Skip for now →
      </button>
    </form>
  </div>
);
}
