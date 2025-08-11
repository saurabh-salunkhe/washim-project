'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import React from 'react';
import { verifyOtp, verifyLoginOtp, resendOtp, getSignupStatus } from '@/lib/api';

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
      return;
    }

    setPhone(storedPhone);

    // ✅ Validate backend status to ensure we're at the correct step
    const checkSignupStatus = async () => {
      try {
        if (sessionType === 'signup') {
          const statusRes = await getSignupStatus(storedPhone);
          const status = statusRes.data;

          if (status.status === 'completed') {
            router.push('/login');
          } else if (status.status === 'phone_verified') {
            localStorage.setItem('sessionId', status.session_id);
            router.push('/complete-profile');
          } else if (status.status === 'new_user') {
            router.push('/signup');
          }
          // Otherwise allow OTP entry
        }
      } catch (err) {
        setError('Failed to check signup status. Try again.');
      }
    };

    checkSignupStatus();
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
          localStorage.setItem('sessionId', response.data.data?.sessionId || sessionId);
          router.push('/complete-profile');
        }
      } else {
        setError(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
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
  <div
    className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `
        radial-gradient(circle at top right, #A5E3FF 0%, transparent 40%),
        radial-gradient(circle at bottom left, #A5E3FF 0%, transparent 40%)
      `,
    }}
  >
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      <form onSubmit={handleVerify}>
        <label className="block font-medium mb-1">Enter OTP</label>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
          value={otp}
          onChange={handleOtpChange}
          disabled={isLoading}
          maxLength={6}
        />
        <p className="text-sm mb-4">
          Didn't receive the OTP?{' '}
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-blue-600 font-medium hover:underline disabled:text-gray-400"
            disabled={isLoading}
          >
            Resend
          </button>
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mb-2 disabled:bg-blue-300"
          disabled={isLoading || otp.trim().length !== 6}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  </div>
);
}
