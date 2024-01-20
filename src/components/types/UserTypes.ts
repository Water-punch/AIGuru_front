export interface RegisterRequestType {
  logintype: string;
  email: string;
  password: string; 
}

// 로그인 요청 시 req.body에 보낼 데이터
export interface LoginRequestType {
  email: string;
  password: string; 
}

export interface LoginResponseType {
  user: UserDataType;
}

// 로그인 성공 시 res.body에 받아올 데이터
export interface UserDataType {
  userId: string;
  logintype: string;
  mebership?: MembershipType;
}

export interface MembershipType {
  // non-member, trail, basic, premium
  userId: string;
  start_at: Date;
  end_at: Date;
  usingService: string;
  remainChances: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
