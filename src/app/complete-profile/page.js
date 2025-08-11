 'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { completeProfile } from '@/lib/api';

export default function CompleteProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const sessionType = localStorage.getItem('sessionType');
    if (!sessionId || sessionType !== 'signup') {
      setError('No valid session found. Please start over from signup.');
      router.push('/signup');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      setError('Session ID not found. Please start over from signup.');
      setIsLoading(false);
      return;
    }

    const { name, street, city, state, pincode, country } = formData;

    if (!name.trim() || !street.trim() || !city.trim() || !state.trim() || !pincode.trim() || !country.trim()) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await completeProfile({
        sessionId,
        name: name.trim(),
        address: {
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          country: country.trim(),
        },
      });

      if (res.data.success) {
        localStorage.setItem('userId', res.data.data.user.id); 
        localStorage.removeItem('phoneForVerification');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('sessionType');
        router.push('/email-verification'); 
      } else {
        const msg =
          res.data.details && typeof res.data.details === 'object'
            ? Object.values(res.data.details).join(', ')
            : res.data.message || 'Failed to complete profile. Please try again.';
        setError(msg);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

 return (
  <div
    className="flex items-center justify-center min-h-screen"
    style={{
      backgroundImage: `
        radial-gradient(circle at top left, #A5E3FF 0%, transparent 40%),
        radial-gradient(circle at bottom right, #A5E3FF 0%, transparent 40%)
      `,
    }}
  >
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-md rounded-md w-full max-w-md border-2 border-gray-300"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Complete Profile</h2>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Name"
          disabled={isLoading}
          required
        />
      </div>

      {/* Address Section */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Address</label>

        <input
          type="text"
          name="street"
          id="street"
          value={formData.street}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Street"
          disabled={isLoading}
          required
        />
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="City"
          disabled={isLoading}
          required
        />
        <input
          type="text"
          name="state"
          id="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="State"
          disabled={isLoading}
          required
        />
        <input
          type="text"
          name="pincode"
          id="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Pincode"
          disabled={isLoading}
          required
        />
        <input
          type="text"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Country"
          disabled={isLoading}
          required
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
        disabled={
          isLoading ||
          !formData.name.trim() ||
          !formData.street.trim() ||
          !formData.city.trim() ||
          !formData.state.trim() ||
          !formData.pincode.trim() ||
          !formData.country.trim()
        }
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  </div>
);
}