import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../components/types/UserTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: UserDataType = {
  userId: '',
  userInfo: {
    email: '',
    login_type: '',
    membership: {
      usingService: 'non-member',
      remainChances: 0,
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserDataType>) => {
      state.userId = action.payload.userId;
      state.userInfo = action.payload.userInfo;
    },
    logout: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
