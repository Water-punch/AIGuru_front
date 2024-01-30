import { useEffect, useState } from "react";
import ConversationBox from "../../common/ConversationBox";
import { ChatHistoryType, ChatResponseType } from "../../types/ChatTypes";

const ConversationBoxes = ({ response } : ChatResponseType) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayedChats, setDisplayedChats] = useState<ChatHistoryType[]>([]);

  useEffect(() => {
    if(response && Array.isArray(response[1]) && currentIdx < response[1].length) {
      const timer = setTimeout(() => {
        setDisplayedChats(chats => [...chats, response[1][currentIdx]]);
        setCurrentIdx(idx => idx + 1);
      }, 500)

      return () => clearTimeout(timer);
    }
  }, [currentIdx, response])

  if(!response || !Array.isArray(response[1])) {
    return (
      <div>
        <ConversationBox text={'대화 내역이 없다네..'} isGuru={true}/>
      </div>
    )
  }
  const chatHistory = response[1]

  return (
    <div>
      {displayedChats.map((chat, idx) => (
        <div key={idx}>
          <div className="my-5 flex-1 justify-start">
            <ConversationBox text={chat[0]} isGuru={false} />
          </div>
          <div className="my-5 flex-1 justify-end">
            <ConversationBox text={chat[1]} isGuru={true} />
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default ConversationBoxes;