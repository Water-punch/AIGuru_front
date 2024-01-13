import ConversationBox from '@/src/components/common/ConversationBox';
import { useEffect, useState } from 'react';
import AnswerLoadingPage from '../../components/features/chat/AnswerLoading';
import { useBaseMutation } from '@/src/hooks/api/reactQueryConfig';
import { useDispatch } from 'react-redux';
import { saveResult } from '@/src/store/chat';
import axios from 'axios';
import { useRouter } from 'next/router';

const gurusMessage =
  '그렇구만.. 대강 감이 오는구만. 어디 한 번 상세하게 고민을 읊어보게나.';

const AIcounselingPage = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [gptAnswer, setGptAnswer] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();


  // 커스텀 훅을 사용했을 때 렌더링 오류가 발생합니다. 일단 해결을 못해서 임시로 axios를 생으로 사용했습니다...
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const serverUrl = 'http://localhost:5000';
      const response = await axios.post(`${serverUrl}/chat/first`, {
        question: userInput,
      });

      const history = response.data.response;
      localStorage.setItem(`chat${history[0][0]}`, history);

      const answer = history[1][1]
      console.log(history)
      console.log(history[1][1])
      dispatch(saveResult({ result : answer }))
      setLoading(false);
      router.push('/chat/result')

    } catch (error) {
      console.error('api 호출 오류', error);
      setLoading(false);
      setGptAnswer('무언가 오류가 있는 모양이군? 다시 시도해보게.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      {loading? (
        <AnswerLoadingPage/>
        ):(
        <div>
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
        </div>
      )}
      <img src="/images/guru.png" className="quarter-size mt-4 "></img>
    </div> 
  );
};

export default AIcounselingPage;