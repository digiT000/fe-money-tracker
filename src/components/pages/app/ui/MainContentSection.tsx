'use client';
import React from 'react';

import ExpenseSection from '@/components/pages/app/ui/ExpenseSection';

function MainContentSection() {
  return (
    <section className={'flex gap-10 max-w-7xl mx-auto'}>
      {/*  EXPENSE CONTAINER*/}
      <ExpenseSection />
      <div className={'w-full max-w-md'}></div>
    </section>
  );
}

export default MainContentSection;
