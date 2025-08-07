import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { verifyEmailToken } from '@/utils/api/verifyEmailToken';

export function useEmailVerify() {
  const searchParams = useSearchParams();
  const emailToken = searchParams.get('token');
  const [pageStatus, setPageStatus] = useState<
    'LOADING' | 'ERROR' | 'SUCCESS' | 'ALREADY_VERIFIED'
  >('LOADING');

  async function verifyEmail(token: string) {
    const response = await verifyEmailToken(token);
    if (response.status === 200) {
      setPageStatus('SUCCESS');
    } else {
      if (response.errorCode === 'AUTH_06') {
        setPageStatus('ALREADY_VERIFIED');
      } else {
        setPageStatus('ERROR');
      }
    }
  }
  useEffect(() => {
    if (!emailToken) {
      setPageStatus('ERROR');
    } else {
      verifyEmail(emailToken);
    }
  }, [searchParams]);

  return { pageStatus };
}
