// 로그인 요청 시 req.body에 보낼 데이터
export interface LoginRequestType {
  email: string;
  password: string; //탈취가능성 ... 해쉬화?
}

// 로그인 성공 시 res.body에 받아올 데이터
export interface UserDataType {
  userId: string;
  userInfo: UserInfoType;
}

export interface UserInfoType {
  email: string;
  login_type: string;
  membership: MembershipType;
}

export interface MembershipType {
  // non-member, trail, basic, premium
  usingService: string;
  remainChances: number;
}

// login_type으로 넘어오는 string값?
// export enum LoginType {
//     google = 'google',
//     kakao = 'kakao',
//     email = 'email-certified'
// }
