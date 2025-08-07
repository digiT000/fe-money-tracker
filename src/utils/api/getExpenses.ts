import axios from '@/lib/axios';

export async function getExpenses(token: string) {
  if (!token) {
    return [];
  }
  try {
    const response = await axios.get('/expenses', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return [];
  }
}
