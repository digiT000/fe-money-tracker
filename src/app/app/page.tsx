import React from 'react';
import { isAuthenticated } from '@/utils/api/isAuthenticated';
import { redirect } from 'next/navigation';

async function Page() {
  const isAuthencated = await isAuthenticated();

  if (!isAuthencated) {
    redirect('/login');
  }
  return <div>{isAuthencated}</div>;
}

export default Page;
