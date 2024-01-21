import Link from 'next/link';

const KakaoLoginPage = () => {

  const REST_API_KEY = '88fc59891f43aaa04117bd6762a9f864';
  const REDIRECT_URI = '';
  const link = ``

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <div className="my-20">
        간편하게 로그인하고 다양한 서비스를 사용해보세요!
      </div>

      <Link href="/login/google">
        <div className="flex items-center justify-center h-10 w-60 mb-2 rounded-md shadow bg-yellow-500 text-center">
          <img src="/images/kakao.png" className="h-full mr-2"></img>
          카카오 계정으로 로그인
        </div>
      </Link>
      
      <Link href="/login">
        <div className="flex items-center justify-center  text-center">
          다른 방법으로 시작하기
        </div>
      </Link>
    </div>
  );
};

export default KakaoLoginPage;
