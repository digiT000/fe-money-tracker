import React, { useState } from 'react';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { ErrorModel } from '@/utils/interface/errorInterface';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { saveAccessToken } from '@/utils/saveAccesToken';

interface FormAuthProps {
  email: string;
  password: string;
}

function UseFormAuth(page: 'login' | 'register') {
  const router = useRouter();
  const [formData, setFormData] = useState<FormAuthProps>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleAction() {
    try {
      const url = page === 'login' ? `/auth/login` : `/auth/register`;
      const response = await axios.post(
        url,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      const userData = response.data;
      saveAccessToken(userData.accessToken);

      router.push('/app');
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response) {
          const error = e.response.data as ErrorModel;
          toast.error(error.message);
        } else {
          toast.error('Something went wrong, please try again later');
        }
      }
    }
  }

  return {
    formData,
    handleChange,
    handleAction,
    isLoading,
  };
}

export default UseFormAuth;
