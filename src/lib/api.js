import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Signup: Send OTP to phone
export const verifyPhone = (phone) =>
  axios.post(`${API_BASE}/api/auth/verify-phone`, { phone });

// Signup: Complete user profile
export const completeProfile = (data) =>
  axios.post(`${API_BASE}/api/auth/complete-profile`, data);

// Login: Send OTP to phone
export const login = (phone) =>
  axios.post(`${API_BASE}/api/auth/login`, { phone });

// Login: Verify OTP for login
export const verifyLoginOtp = (sessionId, otp) =>
  axios.post(`${API_BASE}/api/auth/verify-login-otp`, { sessionId, otp });

// Signup: Verify OTP for signup
export const verifyOtp = (sessionId, otp) =>
  axios.post(`${API_BASE}/api/auth/verify-otp`, { sessionId, otp });

// Resend OTP (for both signup and login)
export const resendOtp = (phone, sessionType) =>
  axios.post(`${API_BASE}/api/auth/resend-otp`, { phone, sessionType });

// Check signup status
export const getSignupStatus = (phone) =>
  axios.post(`${API_BASE}/api/auth/signup-status`, { phone });


export const sendVerificationEmail = async (userId, email) => {
  return await axios.post(`${API_BASE}/api/auth/send-verification-email`, {
    user_id: userId, 
    email,
  });
};


export const verifyEmail = async (token) => {
  return await axios.get(`${API_BASE}/api/auth/verify-email?token=${token}`);
};