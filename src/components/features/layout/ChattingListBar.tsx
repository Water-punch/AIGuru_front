import { useEffect, useState } from "react";
import { ChatListType, HistoryType } from "../../types/ChatTypes";
import Link from "next/link";
import { motion } from 'framer-motion'

const ChattingListBar = () => {
  const [chatList, setChatList] = useState<ChatListType>([]);
  const [isOpen, setIsOpen] = useState(false)

  const loadChatList = () => {
    let newChatList = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key !== null && key.startsWith('chat')) {
        let valueJSON = localStorage.getItem(key);
        if (valueJSON) {
          let value: HistoryType = JSON.parse(valueJSON);
          newChatList.push({ chatId: String(value[0][0]), title: value[0][1] });
        }
      } 
    }
    return newChatList;
  };

  useEffect(() => {
    setChatList(loadChatList());  
  }, [localStorage.length])

  return (
    <div>
      {!isOpen? (
        <button className="fixed top-[1vh] left-[1vh] w-[7vh] h-[7vh] bg-[#ff607e] rounded-lg border-3 border-white flex justify-center items-center" onClick={() => setIsOpen(!isOpen)}>
        Chat History
        </button>
        ) : (
        <div className="fixed top-[1vh] left-[1vh] w-[18vh] h-[70%] bg-[#ff607e] flex flex-col gap-5 rounded-lg border-3 border-white overflow-y-auto" onClick={() => setIsOpen(!isOpen)}>
          
          <div className="flex justify-center mt-2 text-[#f0e9e9]">
            Chat History
          </div>

          <div className="flex flex-row">
            <div className="flex items-center">
              <Link href="/" className="flex">
                  <img
                    src="/images/guru.png"
                    className="rounded-full h-[33px] w-[36px]"
                  ></img>
              </Link>
              <div>홈</div>
            </div>
            <div className="flex items-center">
              <Link href="/chat">
                <img
                  src="/images/writing.png"
                  className="rounded-full h-[27px] w-[25px]"
                ></img>
              </Link>
              <div>새질문</div>
            </div>
          </div> 

          {chatList && chatList.map((chatInfo, idx) => (
            <div key={idx} className="my-1 mx-1 border-2 border-white">
              <Link href={`/chat/${chatInfo.chatId}`}>{chatInfo.title}</Link>
            </div>
          ))
          }
        </div>
        )
      }
      
    </div>
  );
};

export default ChattingListBar;
