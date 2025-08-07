import { useUserState } from '@/context/useContext';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/utils/api/getExpenses';
import { ExpenseCardProps } from '@/components/shared/expense/ExpenseCard';

export function useExpenses() {
  const { accessToken } = useUserState();

  const { data, status } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getExpenses(accessToken as string),
    retry: 1,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
  });
  const expenses = data?.expense?.data as ExpenseCardProps[];
  const nextCursor = data?.expense?.nextCursor as string;

  return { expenses, nextCursor, status };
}
