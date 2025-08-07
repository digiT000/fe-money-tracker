import React from 'react';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

interface ButtonProps {
  buttonVariant: 'btn-primary' | 'btn-secondary';
  text: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

function Button({
  buttonVariant,
  isDisabled,
  isLoading,
  text,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`btn ${buttonVariant} ${className}`}
    >
      {isLoading && <Spinner variant={'ellipsis'} height={20} width={20} />}
      {text}
    </button>
  );
}

export default Button;
