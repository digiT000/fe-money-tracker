'use client';
import React, { useState } from 'react';

import ExpenseSection from '@/components/pages/app/ui/ExpenseSection';
import ModalExpense from '@/components/shared/modal/ModalExpense';

function MainContentSection() {
  const [expenseOwner, setExpenseOwner] = useState('all');

  return (
    <section className={'flex gap-10 max-w-7xl mx-auto'}>
      {/*  EXPENSE CONTAINER*/}
      <ExpenseSection
        expenseOwner={expenseOwner}
        setExpenseOwner={setExpenseOwner}
      />
      <div
        className={
          'w-full max-w-md min-h-full border-l border-l-neutral-300 pl-6'
        }
      >
        <div>
          <ModalExpense expenseOwner={expenseOwner} />
          {/*<Button buttonVariant={'btn-primary'} text={'Add New Expense'} />*/}
        </div>
      </div>
    </section>
  );
}

export default MainContentSection;
