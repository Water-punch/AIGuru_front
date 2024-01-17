import ConversationBox from '@/src/components/common/ConversationBox';
import { useEffect, useState } from 'react';
import AnswerLoadingPage from '../../components/features/chat/AnswerLoading';
import { useBaseMutation } from '@/src/hooks/api/reactQueryConfig';
import { useDispatch } from 'react-redux';
import { saveResult } from '@/src/store/chat';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import * as Api from '../../utils/api'
import { ChatResponseType } from '@/src/components/types/ChatTypes';
import { useSendFirstMessage } from '@/src/hooks/api/chat';

const gurusMessage =
  '그렇구만.. 대강 감이 오는구만. 어디 한 번 상세하게 고민을 읊어보게나.';

const AIcounselingPage = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [gptAnswer, setGptAnswer] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const firstMessage = useSendFirstMessage({question: userInput})
  console.log(firstMessage)

  const handleSubmit = async () => {
    firstMessage.mutate()
  }

  if(firstMessage.isPending) {
    setLoading(true)
  }

  if(firstMessage.isSuccess && firstMessage.data) {
    const apiRes = firstMessage.data;
    const history = apiRes.response;
    localStorage.setItem(`chat${history[0][0]}`, JSON.stringify(history));

    const answer = history[1][1] || '...(고민을 다시 입력해보자.)'
    console.log(history)
    console.log(history[1][1])
    dispatch(saveResult({ result : answer }))
    setLoading(false);
    router.push('/chat/result')
  }

  if(firstMessage.error) {
    console.error('api 호출 오류', firstMessage.error);
    setLoading(false);
    setGptAnswer('무언가 오류가 있는 모양이군? 다시 시도해보게.');
  }

  return (
    <div >
      {loading? (
        <AnswerLoadingPage/>
        ):(
        <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
          <div className="mt-20">
            <ConversationBox text={gurusMessage} />
          </div>
          <div className="flex flex-col gap-5 mt-10 form">
            <textarea
              className="min-h-[100px]"
              placeholder="고민을 입력하세요."
              onChange={e => setUserInput(e.target.value)}
            />

            <div className="flex flex-row">
              <input type="file" accept="image/*" placeholder="📎" />
              <button
                onClick={handleSubmit}
                className="max-w-10 border-2 border-[#0c0b0b] bg-[#efe8dfcc]"
              >
                전송
              </button>
            </div>
          </div>
          <img src="/images/guru.png" alt='guru' className="h-[300px] mt-20"></img>
        </div>
      )}
    </div> 
  );
};

export default AIcounselingPage;