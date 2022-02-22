import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UserStates {
  answers: Array<any>;
  selectedQuestionId: number;
  currentUserId: number;
}

export interface Answer {
  id: number;
  answer: string;
  userId: number;
  questionId: number;
}

const initialState: UserStates = {
  answers: !!localStorage.getItem("answers")
    ? JSON.parse(localStorage.getItem("answers")!)
    : [],
  selectedQuestionId: 0,
  currentUserId: !!localStorage.getItem("currentUserId")
    ? Number(localStorage.getItem("currentUserId")!)
    : 0,
};

export const AnswerSlice = createSlice({
  name: "Answer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    giveAnswer: (state, action: PayloadAction<string>) => {
      let tempObject = {
        id: state.answers.length + 1,
        answer: action.payload,
        userId: state.currentUserId,
        questionId: state.selectedQuestionId,
      };
      state.answers = [...state.answers, tempObject];

      localStorage.setItem("answers", JSON.stringify(state.answers));
    },
    assignQuestionId: (state, action: PayloadAction<number>) => {
      state.selectedQuestionId = action.payload;
    },
    assignCurrentUserId: (state, action: PayloadAction<number>) => {
      state.currentUserId = action.payload;
    },
    updateAnswer: (state, action: PayloadAction<Answer>) => {
      const index = state.answers.findIndex(
        (answer) => answer.id === action.payload.id
      );
      state.answers[index] = action.payload;
      localStorage.setItem("answers", JSON.stringify(state.answers));
    },
    deleteAnswer: (state, action: PayloadAction<number>) => {
      state.answers = state.answers.filter(
        (answer) => answer.id !== action.payload
      );
      localStorage.setItem("answers", JSON.stringify(state.answers));
    },
  },
});

export const {
  giveAnswer,
  assignQuestionId,
  updateAnswer,
  deleteAnswer,
  assignCurrentUserId,
} = AnswerSlice.actions;

// The function below is called a selector and allows us to select a answers from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.answers)`
export const selectedAnswers = (state: RootState) =>
  state.user.answers.filter(
    (answer) =>
      answer.questionId === state.user.selectedQuestionId &&
      answer.userId === Number(state.user.currentUserId)
  );
export const selectedQuestionId = (state: RootState) =>
  state.user.selectedQuestionId;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default AnswerSlice.reducer;
