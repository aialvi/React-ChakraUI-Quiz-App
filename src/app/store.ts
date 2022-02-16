import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../components/user/userSlice";
import adminReducer from "../components/admin/adminSlice";

export const store = configureStore({
  reducer: {
    answers: userReducer,
    questions: adminReducer,
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
