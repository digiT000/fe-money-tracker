import axios from '@/lib/axios';

export async function userLogout() {
  try {
    const response = await axios.post(
      '/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );
    return response.status === 200;
  } catch (e) {
    return false;
  }
}
