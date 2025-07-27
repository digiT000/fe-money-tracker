import React, { useState } from 'react';
import axios from '@/lib/axios';

interface FormAuthProps {
  email: string;
  password: string;
}

function UseFormAuth(page: 'login' | 'register') {
  const [formData, setFormData] = useState<FormAuthProps>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleAction() {
    try {
      const url = page === 'login' ? `/login` : `/register`;
      const response = await axios.post(url, formData);
      console.log(response);
      alert(response.data.message);
    } catch (e) {}
  }

  function handleLogin() {
    alert(`Login Page ${formData.email}`);
  }
  function handleRegister() {
    alert(`Register Page ${formData.email}`);
  }

  return {
    formData,
    handleChange,
    handleAction,
    isLoading,
  };
}

export default UseFormAuth;
