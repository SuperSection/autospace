'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormLogin } from '@autospace/forms/src/login';
import { signIn } from '@autospace/network/src/auth';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import { Form } from '../atoms/Form';

export interface LoginFormProps {
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin();

  const { replace } = useRouter();

  console.log('LoginForm errors', errors);

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        console.log('data', data);
        const { email, password } = data;
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          replace('/');
        }

        if (result?.error) {
          alert('Login failed. Try again');
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput {...register('email')} placeholder="example@email.com" />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          {...register('password')}
          placeholder="••••••••"
        />
      </HtmlLabel>
      <Button type="submit">Submit</Button>
      <div className="mt-4 text-sm">
        Do not have an autospace account?
        <br />
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>
      </div>
    </Form>
  );
};
