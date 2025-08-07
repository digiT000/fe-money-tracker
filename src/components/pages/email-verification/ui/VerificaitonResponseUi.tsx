import React from 'react';
import Button from '@/components/shared/Button';

interface VericationResponseUIProps {
  pageStatus: 'ERROR' | 'SUCCESS' | 'ALREADY_VERIFIED';
}

const resposeMessage = {
  ERROR: {
    title: 'Oops! Your Verification Link Has Expired',
    description:
      'It looks like your link is no longer valid. Don’t worry—you can request a new one and try again.',
    button: 'Request New Link',
  },
  SUCCESS: {
    title: 'Email Verification Success',
    description:
      'You’re all set—your email is now verified. You can log in and start exploring.',
    button: 'Login Now',
  },
  ALREADY_VERIFIED: {
    title: 'Email Already Verified',
    description:
      'You’re all set—your email is already verified. You can log in and start exploring.',
    button: 'Login Now',
  },
};

function VerificationResponseUi({ pageStatus }: VericationResponseUIProps) {
  return (
    <main>
      <section
        className={
          'max-w-7xl mx-auto py-12 px-4 flex flex-col items-center gap-4'
        }
      >
        <h1 className={'medium-title font-nunito text-center'}>
          {resposeMessage[pageStatus].title}
        </h1>
        <p className={'body-text text-center'}>
          {resposeMessage[pageStatus].description}
        </p>
        <Button
          buttonVariant={'btn-primary'}
          text={resposeMessage[pageStatus].button}
          href={'/login'}
        />
      </section>
    </main>
  );
}

export default VerificationResponseUi;
