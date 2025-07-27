import React from 'react';
import { Separator } from '@/components/ui/separator';

function Divider({ text }: { text?: string }) {
  return (
    <section className={'flex items-center justify-center gap-5'}>
      <Separator className={'w-full shrink-1'} />
      {text && (
        <>
          <p className={'sub-text min-w-fit'}>{text}</p>
          <Separator className={'w-full shrink-1'} />
        </>
      )}
    </section>
  );
}

export default Divider;
