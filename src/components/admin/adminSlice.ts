import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AdminStates {
  value: Array<any>;
  selectedQuestionId: number;
  userList: Array<any>;
}

export interface Question {
  id: number;
  question: string;
}

const initialState: AdminStates = {
  value: !!localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions")!)
    : [],
  selectedQuestionId: 0,
  userList: JSON.parse(localStorage.getItem("users")!) || [],
};

export const QuestionSlice = createSlice({
  name: "Question",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addQuestion: (state, action: PayloadAction<string>) => {
      let tempObject = {
        id: state.value.length + 1,
        question: action.payload,
      };
      state.value = [...state.value, tempObject];

      localStorage.setItem("questions", JSON.stringify(state.value));
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const index = state.value.findIndex(
        (question) => question.id === action.payload.id
      );
      state.value[index] = action.payload;
      localStorage.setItem("questions", JSON.stringify(state.value));
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(
        (question) => question.id !== action.payload
      );
      localStorage.setItem("questions", JSON.stringify(state.value));
    },
    assignQuestionId: (state, action: PayloadAction<number>) => {
      state.selectedQuestionId = action.payload;
    },
  },
});

export const { addQuestion, updateQuestion, deleteQuestion, assignQuestionId } =
  QuestionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Answer.value)`
export const allQuestions = (state: RootState) => state.admin.value;
export const allUsers = (state: RootState) => state.admin.userList;
export const selectedQuestionId = (state: RootState) =>
  state.admin.selectedQuestionId;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default QuestionSlice.reducer;
