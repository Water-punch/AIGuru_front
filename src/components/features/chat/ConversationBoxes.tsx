import { useEffect, useState } from "react";
import ConversationBox from "../../common/ConversationBox";
import { ChatHistoryType, ChatLogType, ChatResponseType } from "../../types/ChatTypes";

const ConversationBoxes = ({ cursor, history } : ChatLogType) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayedChats, setDisplayedChats] = useState<ChatHistoryType>([]);

  useEffect(() => {
    if(history && currentIdx < history.length) {
      const timer = setTimeout(() => {
        setDisplayedChats(prev => { 
          const newChats = [...prev]
          newChats.push(history[currentIdx])
          return newChats
        });
        console.log(displayedChats)
        setCurrentIdx(idx => idx + 1);
      }, 500)

      return () => clearTimeout(timer);
    }
  }, [currentIdx, history])

  if(!history) {
    return (
      <div>
        <ConversationBox text={'대화 내역이 없다네..'} isGuru={true}/>
      </div>
    )
  }

  return (
    <div>
      {displayedChats.map((chat, idx) => (
        <div key={idx}>
          <div className="my-5 flex-1 justify-start">
            <ConversationBox text={chat} isGuru={false} />
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