import React from 'react';
import { isAuthenticated } from '@/utils/api/isAuthenticated';
import { redirect } from 'next/navigation';
import NavigationBar from '@/components/shared/NavigationBar';
import WelcomeOnboarding from '@/components/pages/welcome/ui';

async function WelcomePage() {
  const isAuthencated = await isAuthenticated();
  if (!isAuthencated) {
    redirect('/login');
  }
  return (
    <section className={'h-full'}>
      <NavigationBar page={'welcome'} />
      <WelcomeOnboarding />
    </section>
  );
}

export default WelcomePage;
