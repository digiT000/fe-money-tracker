import axios from '@/lib/axios';
import { ExpenseResponseAPI } from '@/utils/interface/expenseInterface';

export async function getExpenses(
  token: string,
  selectedOwner: string,
  nextCursor: string = '',
  take: number = 10
): Promise<{ data: ExpenseResponseAPI[]; nextCursor: string | null }> {
  if (!token) {
    return {
      data: [],
      nextCursor: '',
    };
  }

  let url = `/expenses?cursor=${nextCursor}&take=${take}`;

  if (selectedOwner !== 'all') {
    url = `${url}&ownerId=${selectedOwner}`;
  }

  try {
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const expensesData: ExpenseResponseAPI[] = response.data.expense.data;
    const updateCursor: string | null = response?.data?.expense?.nextCursor;

    return {
      data: expensesData,
      nextCursor: updateCursor,
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      nextCursor: '',
    };
  }
}
