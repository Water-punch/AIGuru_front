import ConversationBox from '@/src/components/common/ConversationBox';

const gurusMessage = '오오 영감이 떠오른다!';

const AnswerLoadingPage = () => {
  return (
    <div>
      <div className="mt-20">
        <ConversationBox text={gurusMessage} />
      </div>

      {/* 애니메이션 */}

      <img src="/images/guru.png" className="quarter-size mt-4 "></img>
    </div>
  );
};

export default AnswerLoadingPage;
