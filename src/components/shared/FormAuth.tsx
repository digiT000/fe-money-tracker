'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/shared/Button';
import UseFormAuth from '@/hooks/useFormAuth';
import { Alert, AlertTitle } from '@/components/ui/alert';

interface FormProps {
  page: 'login' | 'register';
}

function FormAuth({ page }: FormProps) {
  const { formData, handleChange, handleAction, error, isLoading } =
    UseFormAuth(page);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className={' flex flex-col gap-10 w-full'}>
      <div className={'flex flex-col gap-6'}>
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <div className={'flex flex-col gap-2 '}>
          <Label>Email</Label>
          <Input
            name={'email'}
            placeholder={'Enter your email'}
            value={formData.email}
            type={'email'}
            onChange={handleChange}
          />
        </div>
        <div className={'flex flex-col gap-2 '}>
          <Label>Password</Label>
          <div className={'relative'}>
            <Input
              name={'password'}
              placeholder={'Enter your password'}
              value={formData.password}
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className={
                'absolute rounded-full top-1 right-3 border-none bg-transparent p-2 cursor-pointer hover:bg-neutral-300'
              }
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>
      </div>
      <Button
        onClick={handleAction}
        text={page === 'register' ? 'Register' : 'Login'}
        isLoading={isLoading}
        isDisabled={false}
        buttonVariant={'btn-primary'}
        className={'w-full md:w-fit'}
      />
    </section>
  );
}

export default FormAuth;
