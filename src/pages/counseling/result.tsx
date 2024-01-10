import Link from "next/link"
import ConversationBox from "@/src/components/common/ConversationBox"

const gurusMessage = 'gpt에게 질문을 보내고 받아온 결과'

const CounselingResult = () => {

    return (
        <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
            <div className="mt-20">
                <ConversationBox text={gurusMessage}/>
            </div>
            
            <div className="flex flex-col gap-2 mt-10 mb-10">
                <Link href='/counseling/input'>
                    <div className="min-w-12 h-6 border-2 border-white bg-white/50">추가 질문하기</div>
                </Link>
                <Link href='/board/write'>
                    <div className="min-w-12 h-6 border-2 border-white bg-white/50">제자들에게 질문하기</div>
                </Link>
                <Link href='/counseling'>
                    <div className="min-w-12 h-6 border-2 border-white bg-white/50">새 질문하기</div>
                </Link>
            </div>
        </div>
        
    )
}

export default CounselingResult