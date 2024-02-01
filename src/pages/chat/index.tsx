import ChattingListBar from '@/src/components/features/layout/ChattingListBar';
import { useState } from 'react';
import SurveyBox from '@/src/components/features/chat/SurveyBox';

const AIsurveyPage = () => {

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-home.jpg')]">
      <ChattingListBar />
      <div className='mx-[20vh] flex flex-col items-center'>
        <div className="mt-20">
          <SurveyBox />
        </div>

        {/* <div className="flex flex-row justify-center gap-20 mt-10 mb-10">
          <button className="min-w-14 h-7 border-2 border-white rounded-md bg-white/50">◀이전</button>
          <button className="min-w-14 h-7 border-2 border-white rounded-md bg-white/50">다음▶</button>
        </div> */}
        <img src="/images/guru.png" alt='guru' className="h-[300px] mt-20 fixed bottom-[50px]"></img>
      </div>
    </div>
  );
};

export default AIsurveyPage;
