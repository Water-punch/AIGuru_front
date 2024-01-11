import ConversationBox from '@/src/components/common/ConversationBox';

const gurusMessage = '오오 영감이 떠오른다!';

const AnswerLoadingPage = () => {
  return (
    <div>
      <div className="mt-20">
        <ConversationBox text={gurusMessage} />
      </div>

      {/* 애니메이션 */}
    </div>
  );
};

export default AnswerLoadingPage;
