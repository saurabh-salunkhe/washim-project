'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import { verifyPhone } from '@/lib/api'; 
export default function SignupPage() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile.trim());
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formattedPhone = `+91${mobile.trim()}`;

    if (!validateMobileNumber(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await verifyPhone(formattedPhone); // ✅ use lib/api.js

      if (response.data.success) {
        localStorage.setItem('phoneForVerification', formattedPhone);
        if (response.data.data?.sessionId) {
          localStorage.setItem('sessionId', response.data.data.sessionId);
          localStorage.setItem('sessionType', 'signup');
        }
        router.push('/verify');
      } else {
        setError(response.data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 10) {
      setMobile(value);
      setError('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleContinue}>
        <div className="flex items-center border p-2 mb-4 rounded">
          <span className="text-gray-500 mr-2">+91</span>
          <input
            type="text"
            placeholder="Enter 10-digit mobile number"
            className="w-full outline-none"
            value={mobile}
            onChange={handleMobileChange}
            disabled={isLoading}
            maxLength={10}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-blue-300"
          disabled={isLoading || mobile.trim().length !== 10}
        >
          {isLoading ? 'Sending...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
