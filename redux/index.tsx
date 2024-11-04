import { configureStore } from '@reduxjs/toolkit';
import authReduce from '@/redux/authSlice'

export const store = configureStore({
  reducer: {
    authUser: authReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
