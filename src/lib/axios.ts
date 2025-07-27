import axiosInstance from 'axios';

const axios = axiosInstance.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;
