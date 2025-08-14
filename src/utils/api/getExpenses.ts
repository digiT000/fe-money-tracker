import axios from '@/lib/axios';

export async function getExpenses(token: string, selectedOwner: string) {
  if (!token) {
    return [];
  }

  let url = '/expenses';
  if (selectedOwner !== 'all') {
    url = `${url}?ownerId=${selectedOwner}`;
  }

  try {
    const response = await axios.get(url, {
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
