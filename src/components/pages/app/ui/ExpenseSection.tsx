import React from 'react';
import ExpenseCard, {
  ExpenseCardProps,
} from '@/components/shared/expense/ExpenseCard';
import { useExpenses } from '@/components/pages/app/hooks/useExpenses';
import Skeleton from 'react-loading-skeleton';

const dummyExpenses: ExpenseCardProps[] = [
  {
    id: '321312',
    category: 'Food & Dining',
    owner: 'Farel',
    amount: 125000,
    date: '2025-08-06',
    description: 'Lunch at Sushi Tei',
  },
  {
    id: '321112',
    category: 'Transportation',
    owner: 'Munyuu',
    amount: 50000,
    date: '2025-08-05',
    description: 'Grab to office',
  },
  {
    id: '100999',
    category: 'Coffee',
    owner: 'Farel',
    amount: 35000,
    date: '2025-08-04',
    description: 'Starbucks morning coffee',
  },
  {
    id: '999011',
    category: 'Parking',
    owner: 'Munyuu',
    amount: 10000,
    date: '2025-08-03',
    description: 'Mall parking fee',
  },
  {
    id: '8843241',
    category: 'Fuel',
    owner: 'Farel',
    amount: 200000,
    date: '2025-08-03',
    description: 'Pertamax full tank',
  },
  {
    id: '331391313',
    category: 'Food & Dining',
    owner: 'Munyuu',
    amount: 85000,
    date: '2025-08-02',
    description: 'Dinner with family',
  },
  {
    id: '29929191',
    category: 'Coffee',
    owner: 'Farel',
    amount: 25000,
    date: '2025-08-01',
    description: 'Kopi Kenangan',
  },
  {
    id: '33131231',
    category: 'Transportation',
    owner: 'Munyuu',
    amount: 40000,
    date: '2025-07-31',
    description: 'Bus to client meeting',
  },
  {
    id: '932831831',
    category: 'Fuel',
    owner: 'Farel',
    amount: 150000,
    date: '2025-07-30',
    description: 'Motorbike fuel',
  },
  {
    id: '5523421',
    category: 'Parking',
    owner: 'Munyuu',
    amount: 8000,
    date: '2025-07-29',
    description: 'Office building parking',
  },
];

function ExpenseSection() {
  const { expenses, status } = useExpenses();

  return (
    <div className={'w-full flex flex-col gap-4'}>
      <h1 className={'text-2xl font-bold text-neutral-900'}>
        Your Recent Expenses
      </h1>
      <div className={'flex flex-col gap-0'}>
        {status === 'pending' && (
          <Skeleton count={5} height={120} className={'my-4'} />
        )}
        {status === 'success' &&
          expenses.map((expense) => (
            <ExpenseCard key={expense.id} {...expense} />
          ))}
      </div>
    </div>
  );
}

export default ExpenseSection;
