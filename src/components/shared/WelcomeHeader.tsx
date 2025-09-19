'use client';
import React from 'react';
import dayjs from 'dayjs';
import { useUserState } from '@/context/useContext';
import Skeleton from 'react-loading-skeleton';

function WelcomeHeader({ handleLogout }: { handleLogout: () => void }) {
  const currentDate = new Date();
  const { user, status } = useUserState();

  if (status === 'LOADING') {
    return (
      <div className={'flex flex-col'}>
        <Skeleton height={13} width={150} />
        <Skeleton height={10} width={50} />
      </div>
    );
  } else {
    return (
      <div className={'flex justify-between items-center w-full'}>
        <div className={'flex flex-col gap-1'}>
          <h3 className={'text-sm font-bold text-neutral-900'}>
            Welcome Back, {user?.name} & {user?.partner?.name || ''}
          </h3>
          <p className={'text-xs text-neutral-700'}>
            {dayjs(currentDate).format('dddd,MMM DD, YYYY')}
          </p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
}

export default WelcomeHeader;
