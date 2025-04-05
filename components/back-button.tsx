'use client';
import { CaretCircleLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className="text-primary px-2">
      <CaretCircleLeft size={32} weight="fill" />
    </button>
  );
};

export default BackButton;
