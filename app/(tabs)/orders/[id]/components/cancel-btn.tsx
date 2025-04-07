'use client';
import Button from '@/components/button';
import React, { FC } from 'react';
import { cancelOrder } from '../actions';
import Toast from 'react-hot-toast';

type Props = {
  orderId: string;
};

const CancelBtn: FC<Props> = ({ orderId }) => {
  const handleCancel = async () => {
    const { ok, message } = await cancelOrder(orderId);
    if (ok) {
      Toast.success(message as string);
    } else {
      Toast.error(message as string);
    }
  };

  return (
    <Button outlined onClick={handleCancel}>
      Cancel
    </Button>
  );
};

export default CancelBtn;
