'use client';

import React, { memo } from 'react';
import OnboardingHeader from '@/components/pages/welcome/ui/OnboardingHeader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { OnboardingPageProps } from '@/components/pages/welcome/type';

const DateConfigOnboarding = memo(function DateConfigOnboarding({
  step,
}: OnboardingPageProps) {
  return (
    <div className={'flex flex-col gap-8'}>
      <OnboardingHeader
        step={step}
        title={'When does your money journey begin?'}
        description={
          'Whether it’s the 1st, 15th, or right after payday — pick a date that makes sense for your budgeting flow'
        }
      />
      <div className={'flex flex-col gap-6 max-w-md mx-auto w-full'}>
        <div className={'flex flex-col gap-2 items-center'}>
          <Label className={'text-center'}>Set the Date 📅</Label>
          <Input
            name={'you'}
            className={'placeholder:text-center text-center'}
            type={'number'}
            min={1}
            max={31}
          />
        </div>
      </div>
      <Button
        text={'Let’s Go to the Dashboard'}
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

export default DateConfigOnboarding;
