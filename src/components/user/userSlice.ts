import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AnswerState {
  value: Array<string>;
  status: "idle" | "loading" | "failed";
}

const initialState: AnswerState = {
  value: [],
  status: "idle",
};

export const AnswerSlice = createSlice({
  name: "Answer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    giveAnswer: (state, action: PayloadAction<string>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { giveAnswer } = AnswerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Answer.value)`
export const selectAnswer = (state: RootState) => state.answers.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default AnswerSlice.reducer;
