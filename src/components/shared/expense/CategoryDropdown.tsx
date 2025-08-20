import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserState } from '@/context/useContext';
import { getCategories } from '@/utils/api/getCategories';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface CategoryDropdownProps {
  selectedCategory: string;
  setCategory: (categoryId: string) => void;
}

export default function CategoryDropdown({
  selectedCategory,
  setCategory,
}: CategoryDropdownProps) {
  const { accessToken } = useUserState();

  function handleCategoryChange(value: string) {
    console.log(value);
    setCategory(value);
  }

  const { data: categoryList, isPending } = useQuery({
    queryKey: ['getCategories'],
    queryFn: () => getCategories(accessToken as string),
    enabled: !!accessToken,
  });

  if (isPending) {
    return <Skeleton height={44} width={'100%'} />;
  } else {
    return (
      <Select
        onValueChange={handleCategoryChange}
        defaultValue={selectedCategory}
      >
        <SelectTrigger className="w-full h-11">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categoryList &&
            categoryList.length > 0 &&
            categoryList.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    );
  }
}
