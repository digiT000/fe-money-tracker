'use client';
import OnboardingHeader from '@/components/pages/welcome/ui/OnboardingHeader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import React, { memo, useEffect, useState } from 'react';
import { OnboardingPageProps } from '@/components/pages/welcome/type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

interface ProfileProps extends OnboardingPageProps {
  profileData: { partner: string; you: string };
}

const ProfileOnboarding = memo(function ProfileOnboarding({
  step,
  onChange,
  handleAction,
  profileData,
}: ProfileProps) {
  const [error, setError] = useState<string | null>(null);

  function nextAndValidation() {
    if (!profileData.you && !profileData.partner) {
      setError('Please enter your name and your partner');
      return;
    } else if (!profileData.you) {
      setError('Please enter your name');
      return;
    } else if (!profileData.partner) {
      setError('Please enter your partner name');
      return;
    }
    handleAction();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    onChange(name, value);
  }

  // useEffect(() => {
  //   const you = searchParams.get('you') || '';
  //   const partner = searchParams.get('partner') || '';
  //   setProfile({
  //     you,
  //     partner,
  //   });
  // }, [searchParams]);

  useEffect(() => {
    if (profileData.you && profileData.partner) {
      setError(null);
    }
  }, [profileData]);

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
        {error && (
          <Alert
            variant="destructive"
            className={'flex justify-center items-center'}
          >
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <div className={'flex flex-col gap-2 items-center'}>
          <Label className={'text-center'}>Your Name 👤</Label>
          <Input
            name={'you'}
            placeholder={'Ex: Bambang'}
            className={'placeholder:text-center text-center'}
            type={'text'}
            value={profileData.you}
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
            value={profileData.partner}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button
        onClick={nextAndValidation}
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
