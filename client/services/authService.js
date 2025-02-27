import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080/auth';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    localStorage.setItem('token', response.data.token);  // Salvează token-ul JWT
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

export const signup = async (username, password, email, phoneNumber) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, password, email, phoneNumber });
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw new Error('Signup failed');
  }
};

export const sendOtp = async (phoneNumber) => {
  try {
    const response = await axios.post(`${API_URL}/otp`, { phoneNumber });
    return response.data;
  } catch (error) {
    console.error('OTP send failed:', error);
    throw new Error('OTP send failed');
  }
};

export const verifyOtp = async (otp, phoneNumber) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, { otp, phoneNumber });
    return response.data;
  } catch (error) {
    console.error('OTP verification failed:', error);
    throw new Error('OTP verification failed');
  }
};
