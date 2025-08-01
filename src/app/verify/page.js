'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import React from 'react';
import { verifyOtp, verifyLoginOtp, resendOtp } from '@/lib/api';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedPhone = localStorage.getItem('phoneForVerification');
    const sessionId = localStorage.getItem('sessionId');
    const sessionType = localStorage.getItem('sessionType');
    if (!storedPhone || !sessionId || !sessionType) {
      setError('No phone number or session found. Please start over.');
      router.push(sessionType === 'login' ? '/login' : '/signup');
    } else {
      setPhone(storedPhone);
    }
  }, [router]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const sessionId = localStorage.getItem('sessionId');
    const sessionType = localStorage.getItem('sessionType');

    if (!sessionId || !sessionType) {
      setError('Session information missing. Please start over.');
      setIsLoading(false);
      return;
    }

    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      setIsLoading(false);
      return;
    }

    try {
      const response =
        sessionType === 'login'
          ? await verifyLoginOtp(sessionId, otp.trim())
          : await verifyOtp(sessionId, otp.trim());

      if (response.data.success) {
        if (sessionType === 'login') {
          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);
          localStorage.removeItem('phoneForVerification');
          localStorage.removeItem('sessionId');
          localStorage.removeItem('sessionType');
          router.push('/dashboard');
        } else {
          router.push('/complete-profile');
        }
      } else {
        setError(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setIsLoading(true);

    const sessionType = localStorage.getItem('sessionType');
    if (!sessionType || !phone) {
      setError('Session or phone number missing. Please start over.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await resendOtp(phone, sessionType);

      if (response.data.success) {
        localStorage.setItem('sessionId', response.data.data.sessionId);
        setError('OTP resent successfully. Check your phone.');
      } else {
        setError(response.data.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred while resending OTP.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full border p-2 mb-4"
          value={otp}
          onChange={handleOtpChange}
          disabled={isLoading}
          maxLength={6}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-blue-300 mb-4"
          disabled={isLoading || otp.trim().length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
        <button
          type="button"
          onClick={handleResendOtp}
          className="w-full bg-gray-500 text-white py-2 rounded disabled:bg-gray-300"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Resend OTP'}
        </button>
      </form>
    </div>
  );
}
