import Link from 'next/link';
import ConversationBox from '@/src/components/common/ConversationBox';
import ChattingListBar from '@/src/components/features/layout/ChattingListBar';
import { scriptForQnA } from '@/src/utils/const/scripts';

const AIsurveyPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <ChattingListBar />
      <div className='mx-[20vh] flex flex-col items-center'>
        <div className="mt-20">
          <ConversationBox text={scriptForQnA.text} isGuru={scriptForQnA.isGuru}/>
        </div>

        <div className="flex flex-row justify-center gap-20 mt-10 mb-10">
          <div className="min-w-12 h-6 border-2 border-white rounded-md">◀이전</div>
          <Link href="/chat/input">
            <div className="min-w-12 h-6 border-2 border-white rounded-md">다음▶</div>
          </Link>
        </div>
        <img src="/images/guru.png" alt='guru' className="h-[300px] mt-20 fixed bottom-[50px]"></img>
      </div>
    </div>
  );
};

export default AIsurveyPage;
