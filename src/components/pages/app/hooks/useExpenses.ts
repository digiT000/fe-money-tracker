import { useUserState } from '@/context/useContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/utils/api/getExpenses';
import { useMemo, useState } from 'react';

export function useExpenses() {
  const [expenseOwner, setExpenseOwner] = useState('all');

  const { accessToken } = useUserState();

  const {
    data: expenses,
    status,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['expenses', expenseOwner],
    queryFn: (pageParam) =>
      getExpenses(accessToken as string, expenseOwner, pageParam.pageParam),
    initialPageParam: '',
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
    retry: 1,
  });

  const nextCursor = useMemo(() => {
    if (!expenses) {
      return null;
    }

    return expenses.pages[expenses.pages.length - 1].nextCursor || null;
  }, [expenses]);

  return {
    expenses,
    status,
    setExpenseOwner,
    expenseOwner,
    fetchNextPage,
    isFetchingNextPage,
    nextCursor,
  };
}
