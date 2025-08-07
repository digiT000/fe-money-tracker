'use client';
import React, { useEffect } from 'react';
import DateConfigOnboarding from '@/components/pages/welcome/ui/DateConfigOnboarding';
import ProfileOnboarding from '@/components/pages/welcome/ui/ProfileOnboarding';
import { useOnboarding } from '@/hooks/useOnboarding';
import useSession from '@/hooks/useSession';
import { useUserState } from '@/context/useContext';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useRouter } from 'next/navigation';

function WelcomeOnboarding() {
  const router = useRouter();
  const { isLoading } = useSession();
  const { status, user } = useUserState();
  const {
    onboardingData,
    step,
    handleAction,
    onChange,
    isLoading: submitLoading,
  } = useOnboarding();

  useEffect(() => {
    if (user && user.isCompleteOnboarding) {
      router.push('/app');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className={'w-full h-screen flex justify-center items-center'}>
        <Spinner variant={'circle'} />
      </div>
    );
  }
  if (!isLoading && status === 'ERROR') {
    return <p>Something went wrong</p>;
  }

  if (user && !user.isCompleteOnboarding) {
    return (
      <section
        className={'h-full flex flex-col justify-center items-center px-4'}
      >
        <div className={'mx-auto max-w-3xl'}>
          {step === 0 && (
            <ProfileOnboarding
              handleAction={handleAction}
              step={step}
              profileData={{
                partner: onboardingData.partner,
                you: onboardingData.you,
              }}
              onChange={onChange}
            />
          )}
          {step === 1 && (
            <DateConfigOnboarding
              handleAction={handleAction}
              step={step}
              date={onboardingData.date}
              onChange={onChange}
              isLoading={submitLoading}
            />
          )}
        </div>
      </section>
    );
  }
}

export default WelcomeOnboarding;
