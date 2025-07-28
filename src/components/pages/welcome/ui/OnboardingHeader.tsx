import React from 'react';
const TOTAL_STEP = 2;

interface OnboardingHeaderProps {
  step: number;
  title: string;
  description: string;
}

function OnboardingHeader({ step, description, title }: OnboardingHeaderProps) {
  return (
    <div className={'flex flex-col gap-5 items-center text-center'}>
      <div className={'py-1 px-6 bg-primary-200 w-fit rounded-2xl'}>
        <span>
          {step}/{TOTAL_STEP}
        </span>
      </div>
      <h2 className={'title'}>{title}</h2>
      <p className={'body-text max-w-xl mx-auto'}>{description}</p>
    </div>
  );
}

export default OnboardingHeader;
