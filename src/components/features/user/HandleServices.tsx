import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const HandleServices = () => {
  const [selectMembership, setSelectMembership] = useState(null);
  const [userPaymentInfo, setUserPaymentInfo] = useState({ price: 0 });

  useEffect(() => {
    // 여기에 결제 정보를 받아오는 API 호출 또는 로직을 추가하세요.
    // 가격 정보를 userPaymentInfo로 업데이트합니다.
    // 예를 들어, fetchPaymentInfo() 라는 함수를 호출하여 정보를 가져오는 경우:
    // fetchPaymentInfo().then((info) => setUserPaymentInfo(info));
  }, []); // 마운트 될 때 한 번만 호출되도록 설정

  // 결제 정보에 따라 Basic 또는 Premium 멤버십을 결정
  const determineMembership = () => {
    return userPaymentInfo.price === 6990
      ? 'Basic membership'
      : 'Premium membership';
  };

  return (
    <div className="flex flex-col items-center">
      <div>이용중인 서비스: {determineMembership()}</div>
      <Link href="/payment">멤버십 변경</Link>
    </div>
  );
};

export default HandleServices;
