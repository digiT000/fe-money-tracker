import React from 'react';

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
      disabled={isDisabled}
      className={`btn ${buttonVariant} ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
