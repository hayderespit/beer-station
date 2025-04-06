import React, { FC, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: FC<ContainerProps> = ({ children, className = '' }) => {
  return <div className={`mx-auto max-w-3xl sm:px-6 md:px-4 lg:px-8 ${className}`}>{children}</div>;
};

export default Container;
