import Link from 'next/link';
import ConversationBox from '@/src/components/common/ConversationBox';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';

const CounselingResult = () => {
  const gurusMessage = useSelector((state: RootState) => state.chat.result)

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <div className="mt-20">
        <ConversationBox text={gurusMessage} />
      </div>

      <div className="flex flex-col gap-2 mt-10 mb-10">
        <Link href="/chat/input">
          <div className="min-w-12 h-6 border-2 border-white bg-white/50">
            추가 질문하기
          </div>
        </Link>
        <Link href="/board/write">
          <div className="min-w-12 h-6 border-2 border-white bg-white/50">
            제자들에게 질문하기
          </div>
        </Link>
        <Link href="/chat">
          <div className="min-w-12 h-6 border-2 border-white bg-white/50">
            새 질문하기
          </div>
        </Link>
      </div>
      <img src="/images/guru.png" className="quarter-size mt-4 "></img>
    </div>
  );
};

export default CounselingResult;
