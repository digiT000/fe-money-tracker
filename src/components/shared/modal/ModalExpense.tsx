import React, { useEffect, useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserState } from '@/context/useContext';
import Button from '../Button';
import { postNewExpense } from '@/utils/api/postNewExpense';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export interface ExpenseData {
  totalExpense: number;
  categoryId: string;
  description: string;
  ownerId: string;
}

function ModalExpense() {
  const queryClient = useQueryClient();
  const { user, status, accessToken } = useUserState();
  const [open, setOpen] = useState<boolean>(false);
  const [expenseInfo, setExpenseInfo] = useState<ExpenseData>({
    categoryId: '',
    description: '',
    totalExpense: 0,
    ownerId: '',
  });

  function handleChangeData(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    let finalValue: string | number;

    if (name === 'totalExpense') {
      finalValue = Number(value);
    } else {
      finalValue = value;
    }

    setExpenseInfo({
      ...expenseInfo,
      [name]: finalValue,
    });
  }

  function handleSetCategory(categoryId: string) {
    setExpenseInfo({
      ...expenseInfo,
      categoryId,
    });
  }
  function handleSetOwner(ownerId: string) {
    setExpenseInfo({
      ...expenseInfo,
      ownerId,
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (newExpense: ExpenseData) =>
      postNewExpense(newExpense, accessToken as string),
    onSuccess: (newCreatedExpense) => {
      console.log(newCreatedExpense.data);
      if (Object.keys(newCreatedExpense).length !== 0) {
        queryClient.setQueryData(['expenses'], (oldData: any) => {
          // If the cache is empty, create a new array with the new expense
          if (!oldData) {
            console.log(oldData);

            return [newCreatedExpense];
          }
          // Otherwise, add the new expense to the end of the existing array
          console.log(oldData);
          return [...oldData, newCreatedExpense.data];
        });
      }

      // Reset form and close modal
      setExpenseInfo({
        categoryId: '',
        description: '',
        ownerId: user?.mainPartner.id || '',
        totalExpense: 0,
      });
      setOpen(false);
    },
    onError: (error) => {
      // Handle the error, e.g., show a toast notification
      console.error('Failed to add expense:', error);
    },
  });

  async function handleAddExpense() {
    if (
      !expenseInfo.categoryId ||
      !expenseInfo.description ||
      !expenseInfo.totalExpense
    ) {
      return;
    }
    mutate(expenseInfo);
  }

  useEffect(() => {
    if (user && user.mainPartner.id) {
      setExpenseInfo({
        ...expenseInfo,
        ownerId: user.mainPartner.id as string,
      });
    }
  }, [user?.mainPartner.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                value={expenseInfo.totalExpense.toString()}
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
                value={expenseInfo.description}
              />
            </div>
            <div className={'flex flex-col gap-2 '}>
              <Label>Whos Expense is this?</Label>
              {status === 'SUCCESS' && (
                <RadioGroup
                  defaultValue={user?.mainPartner.id}
                  className="flex"
                  onValueChange={handleSetOwner}
                  value={expenseInfo.ownerId}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={user?.mainPartner.id as string}
                      id={user?.mainPartner.id as string}
                    />
                    <Label htmlFor={user?.mainPartner.id as string}>
                      {user?.mainPartner.name}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={user?.partner.id as string}
                      id={user?.partner.id as string}
                    />
                    <Label htmlFor={user?.partner.id as string}>
                      {user?.partner.name}
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </div>
            <Button
              buttonVariant="btn-primary"
              text="Add Expense"
              onClick={handleAddExpense}
              isLoading={isPending}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalExpense;
