import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { saveResult } from '@/src/store/chat';
import { RootState } from '@/src/store';
import { useRouter } from 'next/router';
import ConversationBoxes from '@/src/components/features/chat/ConversationBoxes';
import { HistoryType } from '@/src/components/types/ChatTypes';
import { useEffect, useState } from 'react';
import ChattingListBar from '@/src/components/features/layout/ChattingListBar';
import axios from 'axios';
import AdditionalLoading from '@/src/components/features/chat/AdditionalAnswerLoading';

const ExtraChatPage = () => {
  // const history = useSelector((state: RootState) => state.chat.response)
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  const chatId = router.query.chatId

  console.log(`chat${chatId}`)
  const [history, setHistory] = useState<HistoryType>([[0,''],[['','']]])

  // 서버사이드 렌더링 환경에서 localStorage에 접근 못함, 클라이언트 사이드에서 실행하도록
  useEffect(() => {
    const historyJSON = localStorage.getItem(`chat${chatId}`)
    if (historyJSON) {
      setHistory(JSON.parse(historyJSON));
    } 
  }, [chatId])

  useEffect(() => {
    localStorage.setItem(`chat${history[0][0]}`, JSON.stringify(history));
  }, [history]);

  const handleSubmit = async () => {
    const serverUrl = 'http://localhost:5000';
    try {
        setLoading(true);
        const response = await axios.post(`${serverUrl}/chat/${chatId}`, {
            question: userInput,
            history: history
        });
        setHistory(response.data.response)
        console.log(history)
        dispatch(saveResult({ response : history }))
        setLoading(false);
        setUserInput('');
    } catch (error) {
        console.error('api 호출 오류', error);
        setLoading(false);
        setUserInput('');
    }
}

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <ChattingListBar />
      <div className='mx-[20vh] flex flex-col items-center'>
        <div className="mt-20 max-h-[70vh] overflow-y-auto">
          <ConversationBoxes response={history}/>
        </div>

        <div className='flex flex-row fixed bottom-[50px] form'>
          {loading ? (<AdditionalLoading/>) : (<img src="/images/guru.png" alt='guru' className="h-[15vh]" />)

          }
               
          <textarea
            className="border-2 border-[#0c0b0b] rounded-md w-[50vw] max-w-[700px] min-h-[70px] bg-white/70"
            placeholder="고민을 입력하세요."
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />

          <div className="flex flex-col gap-1 justify-center">
            <label htmlFor='file-upload' className='border-2 border-[#0c0b0b] bg-white rounded-md flex justify-center'> 📎 </label>
            <input id="file-upload" className='hidden' type="file" accept="image/*" placeholder="📎" />
            <button
              onClick={handleSubmit}
              className="max-w-10 border-2 border-[#0c0b0b] bg-white rounded-md"
            >
              🔺
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraChatPage;
