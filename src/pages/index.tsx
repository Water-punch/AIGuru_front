import Link from 'next/link';
import ConversationBox from '../components/common/ConversationBox';

const firstMessage = '연애에 대한 고민이 있는자 나에게로..';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <img src="/images/title.png" className="title-resizing mt-4"></img>
      <img src="/images/guru.png" className="quarter-size mt-4"></img>

      <div>
        <ConversationBox text={firstMessage} />
      </div>

      <div className="flex flex-row gap-20 mt-10">
        <Link href="/chat">
          <div className="min-w-12 h-6 border-2 border-white bg-[#b91c1c]">
            👉구루에게 상담받기
          </div>
        </Link>
      </div>

      <div className="flex flex-row gap-20 mt-10 mb-12">
        <Link href="/login">
          <div className="min-w-12 h-6 border-2 border-white bg-white/50">
            SNS 간편로그인
          </div>
        </Link>
        <Link href="/board">
          <div className="min-w-12 h-6 border-2 border-white bg-white/50">
            구루의 제자들
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;