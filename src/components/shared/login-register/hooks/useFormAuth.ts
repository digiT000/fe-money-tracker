import React, { useState } from 'react';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { ErrorModel } from '@/utils/interface/errorInterface';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PayloadUser, useUserActions } from '@/context/useContext';

interface FormAuthProps {
  email: string;
  password: string;
}

function UseFormAuth(
  page: 'login' | 'register',
  setOpenSuccessRegister?: (value: boolean) => void
) {
  const { saveUserData } = useUserActions();
  const router = useRouter();
  const [formData, setFormData] = useState<FormAuthProps>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleAction() {
    if (!formData.email || !formData.password) {
      setError('Please enter email or password');
      return;
    }
    try {
      setError(null);
      setIsLoading(true);
      const url = page === 'login' ? `/auth/login` : `/auth/register-user`;
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
      if (page === 'login') {
        const dataLogin: PayloadUser = {
          user: {
            name: userData.user.name,
            email: userData.user.email,
            isVerified: userData.user.isVerified,
            isCompleteOnboarding: userData.user.isCompleteOnboarding,
            partner: userData.user.partner,
            mainPartner: userData.user.mainPartner,
          },
          status: 'SUCCESS',
          accessToken: userData.accessToken,
        };
        saveUserData(dataLogin);

        if (userData.user.isCompleteOnboarding) {
          router.push('/app');
        } else {
          router.push('/welcome');
        }
      } else {
        setRegisterSuccess(true);
        if (setOpenSuccessRegister) {
          setOpenSuccessRegister(true);
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response) {
          const error = e.response.data as ErrorModel;
          toast.error(
            error?.message || 'Something went wrong, please try again later'
          );
        } else {
          toast.error('Something went wrong, please try again later');
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    formData,
    handleChange,
    handleAction,
    isLoading,
    error,
  };
}

export default UseFormAuth;
