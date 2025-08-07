'use client';
import { useEffect } from 'react';
import { useUserActions } from '@/context/useContext';
import useSession from '@/hooks/useSession';

function SessionSync({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { saveUserData, fetchingError, fetchingUser } = useUserActions();
  const { user, status } = useSession(isAuthenticated);

  useEffect(() => {
    if (status === 'pending') {
      fetchingUser();
    }

    if (status === 'success' && user) {
      saveUserData(user);
    }

    if (status === 'error') {
      fetchingError();
    }
  }, [status, user, saveUserData, fetchingError, fetchingUser]);

  return null;
}

export default SessionSync;
