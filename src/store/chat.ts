import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../components/types/UserTypes';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ChatResultType } from '../components/types/ChatTypes';


const initialState: ChatResultType = {
  result: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    saveResult: (state, action: PayloadAction<ChatResultType>) => {
      state.result = action.payload.result;
    },
  },
});

export const { saveResult } = chatSlice.actions;
export default chatSlice.reducer;
