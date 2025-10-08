import React, { useEffect } from 'react';
import ExpenseCard from '@/components/shared/expense/ExpenseCard';
import { useExpenses } from '@/components/pages/app/hooks/useExpenses';
import Skeleton from 'react-loading-skeleton';
import { useUserState } from '@/context/useContext';
import ExpenseFilter from '@/components/pages/app/ui/ExpenseFilter';
import { ExpenseOwner } from '@/utils/interface/expenseInterface';
import { useInView } from 'react-intersection-observer';

function ExpenseSection({
  expenseOwner,
  setExpenseOwner,
}: {
  expenseOwner: string;
  setExpenseOwner: (value: string) => void;
}) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  console.log(inView);
  const {
    expenses,
    status,

    fetchNextPage,
    isFetchingNextPage,
    nextCursor,
    isEmptyList,
  } = useExpenses(expenseOwner);
  const { user, status: statusUser } = useUserState();

  useEffect(() => {
    if (inView && nextCursor !== null) {
      fetchNextPage();
    }
  }, [inView, status]);
  console.log({ expenses });

  return (
    <div className={'w-full flex flex-col gap-4'}>
      <div className="flex justify-between items-center">
        <h1 className={'text-2xl font-semibold text-neutral-900'}>
          Your Recent Expenses
        </h1>
        {statusUser === 'LOADING' ? (
          <Skeleton count={1} height={38} width={200} className={'my-4'} />
        ) : (
          <ExpenseFilter
            expenseOwner={expenseOwner}
            setExpenseOwner={setExpenseOwner}
            partner={user?.partner as ExpenseOwner}
            mainPartner={user?.mainPartner as ExpenseOwner}
          />
        )}
      </div>

      <div className={'flex flex-col gap-0'}>
        {status === 'pending' && (
          <Skeleton count={5} height={120} className={'my-4'} />
        )}

        {status === 'success' && !isEmptyList ? (
          expenses?.pages.map((data) => {
            return data.data.map((expense) => {
              return (
                <ExpenseCard
                  key={expense.id}
                  id={expense.id}
                  description={expense.description}
                  date={expense.createdAt}
                  owner={expense.ownerExpense.name}
                  amount={expense.amount}
                  category={expense.category.name}
                />
              );
            });
          })
        ) : (
          <p>Data Kosong</p>
        )}
        {isEmptyList ? null : isFetchingNextPage ? (
          <Skeleton count={5} height={120} className={'my-4'} />
        ) : nextCursor !== null ? (
          <button ref={ref} onClick={() => fetchNextPage()}>
            Load More
          </button>
        ) : (
          <p className={'text-xs text-neutral-700 text-center my-6'}>
            You reach the end of the list
          </p>
        )}
      </div>
    </div>
  );
}

export default ExpenseSection;
