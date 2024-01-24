import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";

// 자신이 작성한 게시글 목록 조회
export const useMyBoard = (page: number) => {
  return useBaseQuery(`/boards/my?page=${page}&limit=15`, 'myBoard') 
}

interface WriteBoardType {
  title: string;
  content: string;
  tag: string;
}

export const useWriteBoard = (bodyData: WriteBoardType) => {
  return useBaseMutation(`/boards`, 'post', bodyData)
}

// Base64 인코딩된 데이터를 ArrayBuffer로 변환하는 함수
const base64ToArrayBuffer = (base64: string) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// HTML 컨텐츠에서 이미지를 파싱하고 디코딩하는 함수
export const useParseAndDecodeImages =(content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const images = doc.querySelectorAll('img');
  const decodedImages: ArrayBuffer[] = [];

  images.forEach(img => {
      const base64Data = img.src.split(',')[1]; // src에서 Base64 데이터만 추출
      const arrayBuffer = base64ToArrayBuffer(base64Data);
      decodedImages.push(arrayBuffer);
  });

  return decodedImages;
}
