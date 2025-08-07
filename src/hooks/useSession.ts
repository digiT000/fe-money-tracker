import React, { useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import { useUserActions, useUserState } from '@/context/useContext';

function useSession() {
  const { status } = useUserState();
  const { saveUserData, fetchingUser, fetchingError } = useUserActions();
  const isLoading = useMemo(
    () => status === 'LOADING' || status === 'IDLE',
    [status]
  );

  async function getUserSession() {
    if (status === 'LOADING') {
      return;
    }
    if (status === 'SUCCESS') {
      return;
    }

    try {
      fetchingUser();
      const response = await axios.post(
        '/auth/get-session',
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // const emailVerified: boolean = response?.data?.isVerified;

        saveUserData(response.data);
      }
    } catch (e) {
      fetchingError();
    }
  }

  useEffect(() => {
    getUserSession();
  }, []);

  return { isLoading, status };
}

export default useSession;
