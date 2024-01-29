import { login, logout } from "@/src/store/user"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLogout, useValidation } from "@/src/hooks/api/user"
import { RootState } from "@/src/store"

const MyPageButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false);
  const [text, setText] = useState('로그인')
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user.user)
  const validation = useValidation();
  const userLogout = useLogout();

  const handleValidation = () => {
    validation.executeQuery();
    console.log('validation 실행')
    setIsOpen(true)
    // if (validation.data) {
    //   dispatch(login({ user: validation.data?.data }));
    //   setIsLogin(true)
    // } 
  };

  const handleLogout = () => {
    setIsLogin(false)
    dispatch(logout())
    router.push('/')
  }

  const handleNavigate = (path: string) => {
    if (path === '/login') {
      router.push(path)
    } else if (path === '/mypage') {
      if (isLogin) {
        router.push(path)
      } else {
        alert('로그인이 필요합니다.')
      }
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (userState && userState.logintype !== '안함') {
      setIsLogin(true)
    }
    if (validation.data) {
      dispatch(login({ user: validation.data?.data }));
      setIsLogin(true)
    }
  }, [validation.data]);
  
  return (
    <div>
      <button onClick={handleValidation}>
        <img
            src="/images/user.png"
            className="rounded-full h-[30px] w-[30px]"
          />
      </button>
        {isOpen && (
          <div className="flex flex-col gap-2 h-15 w-25 border-2 border-black bg-white absolute z-10 right-0" onMouseLeave={() => setIsOpen(false)}>
            {!isLogin ? 
              (
                <button onClick={() => handleNavigate('/login')}>로그인</button>
              ) : (
                <button onClick={handleLogout}>로그아웃</button>
              )
            }
            <button onClick={() => handleNavigate('/mypage')}>마이페이지</button> 
          </div>
        )}  
    </div> 
  )
}

export default MyPageButton