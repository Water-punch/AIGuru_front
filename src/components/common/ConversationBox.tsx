import { useEffect, useState } from "react";
import { ConversationBoxType } from "../types/ChatTypes";

const ConversationBox = ({ text, isGuru }: ConversationBoxType) => {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const typingDelay = 50;
  let person = '';
  if (isGuru) person = 'AI 구루'
  else person = '나'

  useEffect(() => {
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }
      if (index === text.length) {
        clearInterval(timer);
      }
    }, typingDelay);

    return () => clearInterval(timer);
  }, [index, text]);

  return (
    <div className="max-w-3/4">
      <div>
        <div className="mb-5">
          <div className="w-20 h-8 border-2 border-white flex justify-center items-center bg-white/50 rounded-md">
            {person}
          </div>
        </div>

        <div>
          <div className="max-w-[600px] min-h-16 border-2 border-white flex justify-center items-center bg-white/50 break-words rounded-md">
            {typedText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
