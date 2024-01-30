import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';

const generateRandomString = () =>
  window.btoa(Math.random().toString()).slice(2, 22);

const widgetClientKey = 'test_ck_AQ92ymxN3426QgPMdwNgrajRKXvd';
const customerKey = '423zeEuA-0xZogRkzaGol';
// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

export function CheckoutPage() {
  //const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const agreementWidgetRef = useRef(null);
  const [price, setPrice] = useState(1000);
  const [paymentWidget, setPaymentWidget] = useState(null);

  //페이지 처음 로드시 Payment Widget 불러오고 상태에 설정. 
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  //결제수단 선택, 약관동의 위쳇 렌더링
  //paymentMethodsWidgetRef.current에 결제 수단 선택 위젯의 참조를 저장
  export function CheckoutPage() {
    const [paymentWidget, setPaymentWidget] = useState(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(50_000);
  
    useEffect(() => {
      const fetchPaymentWidget = async () => {
        try {
          const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
          setPaymentWidget(loadedWidget);
        } catch (error) {
          console.error("Error fetching payment widget:", error);
        }
      };
  
      fetchPaymentWidget();
    }, []);
  
    useEffect(() => {
      if (paymentWidget == null) {
        return;
      }
  
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: price },
        { variantKey: "DEFAULT" }
      );
  
      paymentWidget.renderAgreement(
        "#agreement", 
        { variantKey: "AGREEMENT" }
      );
  
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, [paymentWidget, price]);
  
    useEffect(() => {
      const paymentMethodsWidget = paymentMethodsWidgetRef.current;
  
      if (paymentMethodsWidget == null) {
        return;
      }
  
      paymentMethodsWidget.updateAmount(price);
    }, [price]);
  
    const handlePaymentRequest = async () => {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      try {
        await paymentWidget?.requestPayment({
          orderId: nanoid(),
          orderName: "토스 티셔츠 외 2건",
          customerName: "김토스",
          customerEmail: "customer123@gmail.com",
          customerMobilePhone: "01012341234",
          successUrl: `${window.location.origin}/success`,
          failUrl: `${window.location.origin}/fail`,
          _skipAuth: "FORCE_SUCCESS",
        });
      } catch (error) {
        console.error("Error requesting payment:", error);
      }
    };
  
    return (
      <div>
        {/* 할인 쿠폰 */}
        <label htmlFor="coupon-box">
          <input
            id="coupon-box"
            type="checkbox"
            onChange={(event) => {
              setPrice(event.target.checked ? price - 5_000 : price + 5_000);
            }}
          />
          <span>5,000원 쿠폰 적용</span>
        </label>
        {/* 결제 UI, 이용약관 UI 영역 */}
        <div id="payment-widget" />
        <div id="agreement" />
        {/* 결제하기 버튼 */}
        <button onClick={handlePaymentRequest}>결제하기</button>
      </div>
    );
  }