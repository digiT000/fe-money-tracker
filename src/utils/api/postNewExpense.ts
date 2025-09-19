import { ExpenseData } from '@/components/shared/modal/ModalExpense';
import axios from '@/lib/axios';

export async function postNewExpense(expense: ExpenseData, token: string) {
  if (!token) {
    return {};
  }
  try {
    const response = await axios.post('/expenses', expense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}
