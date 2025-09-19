import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

function ModalSuccesRegister({
  email,
  isOpen,
  setOpenSuccessRegister,
}: {
  email: string;
  isOpen: boolean;
  setOpenSuccessRegister: (value: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpenSuccessRegister}>
      <DialogContent>
        <DialogTitle>🎉 Registration Successful!</DialogTitle>
        <DialogDescription>
          We’ve sent a confirmation link to your email {email || ''}. <br />
          Please verify to activate your account.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default ModalSuccesRegister;
