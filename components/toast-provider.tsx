'use client';
import React, { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { ProgressProvider } from '@bprogress/next/app';

type Props = {
  children: React.ReactNode;
};

const ToastProvider: FC<Props> = ({ children }) => {
  return (
    <ProgressProvider
      height="4px"
      color="var(--color-primary)"
      options={{ showSpinner: false }}
      shallowRouting>
      {children}
      <Toaster />
    </ProgressProvider>
  );
};

export default ToastProvider;
