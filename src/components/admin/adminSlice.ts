import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface QuestionState {
  value: Array<string> | null;
  status: "idle" | "loading" | "failed";
}

const initialState: QuestionState = {
  value: !!localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions")!)
    : [],
  status: "idle",
};

export const QuestionSlice = createSlice({
  name: "Question",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addQuestion: (state, action: PayloadAction<string>) => {
      state.value = state.value
        ? [...state.value, action.payload]
        : state.value;
      localStorage.setItem("questions", JSON.stringify(state.value));
    },
  },
});

export const { addQuestion } = QuestionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Answer.value)`
export const selectQuestion = (state: RootState) => state.questions.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default QuestionSlice.reducer;
