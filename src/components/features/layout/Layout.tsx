import { useValidation } from '@/src/hooks/api/user';
import NavButtons from './NavButtons';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '@/src/store/user';

interface LayoutProps extends PropsWithChildren {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  console.log(router.pathname);
  const validation = useValidation();
  const dispatch = useDispatch();

  const privatePath = ['/mypage', `/board/${router.query.postId}`, '/chat/'];

  const IsPrivatePath = () => {};

  const checkLogin = () => {
    if (privatePath.includes(router.pathname)) {
      validation.executeQuery();
      const userState = validation.data?.data;
      dispatch(login({ user: userState }));
      if (validation.error) {
        console.log('로그인하지 않은 이용자');
        // alert('로그인이 필요한 기능입니다.')
        // router.push('/login')
      }
    }
  };

  useEffect(() => {
    checkLogin();
    // 1차 목표: 제한된 경로는 접속 자체를 막자 -> 포기, 그냥 체크하고 정보 저장만 하자.
  }, [router.pathname]);

  return (
    <>
      <NavButtons />
      {children}
    </>
  );
};

export default Layout;
