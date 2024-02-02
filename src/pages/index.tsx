import Link from 'next/link';
import ConversationBox from '../components/common/ConversationBox';
import { scriptForMain } from '../utils/const/scripts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { useFirstLoginMessage } from '@/src/hooks/api/chat';
import { ChatHistoryType, HistoryType } from '@/src/components/types/ChatTypes';

const HomePage = () => {
  const userState = useSelector((state: RootState) => state.user.user);
  const [chatId, setChatId] = useState('')
  const [history, setHistory] = useState<HistoryType>([['',''],['','']])
  const makeChatLog = useFirstLoginMessage()

  useEffect(() => {
    if(userState.userId !== '0') {
      const historyJSON = localStorage.getItem(`firstMessage`)
      if (historyJSON) {
        setHistory(JSON.parse(historyJSON));
        setChatId(JSON.parse(historyJSON)[0][0])
      } 
    } 
  }, [])

  useEffect(() => {
    if (chatId === 'GUEST' && userState.userId !== '0') {
      makeChatLog.mutateAsync({
        title: history[0][1],
        history: history[1]
      })
    }
  }, [chatId, history])


  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <img src="/images/title.png" className="title-resizing mt-4"></img>
      <img src="/images/guru.png" className="quarter-size mt-4"></img>

      <div>
        <ConversationBox text={scriptForMain.text} isGuru={scriptForMain.isGuru}/>
      </div>

      <div className="flex flex-row gap-20 mt-10">
        <Link href="/chat">
          <div className="min-w-12 h-6 border-2 border-white bg-[#b91c1c] rounded-md">
            👉구루에게 상담받기
          </div>
        </Link>
      </div>

      <div className="flex flex-row gap-20 mt-10 mb-12">
        <Link href="/login">
          <div className="min-w-12 h-6 border-2 border-white bg-white/50 rounded-md">
            SNS 간편로그인
          </div>
        </Link>
        <Link href="/board">
          <div className="min-w-12 h-6 border-2 border-white bg-white/50 rounded-md">
            구루의 제자들
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;