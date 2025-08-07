import axios from '@/lib/axios';
import { OnbardingDataProps } from '@/hooks/useOnboarding';
import { AxiosError } from 'axios';

export interface OnboardingDataModel {
  partner: string;
  user: string;
  dateReset: number;
}

export async function postOnboarding(
  dataOnboarding: OnbardingDataProps,
  token: string
) {
  try {
    const data: OnboardingDataModel = {
      user: dataOnboarding.you,
      dateReset: dataOnboarding.date,
      partner: dataOnboarding.partner,
    };

    const response = await axios.post('/auth/onboarding-submission', data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: error.status,
        message: 'Gagal menyimpan data ',
      };
    } else {
      return {
        status: 400,
        message: 'Gagal menyimpan data ',
      };
    }
  }
}
