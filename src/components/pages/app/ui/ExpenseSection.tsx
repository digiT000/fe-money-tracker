import React from 'react';
import ExpenseCard from '@/components/shared/expense/ExpenseCard';
import { useExpenses } from '@/components/pages/app/hooks/useExpenses';
import Skeleton from 'react-loading-skeleton';
import ChipFilter from '@/components/shared/ChipFilter';
import { useUserState } from '@/context/useContext';
import ExpenseFilter from '@/components/pages/app/ui/ExpenseFilter';
import { ExpenseOwner } from '@/utils/interface/expenseInterface';

function ExpenseSection() {
  const { expenses, status, setExpenseOwner, expenseOwner } = useExpenses();
  const { user, status: statusUser } = useUserState();

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
        {status === 'success' &&
          expenses.map((expense) => {
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
          })}
      </div>
    </div>
  );
}

export default ExpenseSection;
