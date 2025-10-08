import { useUserState } from '@/context/useContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/utils/api/getExpenses';
import { useMemo, useState } from 'react';

export function useExpenses(expenseOwner: string) {
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
    refetchOnMount: true,
    enabled: !!accessToken,
    retry: 1,
  });

  const nextCursor = useMemo(() => {
    if (!expenses) {
      return null;
    }

    return expenses.pages[expenses.pages.length - 1].nextCursor || null;
  }, [expenses]);

  const isEmptyList = useMemo(() => {
    return expenses?.pages[0].data.length === 0;
  }, [expenses]);

  return {
    expenses,
    status,
    expenseOwner,
    fetchNextPage,
    isFetchingNextPage,
    nextCursor,
    isEmptyList,
  };
}
