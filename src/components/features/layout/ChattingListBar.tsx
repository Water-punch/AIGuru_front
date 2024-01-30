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
        <button className="fixed top-[2vh] left-[2vh] w-[7vh] h-[7vh] bg-[#ff607e] hover:bg-[#f33c5e] rounded-full border-2 border-red-700 flex justify-center items-center drop-shadow-2xl" onClick={() => setIsOpen(!isOpen)}>
        Chat History
        </button>
        ) : (
        <div className="fixed top-[1vh] left-[1vh] w-[18vh] h-[70%] bg-[#ff607e] flex flex-col gap-5 rounded-lg border-4 border-white/70 overflow-y-auto drop-shadow-2xl" onClick={() => setIsOpen(!isOpen)}>
          
          <div className="flex justify-center mt-2 text-[#f0e9e9]">
            Chat History
          </div>

          <div className="flex flex-col ml-5 gap-3">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                  <img
                    src="/images/guru.png"
                    className="rounded-full h-[33px] w-[36px]"
                  ></img>
                  홈
              </Link> 
            </div>
            <div className="flex items-center gap-2">
              <Link href="/chat" className="flex items-center">
                <img
                  src="/images/writing.png"
                  className="rounded-full h-[27px] w-[25px]"
                ></img>
                새질문
              </Link>
            </div>
          </div> 

          {chatList && chatList.map((chatInfo, idx) => (
            <div 
            key={idx} 
            className="p-1 my-1 mx-1 border-2 border-white/70 rounded-lg"
            >
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
