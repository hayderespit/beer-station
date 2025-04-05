import React, { FC, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: FC<ContainerProps> = ({ children, className = '' }) => {
  return <div className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
};

export default Container;
