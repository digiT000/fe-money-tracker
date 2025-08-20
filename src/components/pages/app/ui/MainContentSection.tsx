'use client';
import React from 'react';

import ExpenseSection from '@/components/pages/app/ui/ExpenseSection';
import Button from '@/components/shared/Button';
import ModalExpense from '@/components/shared/modal/ModalExpense';

function MainContentSection() {
  return (
    <section className={'flex gap-10 max-w-7xl mx-auto'}>
      {/*  EXPENSE CONTAINER*/}
      <ExpenseSection />
      <div
        className={
          'w-full max-w-md min-h-full border-l border-l-neutral-300 pl-6'
        }
      >
        <div>
          <ModalExpense />
          {/*<Button buttonVariant={'btn-primary'} text={'Add New Expense'} />*/}
        </div>
      </div>
    </section>
  );
}

export default MainContentSection;
