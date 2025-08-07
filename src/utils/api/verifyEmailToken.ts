import axios from '@/lib/axios';
import { AxiosError } from 'axios';

export async function verifyEmailToken(token: string) {
  if (!token) {
    return {
      status: 400,
      message: 'Gagal melakukan Verifikasi',
    };
  }
  try {
    const response = await axios.put(`/auth/verify-email?token=${token}`);
    console.log(response);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return {
        status: e.status,
        errorCode: e?.response?.data?.errorCode,
        message: e?.response?.data?.message || 'Gagal melakukan Verifikasi',
      };
    } else {
      console.error(e);
      return {
        status: 400,
        errorCode: 'AUTH_00',
        message: 'Gagal melakukan Verifikasi',
      };
    }
  }
}
