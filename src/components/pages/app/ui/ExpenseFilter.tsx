import React from 'react';
import ChipFilter from '@/components/shared/ChipFilter';
import { ExpenseOwner } from '@/utils/interface/expenseInterface';

interface ExpenseFilterProps {
  expenseOwner: string;
  setExpenseOwner: (value: string) => void;
  partner: ExpenseOwner;
  mainPartner: ExpenseOwner;
}

function ExpenseFilter({
  expenseOwner,
  setExpenseOwner,
  partner,
  mainPartner,
}: ExpenseFilterProps) {
  return (
    <div className={'rounded-2xl overflow-hidden border border-[#005B5E]'}>
      <ChipFilter
        name={'All'}
        isActive={expenseOwner === 'all'}
        id={'all'}
        onClick={setExpenseOwner}
      />
      <ChipFilter
        name={(mainPartner?.name as string) || ''}
        isActive={expenseOwner === (mainPartner?.id as string)}
        id={mainPartner?.id as string}
        onClick={setExpenseOwner}
      />
      <ChipFilter
        name={partner?.name as string}
        isActive={expenseOwner === (partner?.id as string)}
        id={partner?.id as string}
        onClick={setExpenseOwner}
      />
    </div>
  );
}

export default ExpenseFilter;
