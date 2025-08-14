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
      <section className={'bg-[#DEFEFF] mb-10'}>
        <NavigationBar page={'general'} />
      </section>
      <MainContentSection />
    </>
  );
}

export default Page;
