import React from 'react';
import { isAuthenticated } from '@/utils/api/isAuthenticated';
import { redirect } from 'next/navigation';
import NavigationBar from '@/components/shared/NavigationBar';
import MainContentSection from '@/components/pages/app/ui/MainContentSection';

async function Page() {
  const isAuthencated = await isAuthenticated();
  if (!isAuthencated) {
    redirect('/login');
  }
  return (
    <>
      <NavigationBar page={'general'} />
      <MainContentSection />
    </>
  );
}

export default Page;
