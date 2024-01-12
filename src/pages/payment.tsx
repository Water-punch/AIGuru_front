// import * as PortOne from "@portone/browser-sdk/v2";

// //아임포트 홈페이지
// function requestPayment() {
//   PortOne.requestPayment({
//     // 고객사 storeId로 변경해주세요.
//     storeId: "store-639c669e-363b-4d34-9f79-6513a1a88668",
//     paymentId: `payment-${crypto.randomUUID()}`,
//     orderName: "나이키 와플 트레이너 2 SD",
//     totalAmount: 1000,
//     currency: "CURRENCY_KRW",
//     pgProvider: "PG_PROVIDER_TOSSPAYMENTS",
//     payMethod: "CARD",
//   });
// }

//유튜브
// const IMP = window.IMP;
// IMP.init("imp42001346");

// const onClickPayment = async () => {
//   IMP.request_pay({
//     pg: "kakaopay",
//     pay_method: "card", // 결제수단
//     merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
//     amount: 12000, // 결제금액
//     name: "Basic Subscribe ", // 주문명
//   });
// };

// {
//   /* <button onClick={onClickPayment}>Pay now!!!!!!</button>; */
// }

//블로그
// const onClickPayment = () => {
//   if (!window.IMP) return;
//   /* 1. 가맹점 식별하기 */
//   const { IMP } = window;
//   IMP.init("imp42001346"); // 가맹점 식별코드

//   /* 2. 결제 데이터 정의하기 */
//   const data: RequestPayParams = {
//     pg: "html5_inicis", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
//     pay_method: "card", // 결제수단
//     merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
//     amount: 1000, // 결제금액
//     name: "아임포트 결제 데이터 분석", // 주문명
//     buyer_name: "홍길동", // 구매자 이름
//     buyer_tel: "01012341234", // 구매자 전화번호
//     buyer_email: "example@example.com", // 구매자 이메일
//     buyer_addr: "신사동 661-16", // 구매자 주소
//     buyer_postcode: "06018", // 구매자 우편번호
//   };

//   /* 4. 결제 창 호출하기 */
//   IMP.request_pay(data, callback);
// };

// /* 3. 콜백 함수 정의하기 */
// function callback(response: RequestPayResponse) {
//   const { success, error_msg } = response;

//   if (success) {
//     alert("결제 성공");
//   } else {
//     alert(`결제 실패: ${error_msg}`);
//   }
// }

// return <button onClick={onClickPayment}>결제하기</button>;

// export default PaymentPage;
