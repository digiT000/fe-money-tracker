import React from 'react';
import dayjs from 'dayjs';

export interface ExpenseCardProps {
  id: string;
  category: string;
  owner: string;
  amount: number;
  date: string;
  description: string;
}

function ExpenseCard(expenseData: ExpenseCardProps) {
  return (
    <div
      role={'button'}
      className={
        'py-4 px-2 flex items-center justify-between cursor-pointer hover:bg-neutral-300'
      }
    >
      <div className={'flex flex-col gap-2'}>
        <p className={'text-sm text-neutral-700 opacity-75'}>
          {dayjs(expenseData.date).format('DD MMM, YYYY')}
        </p>
        <h3 className={'font-bold text-lg text-neutral-900'}>
          {expenseData.category}
        </h3>
        <div
          className={
            'flex items-center gap-2 text-sm text-neutral-700 opacity-75'
          }
        >
          {expenseData.owner} | {expenseData.description}
        </div>
      </div>
      <p className={'text-xl font-bold text-neutral-900'}>
        {expenseData.amount}
      </p>
    </div>
  );
}

export default ExpenseCard;
