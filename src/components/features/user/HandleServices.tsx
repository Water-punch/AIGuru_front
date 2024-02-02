import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const HandleServices = () => {
  const [selectMembership, setSelectMembership] = useState(null);
  const [userPaymentInfo, setUserPaymentInfo] = useState({ price: 0 });

  // 결제 정보에 따라 Basic 또는 Premium 멤버십을 결정
  const determineMembership = () => {
    return userPaymentInfo.price === 6990
      ? 'Basic membership'
      : 'Premium membership';
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-[20vh]">
      <div className="mb-10 username text-2xl font-bold">
        멤버십
      </div>
      <div>이용중인 서비스: {determineMembership()}</div>
      <Link href="/payment">
        <button>
          멤버십 변경
        </button>
      </Link>
    </div>
  );
};

export default HandleServices;
