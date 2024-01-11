import Link from 'next/link';
import ConversationBox from '@/src/components/common/ConversationBox';

const gurusMessage =
  '잠깐, 내 이따 자네가 얘기할 시간을 충분히 줄테니 간단하게 질문 좀 합세.';

const AIsurveyPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">

      <div className="mt-20">
        <ConversationBox text={gurusMessage} />
      </div>

      <div className="flex flex-row gap-20 mt-10 mb-10">
        <div className="min-w-12 h-6 border-2 border-[#f87171]">◀이전</div>
        <Link href="/counseling/input">
          <div className="min-w-12 h-6 border-2 border-[#f87171]">다음▶</div>
        </Link>
      </div>

      <img src="/images/guru.png" className="quarter-size mt-4 "></img>
    </div>
  );
};

export default AIsurveyPage;
