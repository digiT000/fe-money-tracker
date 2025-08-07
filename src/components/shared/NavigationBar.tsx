'use client';
import React from 'react';
import Image from 'next/image';
import { userLogout } from '@/utils/api/userLogout';
import WelcomeHeader from '@/components/shared/WelcomeHeader';

interface NavigationProps {
  page: 'general' | 'auth' | 'welcome';
}

function NavigationBar({ page }: NavigationProps) {
  async function handleLogout() {
    await userLogout();
    window.location.reload();
  }
  return (
    <header
      className={`px-4 flex items-center py-5  max-w-7xl mx-auto ${page === 'welcome' ? 'justify-between' : ''}`}
    >
      <div className={`${page === 'general' ? 'flex items-center gap-8' : ''}`}>
        <Image src={'/logo.svg'} height={24} width={150} alt={'logo'} />
        {page === 'general' && <WelcomeHeader />}
      </div>

      {page === 'welcome' && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}

export default NavigationBar;
