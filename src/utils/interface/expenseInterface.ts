interface ExpenseCategory {
  id: string;
  name: string;
}

export interface ExpenseOwner {
  id: string;
  name: string;
}

export interface ExpenseResponseAPI {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string; // ISO date string
  ownerExpense: ExpenseOwner;
}
