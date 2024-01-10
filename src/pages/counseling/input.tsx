import Link from "next/link"
import ConversationBox from "@/src/components/common/ConversationBox"
import axios from "axios"
import { useState } from "react"
import AnswerLoadingPage from "./loading"

const gurusMessage = '그렇구만.. 대강 감이 오는구만. 어디 한 번 상세하게 고민을 읊어보게나.'
const serverUrl = 'http://localhost:5000';
let resultMode = false;

const AIcounselingPage = () => {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [gptAnswer, setGptAnswer] = useState('')

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${serverUrl}/conversation`, {
                question: userInput
            });

            const answer = response.data.response;
            setGptAnswer(answer);
            setLoading(false);
            resultMode = true;
        } catch (error) {
            console.error('Error during API call', error);
            setLoading(false);
            setGptAnswer('무언가 오류가 있는 모양이군? 다시 시도해보게.')
        }
    }

    const handleMode = () => {
        resultMode = false;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]" >
            {loading ? (
                // 로딩 페이지 표시
                <AnswerLoadingPage /> 
            ) : resultMode ? (
                // 결과 페이지 표시
                <div>
                    <div className="mt-20">
                        <ConversationBox text={gptAnswer}/>
                    </div>
                    <div className="flex flex-col gap-2 mt-10 mb-10">
                        <Link href='/counseling/input'>
                            <div className="min-w-12 h-6 border-2 border-white bg-white/50" onClick={handleMode}>추가 질문하기</div>
                        </Link>
                        <Link href='/board/write'>
                            <div className="min-w-12 h-6 border-2 border-white bg-white/50">제자들에게 질문하기</div>
                        </Link>
                        <Link href='/counseling'>
                            <div className="min-w-12 h-6 border-2 border-white bg-white/50" onClick={handleMode}>새 질문하기</div>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mt-20">
                        <ConversationBox text={gurusMessage}/>
                    </div>
                    <div className="flex flex-col gap-5 mt-10 form">
                        <textarea className="min-h-[100px]"  placeholder="고민을 입력하세요." onChange={(e) => setUserInput(e.target.value)} />
                        
                        <div className="flex flex-row">
                            <input type='file' accept='image/*' placeholder="📎" />
                            <button onClick={handleSubmit} className="max-w-10 border-2 border-[#0c0b0b] bg-[#efe8dfcc]">전송</button>
                        </div>
                    </div>
                </div>
            )}

            <img src="/images/guru.png" className="quarter-size mt-4 "></img>
        </div>
    )
}

export default AIcounselingPage

//배고파
//후.. 여자친구랑 헤어져서 너무 힘들다. 다시 그녀를 되찾고 싶어. 어떻게 하면 그녀의 마음을 돌릴 수 있을까? 참고로 내가 바람을 폈어.