import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import chatReducer from './chat'
import tokenReducer from './token'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
