import ConversationBox from '@/src/components/common/ConversationBox';
import { useEffect, useState } from 'react';
import AnswerLoadingPage from '../../components/features/chat/AnswerLoading';
import { useDispatch } from 'react-redux';
import { saveResult } from '@/src/store/chat';
import { useRouter } from 'next/router';
import { ChatResponseType } from '@/src/components/types/ChatTypes';
import { useSendFirstMessage, useTemporaryApi } from '@/src/hooks/api/chat';
import { scriptForInput } from '@/src/utils/const/scripts';

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
    const history = firstMessage.data.data.response;
    localStorage.setItem(`chat${history[0][0]}`, JSON.stringify(history));
    console.log(history)
    dispatch(saveResult({ response : history }))
    setLoading(false);
    router.push('/chat/result')
  }

  if(firstMessage.error) {
    console.error('api 호출 오류', firstMessage.error);
    setLoading(false);
    setGptAnswer('무언가 오류가 있는 모양이군? 다시 시도해보게.');
  }

  // const handleSubmit = () => {
  //   const firstMessage = useTemporaryApi({question: userInput})
  // }

  return (
    <div >
      {loading? (
        <AnswerLoadingPage/>
        ):(
        <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
          <div className="mt-20">
            <ConversationBox text={scriptForInput.text} isGuru={scriptForInput.isGuru} />
          </div>
          <img src="/images/guru.png" alt='guru' className="h-[300px] mt-20"></img>
          <div className="flex flex-row gap-1 mt-10 form fixed bottom-[100px]">
            <textarea
              className="border-2 border-[#0c0b0b] rounded-md min-w-[500px] min-h-[70px] bg-white/70"
              placeholder="고민을 입력하세요."
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
      )}
    </div> 
  );
};

export default AIcounselingPage;