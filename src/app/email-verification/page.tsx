'use client';
import React from 'react';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useEmailVerify } from '@/components/pages/email-verification/hooks/useEmailVerify';
import VerificationResponseUi from '@/components/pages/email-verification/ui/VerificaitonResponseUi';

function Page() {
  const { pageStatus } = useEmailVerify();
  if (pageStatus === 'LOADING') {
    return (
      <div className={'w-full h-screen flex justify-center items-center'}>
        <Spinner variant={'circle'} />
      </div>
    );
  } else {
    return <VerificationResponseUi pageStatus={pageStatus} />;
  }
}

export default Page;
