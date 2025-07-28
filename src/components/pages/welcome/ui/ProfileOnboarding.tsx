'use client';
import OnboardingHeader from '@/components/pages/welcome/ui/OnboardingHeader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import React, { memo, useEffect, useState } from 'react';
import { OnboardingPageProps } from '@/components/pages/welcome/type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ProfileOnboarding = memo(function ProfileOnboarding({
  step,
  setStep,
}: OnboardingPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [profile, setProfile] = useState({
    you: '',
    partner: '',
  });

  function handleNextStep() {
    if (setStep) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('you', `${profile.you}`);
      currentParams.set('partner', `${profile.partner}`);
      router.replace(`${pathname}?${currentParams.toString()}`);

      setStep('date_config');
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    const you = searchParams.get('you') || '';
    const partner = searchParams.get('partner') || '';
    setProfile({
      you,
      partner,
    });
  }, [searchParams]);

  return (
    <div className={'flex flex-col gap-8'}>
      <OnboardingHeader
        step={step}
        title={'Who’s in this together?'}
        description={
          'Before we start tracking your shared wins, let’s get to know who’s on the team. Drop both your names and your partner and let the journey begin.'
        }
      />
      <div className={'flex flex-col gap-6 max-w-md mx-auto w-full'}>
        <div className={'flex flex-col gap-2 items-center'}>
          <Label className={'text-center'}>Your Name 👤</Label>
          <Input
            name={'you'}
            placeholder={'Ex: Bambang'}
            className={'placeholder:text-center text-center'}
            type={'text'}
            value={profile.you}
            onChange={handleInputChange}
          />
        </div>
        <div className={'flex flex-col gap-2 items-center'}>
          <Label className={'text-center'}>Partner’s Name 💞</Label>
          <Input
            name={'partner'}
            placeholder={'Ex : Sarah'}
            className={'placeholder:text-center text-center'}
            type={'text '}
            value={profile.partner}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button
        onClick={handleNextStep}
        text={'Next: Set Your Budget Cycle'}
        isDisabled={false}
        buttonVariant={'btn-primary'}
        className={'mx-auto w-full sm:w-fit'}
      />
      <p className={'sub-text opacity-50 text-center'}>
        You can always changes this later
      </p>
    </div>
  );
});

export default ProfileOnboarding;
