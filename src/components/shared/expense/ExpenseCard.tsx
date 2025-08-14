import React from 'react';
import dayjs from 'dayjs';
import { toRupiah } from '@/utils/helper/toRupiah';

export interface ExpenseCardProps {
  id: string;
  category: string;
  owner: string;
  amount: number;
  date: string;
  description: string;
  bgCategory?: string;
}

function ExpenseCard({
  id,
  amount,
  date,
  owner,
  description,
  category,
  bgCategory,
}: ExpenseCardProps) {
  return (
    <div
      role={'button'}
      className={
        'py-4 px-2 flex items-center justify-between cursor-pointer hover:bg-neutral-300'
      }
    >
      <div className={'flex flex-col gap-2'}>
        <p className={'text-xs text-neutral-700 opacity-75'}>
          {dayjs(date).format('DD MMM, YYYY')}
        </p>
        <h3 className={'font-bold text-lg text-neutral-900'}>{category}</h3>
        <div
          className={
            'flex items-center gap-2 text-sm text-neutral-700 opacity-75'
          }
        >
          <div className={'flex items-center gap-3'}>
            <p>By {owner}</p>| <p>{description}</p>
          </div>
        </div>
      </div>
      <p className={'text-lg font-bold text-neutral-900'}>{toRupiah(amount)}</p>
    </div>
  );
}

export default ExpenseCard;
