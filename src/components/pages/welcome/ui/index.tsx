'use client';
import React, { useState } from 'react';
import DateConfigOnboarding from '@/components/pages/welcome/ui/DateConfigOnboarding';
import { Object_State, OBJECT_STEP } from '@/components/pages/welcome/type';
import ProfileOnboarding from '@/components/pages/welcome/ui/ProfileOnboarding';

function WelcomeOnboarding() {
  const [step, setStep] = useState<Object_State>('profile_onboarding');

  return (
    <section
      className={'h-full flex flex-col justify-center items-center px-4'}
    >
      <div className={'mx-auto max-w-3xl'}>
        {step === 'profile_onboarding' && (
          <ProfileOnboarding
            setStep={setStep}
            step={OBJECT_STEP.profile_onboarding}
          />
        )}
        {step === 'date_config' && (
          <DateConfigOnboarding step={OBJECT_STEP.date_config} />
        )}
      </div>
    </section>
  );
}

export default WelcomeOnboarding;
