import { useState } from 'react';
import { useUserActions, useUserState } from '@/context/useContext';
import { postOnboarding } from '@/utils/api/postOnboarding';
import { useRouter } from 'next/navigation';

const STEP_ARRAY = ['profile_onboarding', 'date_config'];

export interface OnbardingDataProps {
  partner: string;
  you: string;
  date: number;
}

export function useOnboarding() {
  const router = useRouter();
  const { accessToken } = useUserState();
  const { revalidateUser } = useUserActions();
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnbardingDataProps>({
    date: 25,
    partner: '',
    you: '',
  });

  function onChange(name: string, value: string) {
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAction() {
    if (!accessToken) {
      return;
    }

    // Add Step
    if (step !== STEP_ARRAY.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }
    setIsLoading(true);
    const result = await postOnboarding(onboardingData, accessToken);

    if (result && result.status === 200) {
      await revalidateUser();
      router.push('/app');
    }
  }

  return { step, onboardingData, onChange, handleAction, isLoading };
}
