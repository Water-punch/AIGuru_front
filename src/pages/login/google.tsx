import { useGoogleLogin } from '@/src/hooks/api/user';
import Link from 'next/link';
import { useEffect } from 'react';

const GoogleLoginPage = () => {
  // const googleLogin = useGoogleLogin()

  const handleLogin = async () => {
    // googleLogin.executeQuery();
    // console.log(googleLogin.data)
    try {
      location.href = 'http://localhost:5001/api/user/login/google'
    } catch (err) {
      console.log(err)
    }
  }
  
  // useEffect(() => {
  //   if (googleLogin.data) {
  //     const url = googleLogin.data.headers.Location;
  //     if (url) {
  //       window.location.href = url; 
  //     }
  //   }
  // }, [googleLogin.data]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <div className="my-20">
        간편하게 로그인하고 다양한 서비스를 사용해보세요!
      </div>

      <button className="flex items-center justify-center h-10 w-60 mb-2 rounded-md shadow bg-white text-center" onClick={handleLogin}>
        <img src="/images/google.png" className="h-full mr-2"></img>
        구글 계정으로 로그인
      </button>
      
      <Link href="/login">
        <div className="flex items-center justify-center  text-center">
          다른 방법으로 로그인
        </div>
      </Link>
    </div>
  );
};

export default GoogleLoginPage;
