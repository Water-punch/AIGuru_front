import ConversationBox from '@/src/components/common/ConversationBox';

const gurusMessage = '오오 영감이 떠오른다!';

const AnswerLoadingPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
        <ConversationBox text={gurusMessage} />
      </div>

      {/* 애니메이션 */}
    </div>
  );
};

export default AnswerLoadingPage;
