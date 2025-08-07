import axios from '@/lib/axios';

export async function getUserSession() {
  const response = await axios.post(
    '/auth/get-session',
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
}
