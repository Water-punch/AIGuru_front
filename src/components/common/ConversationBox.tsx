interface ConversationBoxProps {
  text: string;
}

const ConversationBox = ({ text }: ConversationBoxProps) => {
  return (
    <div className="max-w-300">
      <div>
        <div className="mb-5">
          <div className="w-20 h-8 border-2 border-white flex justify-center items-center bg-white/50">
            AI 구루
          </div>
        </div>

        <div>
          <div className="w-200 min-h-16 border-2 border-white flex justify-center items-center bg-white/50">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
