import axios from '@/lib/axios';

interface CategoriesResponse {
  id: string;
  name: string;
  budget: number;
}

export async function getCategories(
  token: string
): Promise<CategoriesResponse[] | []> {
  if (!token) {
    return [];
  }

  try {
    const response = await axios.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}
