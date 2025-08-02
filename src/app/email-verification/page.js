'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { sendVerificationEmail } from '@/lib/api'; // make sure the path is correct
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
        setMessage('Verification email sent. Please check your inbox.');
        setIsError(false);
        // Do not auto-redirect — let user manually verify or skip
      } else {
        setMessage(response.data.message || 'Failed to send verification email.');
        setIsError(true);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // You may want to mark that user skipped email (in DB or localStorage)
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Email Verification</h2>
        <p className="mb-4 text-gray-600">
          Enter your email address to receive a verification link. Or skip if you want to proceed without verification.
        </p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>

        {message && (
          <p className={isError ? 'text-red-500 mb-4' : 'text-green-500 mb-4'}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300 mb-4"
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? 'Sending...' : 'Send Verification Email'}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
          disabled={isLoading}
        >
          Skip
        </button>
      </form>
    </div>
  );
}
