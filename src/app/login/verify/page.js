'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyLoginOtp } from '@/lib/api';

export default function VerifyLoginOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (!storedSessionId) {
      router.push('/login');
    } else {
      setSessionId(storedSessionId);
    }
  }, [router]);

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
        const { accessToken, refreshToken } = res.data.data;

        // Store tokens in localStorage (or secure storage on mobile)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        router.push('/dashboard');
      } else {
        setError(res.data.message || 'OTP verification failed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          placeholder="6-digit OTP"
          className="w-full p-2 border rounded mb-4"
          value={otp}
          onChange={handleOtpChange}
          maxLength={6}
        />
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
  );
}
