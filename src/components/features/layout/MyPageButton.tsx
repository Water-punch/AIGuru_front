import { login, logout } from '@/src/store/user';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLogout, useValidation } from '@/src/hooks/api/user';
import { RootState } from '@/src/store';
import withAuth from '@/src/hocs/withAuth';

const MyPageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.user);
  const userLogout = useLogout();

  const handleLogout = async () => { 
    userLogout.executeQuery()
  }

  const handleNavigate = (path: string) => {
    if (path === '/login') {
      router.push(path);
    } else if (path === '/mypage') {
      if (isLogin) {
        router.push(path);
      } else {
        alert('로그인이 필요합니다.');
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    // 로그아웃 성공 시에만 `isLogin` 상태를 false로 설정
    if (userLogout.data) {
      console.log('로그아웃 성공');
      setIsLogin(false);
    } else {
      // 로그아웃 데이터가 없으면 `userState`를 기반으로 `isLogin` 상태를 업데이트
      setIsLogin(userState.userId !== '0');
    }
  }, [userState, userLogout.data]);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <img
          src="/images/user.png"
          className="rounded-full h-[30px] w-[30px]"
        />
      </button>
      {isOpen && (
        <div
          className="flex flex-col gap-2 h-15 w-25 border-2 border-black bg-white absolute z-10 right-0"
          onMouseLeave={() => setIsOpen(false)}
        >
          { !isLogin && (
            <button onClick={() => handleNavigate('/login')}>로그인</button>
          )}
          { isLogin &&
          (
            <div className="flex flex-col gap-2">
              <button onClick={handleLogout}>로그아웃</button>
              <button onClick={() => handleNavigate('/mypage')}>마이페이지</button>
            </div>
          )
          }
          
        </div>
      )}
    </div>
  );
};

export default withAuth(MyPageButton);
