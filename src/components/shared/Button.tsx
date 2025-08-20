import React from 'react';
import Link, { LinkProps } from 'next/link';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

type CommonProps = {
  buttonVariant: 'btn-primary' | 'btn-secondary';
  text: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

type ButtonAsLink = CommonProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof LinkProps> &
  LinkProps;

type ButtonAsButton = CommonProps & React.ComponentPropsWithoutRef<'button'>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Button(props: ButtonProps) {
  const commonClassName = `${props.buttonVariant} ${props.className ?? ''}`;
  const content = (
    <>
      {props.isLoading && (
        <Spinner variant={'ellipsis'} height={20} width={20} />
      )}
      {props.text}
    </>
  );

  // Check if it's a link (i.e., 'href' is a prop)
  if ('href' in props) {
    // 1. Destructure props INSIDE the 'if' block.
    // `props` is now correctly typed as `ButtonAsLink`.
    const {
      buttonVariant,
      text,
      isDisabled,
      isLoading,
      className,
      ...linkProps // `linkProps` now ONLY contains valid Link/Anchor attributes.
    } = props;

    return (
      <Link
        {...linkProps}
        className={commonClassName}
        aria-disabled={isDisabled || isLoading}
        onClick={(e) => {
          if (isDisabled || isLoading) {
            e.preventDefault();
          }
          // The original onClick is now correctly typed, no cast needed.
          if (props.onClick) {
            props.onClick(e);
          }
        }}
      >
        {content}
      </Link>
    );
  }

  // 2. Destructure props INSIDE the 'else' block.
  // `props` is now correctly typed as `ButtonAsButton`.
  const {
    buttonVariant,
    text,
    isDisabled,
    isLoading,
    className,
    ...buttonProps // `buttonProps` now ONLY contains valid button attributes.
  } = props;

  return (
    <button
      {...buttonProps}
      disabled={isDisabled || isLoading}
      className={`btn-base-style ${commonClassName}`}
    >
      {content}
    </button>
  );
}

export default Button;
