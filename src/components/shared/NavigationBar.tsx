'use client';
import React from 'react';
import Image from 'next/image';
import { userLogout } from '@/utils/api/userLogout';

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
      <Image src={'/logo.svg'} height={32} width={200} alt={'logo'} />
      {page === 'welcome' && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}

export default NavigationBar;
