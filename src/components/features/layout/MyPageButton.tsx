import { setAccessToken } from "@/src/store/token"
import { logout } from "@/src/store/user"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/src/store"

const MyPageButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const userState = useSelector((state: RootState) => state.user.user);

  // if (userState.userId) {
  //   setIsLogin(true)
  // }

  const handleLogout = () => {
    setIsLogin(!isLogin)
    dispatch(logout())
    dispatch(setAccessToken(null))
  }
  
  return (
    <div onClick={()=> setIsOpen(!isOpen)}>
      <img
          src="/images/user.png"
          className="rounded-full h-[30px] w-[30px]"
        />
      {!isOpen ? (
        <div></div>
        ) : (
          <div>
            <div className="flex flex-col gap-2">
              {isLogin ? (
                <div>
                  <button onClick={handleLogout}>
                    로그아웃
                  </button>
                  <Link href="/mypage">마이페이지</Link>
                </div>
              ) : (
                <Link href="/login">로그인</Link>
              )}
              
            </div>

          </div>
        ) }
    </div>
  )
}

export default MyPageButton