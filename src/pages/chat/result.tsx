import Link from 'next/link';
import ConversationBox from '@/src/components/common/ConversationBox';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import ChattingListBar from '@/src/components/features/layout/ChattingListBar';

const CounselingResult = () => {
  const history = useSelector((state: RootState) => state.chat.response)
  const chatId = history[0][0]
  const scriptForResult = { 
    text: history[1][history[1].length - 1][1] || '...(고민을 다시 입력해보자.)', 
    isGuru: true 
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <ChattingListBar />
      <div className="mt-20">
        <ConversationBox text={scriptForResult.text} isGuru={scriptForResult.isGuru}/>
      </div>

      <div className="flex flex-col gap-2 mt-10 mb-10">
        <Link href={`/chat/${chatId}`}>
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
      <img src="/images/guru.png" alt='guru' className="h-[300px] mt-20 fixed bottom-[50px]"></img>
    </div>
  );
};

export default CounselingResult;
