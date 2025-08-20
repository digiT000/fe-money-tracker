import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CategoryDropdown from '../expense/CategoryDropdown';

interface ExpenseData {
  totalExpense: number;
  categoryId: string;
  description: string;
  ownerId: string;
}

function ModalExpense() {
  const [expenseInfo, setExpenseInfo] = useState<ExpenseData>({
    categoryId: '',
    description: '',
    totalExpense: 0,
    ownerId: '',
  });

  function handleChangeData(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    setExpenseInfo({
      ...expenseInfo,
      [name]: value,
    });
  }

  function handleSetCategory(categoryId: string) {
    setExpenseInfo({
      ...expenseInfo,
      categoryId,
    });
  }

  return (
    <Dialog>
      <DialogTrigger className={'btn-primary'}>Add New Expense</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>💰 Add a New Expense</DialogTitle>
          <DialogDescription>
            Keep your spending organized by adding every expense here. Fill in
            the details like category, amount, and date to track it
            effortlessly.
          </DialogDescription>
          <div className={'flex flex-col gap-4 mt-5'}>
            <div className={'flex flex-col gap-2 '}>
              <Label>Amount</Label>
              <Input
                name={'totalExpense'}
                placeholder={'Enter amount'}
                type={'number'}
                onChange={handleChangeData}
              />
            </div>
            <div className={'flex flex-col gap-2 '}>
              <Label>Category</Label>
              <CategoryDropdown
                setCategory={handleSetCategory}
                selectedCategory={expenseInfo.categoryId}
              />
            </div>
            <div className={'flex flex-col gap-2 '}>
              <Label>Add Notes</Label>
              <Input
                name={'description'}
                placeholder={'Ex : Buy Fried Chicken'}
                type={'text'}
                onChange={handleChangeData}
              />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalExpense;
