export type Object_State = 'profile_onboarding' | 'date_config';

export const OBJECT_STEP = {
  profile_onboarding: 1,
  date_config: 2,
};

export interface OnboardingPageProps {
  step: number;
  setStep?: (value: Object_State) => void;
}
