import React from 'react';
import { useRouter } from 'next/router';

const SelectMembership = () => {
  const router = useRouter();

  // 토스 페이먼츠 결제 페이지로 이동하는 함수
  const handlePayment = async membershipType => {
    const paymentUrl = `/payment/${membershipType}`;

    // 페이지 이동
    router.push(paymentUrl);
  };

  return (
    <div className="mt-24 text-3xl">
      <h2 className="mb-4">멤버십을 선택하세요</h2>

      <div className="flex gap-4">
        <div className="flex-1 border-2 border-stone-500 p-4">
          <div className="mb-4">
            <button
              onClick={() => handlePayment('basic')}
              className="text-white bg-blue-500 px-4 py-2 rounded"
            >
              Basic membership
            </button>
          </div>
          <div className="text-lg">가격</div>
          <div className="text-xl font-bold">6,990원</div>
          <div className="text-lg">제공되는 크레딧</div>
          <div className="text-xl font-bold">10개</div>
        </div>

        <div className="flex-1 border-2 border-stone-500 p-4">
          <div className="mb-4">
            <button
              onClick={() => handlePayment('premium')}
              className="text-white bg-green-500 px-4 py-2 rounded"
            >
              Premium membership
            </button>
          </div>
          <div className="text-lg">가격</div>
          <div className="text-xl font-bold">12,990원</div>
          <div className="text-lg">제공되는 크레딧</div>
          <div className="text-xl font-bold">30개</div>
        </div>
      </div>
    </div>
  );
};

export default SelectMembership;
