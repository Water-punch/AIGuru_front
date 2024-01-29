import ConversationBox from "../../common/ConversationBox";
import { ChatResponseType } from "../../types/ChatTypes";

const ConversationBoxes = ({ response } : ChatResponseType) => {
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
      {chatHistory.map((chat, idx) => (
        <div key={idx}>
          <div className="my-2">
            <ConversationBox text={chat[0]} isGuru={false} />
          </div>
          <div className="my-2">
            <ConversationBox text={chat[1]} isGuru={true} />
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default ConversationBoxes;