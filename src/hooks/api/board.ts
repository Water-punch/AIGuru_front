import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";
import * as Api from '../../utils/api'

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
const parseAndDecodeImages = async (content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const images = doc.querySelectorAll('img');
  const decodedImages: ArrayBuffer[] = [];

  images.forEach(img => {
      const base64Data = img.src.split(',')[1]; // src에서 Base64 데이터만 추출
      const arrayBuffer = base64ToArrayBuffer(base64Data);
      decodedImages.push(arrayBuffer);
  });

  const filenames = [];
  for(let i=0; i<decodedImages.length; i++) {
    filenames[i] = `'${i}'`
  }

  return { decodedImages, filenames };
}

// presigned-url 요청 함수
const getPreUrl = async (bodyData: string[]) => {
  try {
    const response = await Api.put('/boards/images', { files: bodyData } )
    return response.data
  } catch (err) {
    console.log('presigned url 요청 실패:', err)
  }
}

// 클라 --> S3 전송함수
const putImageToS3 = async (urls: string[], bodyData: ArrayBuffer[]) => {
  const imgUrls: string[] = [];
  try {
    await Promise.all(urls.map(async (url, idx) => {
        const response = await Api.put(url, bodyData[idx])
        const imgUrl = response.request.responseURL.split('?')[0] 
        console.log(response) // 응답값의 형식을 확인하고 올바른 이미지 url을 파싱해야함
        console.log('imgUrl:', imgUrl)
        imgUrls.push(imgUrl)
      }))
    }
  catch (err) {
    console.log('S3 이미지 전송 오류:',err)
  }
  console.log('imgUrls:', imgUrls)
  return imgUrls
}

export const useHandleImage = () => {
  const parse = parseAndDecodeImages;
  const getUrl = getPreUrl;
  const imgToS3 = putImageToS3;

  return { parse, getUrl, imgToS3 }
}

