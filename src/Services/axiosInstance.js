import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://api.acdoctor.in/api/v1', // prodiuction
  // baseURL: 'https://api-dev.acdoctor.in/api/v1', //Develo
  baseURL: 'https://hematoid-autohypnotic-rey.ngrok-free.dev/api/v1',
  // baseURL: 'https://drusilla-watchful-overlavishly.ngrok-free.dev/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },

  timeout: 10000,
});

// Request Interceptor (optional – for token later)
axiosInstance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  },
);

export default axiosInstance;
