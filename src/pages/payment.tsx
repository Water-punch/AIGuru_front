// import React, { useEffect, useRef, useState } from "react";
// import { useValidation } from "../hooks/api/user";
// import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
// import { nanoid } from "nanoid";

// const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'

// const PaymentPage = () => {
//   const [paymentWidget, setPaymentWidget] = useState(null);
//   const paymentMethodsWidgetRef = useRef(null);
//   const [price, setPrice] = useState(6990)
//   const validation = useValidation()
//   validation.executeQuery()
//   const [customerKey, setCustomerKey] = useState('')

//   useEffect(() => {
//     if (validation.data) {
//       setCustomerKey(validation.data?.data?.userId)
//     }
//   }, [validation.data])

//   useEffect(() => {
//     const fetchPaymentWidget = async () => {
//       try {
//         const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
//         setPaymentWidget(loadedWidget);
//       } catch (error) {
//         console.error("Error fetching payment widget:", error);
//       }
//     };

//     fetchPaymentWidget();
//   }, []);

//   useEffect(() => {
//     if (paymentWidget == null) {
//       return;
//     }

//     const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
//       "#payment-widget",
//       { value: price },
//       { variantKey: "DEFAULT" }
//     );

//     paymentWidget.renderAgreement(
//       "#agreement", 
//       { variantKey: "AGREEMENT" }
//     );

//     paymentMethodsWidgetRef.current = paymentMethodsWidget;
//   }, [paymentWidget, price]);

//   useEffect(() => {
//     const paymentMethodsWidget = paymentMethodsWidgetRef.current;

//     if (paymentMethodsWidget == null) {
//       return;
//     }

//     paymentMethodsWidget.updateAmount(price);
//   }, [price]);

//   const handlePaymentRequest = async () => {
//     // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
//     // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
//     try {
//       await paymentWidget?.requestPayment({
//         orderId: nanoid(),
//         orderName: "토스 티셔츠 외 2건",
//         customerName: "김토스",
//         customerEmail: "customer123@gmail.com",
//         customerMobilePhone: "01012341234",
//         successUrl: `${window.location.origin}/success`,
//         failUrl: `${window.location.origin}/fail`,
//         _skipAuth: "FORCE_SUCCESS",
//       });
//     } catch (error) {
//       console.error("Error requesting payment:", error);
//     }
//   };

// return (
//   <div>PaymentPage
//     <div>
//       basic plan: 월 6990원 / 질문 횟수: 50건
//       <button className="border-2 border-black">결제하기</button>
//     </div>
//     <div>
//       premium plan: 월 14990원 / 질문 횟수: 무제한
//       <button className="border-2 border-black">결제하기</button>
//     </div>
//   </div>)
// };

// export default PaymentPage;
