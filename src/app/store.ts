import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../components/user/userSlice";

export const store = configureStore({
  reducer: {
    answers: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
