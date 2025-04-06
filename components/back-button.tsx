'use client';
import { FC } from 'react';
import { CaretCircleLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

type BackButtonProps = {
  className?: string;
};

const BackButton: FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={`text-primary cursor-pointer px-2 ${className || ''}`}
      aria-label="Back">
      <CaretCircleLeft size={32} weight="fill" />
    </button>
  );
};

export default BackButton;
