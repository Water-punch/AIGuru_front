import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { saveInfo } from '@/src/store/payment';
import { PaymentType } from '@/src/components/types/PaymentTypes';
import { useRouter } from 'next/router';
import withAuth from '@/src/hocs/withAuth';

const PaymentPage = () => {
  const userId = useSelector((state: RootState) => state.user.user.userId);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (payment: PaymentType) => {
    dispatch(saveInfo({ info: payment }));
    router.push('/payment/checkout');
  };

  return (
    <div>
      PaymentPage
      <div className="flex flex-col gap-5">
        basic plan: 월 6990원 / 질문 횟수: 50건
        <button
          className="border-2 border-black"
          onClick={() =>
            handleClick({ membership: 'membership_product_1', price: 6990 })
          }
        >
          결제하기
        </button>
      </div>
      <div className="flex flex-col gap-5">
        premium plan: 월 14990원 / 질문 횟수: 무제한
        <button
          className="border-2 border-black"
          onClick={() =>
            handleClick({ membership: 'membership_product_2', price: 14990 })
          }
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default withAuth(PaymentPage);
