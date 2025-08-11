'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/lib/api';

export default function VerifyEmailHandlerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Missing token in URL.');
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        if (res.data.success) {
          setStatus('success');
          setMessage('Email verified successfully! Redirecting to login...');
          setTimeout(() => router.push('/login'), 3000);
        } else {
          setStatus('error');
          setMessage(res.data.message || 'Verification failed.');
        }
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'An error occurred during verification.');
      }
    };

    verify();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        {status === 'verifying' && <p className="text-blue-600">Verifying email...</p>}

        {status === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg">
            <div className="text-2xl font-bold flex items-center justify-center gap-2">
              Email Verified <span className="text-green-600 text-3xl">✅</span>
            </div>
            <p className="mt-3 text-sm">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <>
            <p className="text-red-600">{message}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
