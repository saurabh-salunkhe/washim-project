'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import { verifyPhone, getSignupStatus } from '@/lib/api'; 

export default function SignupPage() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateMobileNumber = (mobile) => /^\d{10}$/.test(mobile.trim());

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
      // 👉 First: check signup status for this phone
      const statusResponse = await getSignupStatus(formattedPhone);
      const statusData = statusResponse.data;

      if (statusData.status === 'completed') {
        router.push('/login'); // signup already done → go to login
        return;
      }

      if (statusData.status === 'phone_verified' && statusData.session_id) {
        // phone OTP was verified, but profile not completed yet
        localStorage.setItem('sessionId', statusData.session_id);
        localStorage.setItem('phoneForVerification', formattedPhone);
        router.push('/complete-profile');
        return;
      }

      if (statusData.status === 'phone_verification_pending' || statusData.status === 'expired' || statusData.status === 'new_user') {
        // Either new signup or OTP expired → send new OTP
        const verifyResponse = await verifyPhone(formattedPhone);

        if (verifyResponse.data.success) {
          localStorage.setItem('phoneForVerification', formattedPhone);
          localStorage.setItem('sessionType', 'signup');
          localStorage.setItem('sessionId', verifyResponse.data.data?.sessionId || '');
          router.push('/verify');
        } else {
          setError(verifyResponse.data.message || 'Failed to send OTP. Please try again.');
        }
        return;
      }

      setError('Unexpected status. Please try again.');

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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
          radial-gradient(circle at top left, #A5E3FF 0%, transparent 40%),
          radial-gradient(circle at bottom right, #A5E3FF 0%, transparent 40%)
       `,
    }}
  >
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Sign up</h2>
        <form onSubmit={handleContinue}>
          <label className="block mb-2 font-medium text-sm">Phone number</label>
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
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}