'use client';
import Button from '@/components/button';
import { Wallet } from '@phosphor-icons/react';
import React, { FC } from 'react';
import { payOrder } from '../actions';
import Toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Props = {
  orderId: string;
};

const ProceedPaymentBtn: FC<Props> = ({ orderId }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    setLoading(true);
    const { ok, message } = await payOrder(orderId);
    setLoading(false);
    if (ok) {
      Toast.success(message as string);
      router.back();
    } else {
      Toast.error(message as string);
    }
  };

  return (
    <Button size="large" onClick={handlePayment} loading={loading}>
      <Wallet size={20} weight="bold" />
      Proceed payment
    </Button>
  );
};

export default ProceedPaymentBtn;
