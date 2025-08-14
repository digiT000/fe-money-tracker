import { useUserState } from '@/context/useContext';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/utils/api/getExpenses';
import { ExpenseResponseAPI } from '@/utils/interface/expenseInterface';
import { useState } from 'react';

export function useExpenses() {
  const [expenseOwner, setExpenseOwner] = useState('all');

  const { accessToken } = useUserState();

  const { data, status } = useQuery({
    queryKey: ['expenses', expenseOwner],
    queryFn: () => getExpenses(accessToken as string, expenseOwner),
    retry: 1,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
  });
  const expenses = data?.expense?.data as ExpenseResponseAPI[];
  const nextCursor = data?.expense?.nextCursor as string;

  return { expenses, nextCursor, status, setExpenseOwner, expenseOwner };
}
