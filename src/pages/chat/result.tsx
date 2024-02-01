import Link from 'next/link';
import ConversationBox from '@/src/components/common/ConversationBox';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import ChattingListBar from '@/src/components/features/layout/ChattingListBar';
import { useEffect, useState } from 'react';
import { ChatHistoryType, HistoryType } from '@/src/components/types/ChatTypes';
import { useRouter } from 'next/router';

const CounselingResult = () => {
  const [chatId, setChatId] = useState('')
  const [history, setHistory] = useState<HistoryType>([['',''],['','']])
  const userState = useSelector((state: RootState) => state.user.user)
  const router = useRouter()

  useEffect(() => {
    const historyJSON = localStorage.getItem(`firstMessage`)
    console.log(historyJSON)
    if (historyJSON) {
      setChatId(JSON.parse(historyJSON)[0][0])
      setHistory(JSON.parse(historyJSON));
    } 
  }, [])

  const handleNavigate = (path: string) => {
    if (path === '/chat') {
      router.push(path)
    }
    else {
      if (userState.logintype === '없음') {
        alert('로그인이 필요한 기능입니다.')
        router.push('/login');
      }
      else {
        router.push(path)
      }
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <ChattingListBar />
      <div className="mt-20">
        <ConversationBox text={history[1][1]} isGuru={true}/>
      </div>

      <div className="flex flex-col gap-2 mt-10 mb-10">
        <button className="min-w-12 h-6 border-2 border-white bg-white/50" onClick={() => handleNavigate(`/chat/${chatId}`)}>
          추가 질문하기
        </button>
        <button className="min-w-12 h-6 border-2 border-white bg-white/50" onClick={() => handleNavigate(`/board/write`)}>
          제자들에게 질문하기
        </button>
        <button className="min-w-12 h-6 border-2 border-white bg-white/50" onClick={() => handleNavigate(`/chat`)}>
          새 질문하기
        </button>
      </div>
      <img src="/images/guru.png" alt='guru' className="h-[300px] mt-20 fixed bottom-[50px]"></img>
    </div>
  );
};

export default CounselingResult;
