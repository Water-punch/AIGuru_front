// 상황문답 결과 타입
export interface TestResultType {
  classification: string;
  situation: string;
}

// Gpt로 Post요청 시 req.body에 넣을 데이터 타입
export interface SendingMessageType {
  question: string;
  testResult?: TestResultType;
  imageUrl?: string;
}

// Gpt로 Post요청 시 res.body에 담길 데이터 타입
// 백엔드 history 배열의 구조는?
export interface RecievedMessageType {
  chatId: string;
  input: string;
  output: string;
}

export interface ChatResultType {
  result: string;
}

// 프론트의 Chat History를 위한 데이터 타입
export interface ChatHistoryType {}

