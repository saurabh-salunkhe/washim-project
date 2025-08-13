'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyLoginOtp, resendOtp } from '@/lib/api';

export default function VerifyLoginOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [resendTimer, setResendTimer] = useState(30); // countdown timer for resend

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (!storedSessionId) {
      router.push('/login');
    } else {
      setSessionId(storedSessionId);
    }
  }, [router]);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP.');
      setIsVerifying(false);
      return;
    }

    try {
      const res = await verifyLoginOtp(sessionId, otp);

      if (res.data.success) {
        const { accessToken, refreshToken, user } = res.data.data;

        // Store tokens & user ID
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('recruiter_id', user.id);

        // Clean up
        localStorage.removeItem('sessionId');
        localStorage.removeItem('sessionType');
        localStorage.removeItem('phone');

        router.push('/company-profile');
      } else {
        setError(res.data.message || 'OTP verification failed.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    const phone = localStorage.getItem('phone');
    const sessionType = localStorage.getItem('sessionType');

    if (!phone || !sessionType) {
      setError('Session expired. Please try logging in again.');
      return;
    }

    try {
      const res = await resendOtp(phone, sessionType);

      if (res.data.success) {
        setError('');
        setResendTimer(30);
      } else {
        setError(res.data.message || 'Failed to resend OTP.');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong while resending OTP.');
    }
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
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded shadow border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Log in</h2>
        <form onSubmit={handleVerifyOtp}>
          <label className="text-sm font-semibold mb-1 block">Enter OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border rounded mb-2"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            disabled={isVerifying}
          />
          <div className="text-sm text-gray-600 mb-4">
            Didn’t receive the OTP?{' '}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
              className={`font-semibold ${
                resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'
              }`}
            >
              Resend {resendTimer > 0 ? `(${resendTimer}s)` : ''}
            </button>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-blue-300"
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}
