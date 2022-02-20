import AnswerReducer, { AnswerState, giveAnswer } from "./userSlice";

describe("Answer reducer", () => {
  const initialState: AnswerState = {
    value: [],
    selectedQuestionId: 0,
  };
  it("should handle initial state", () => {
    expect(AnswerReducer(undefined, { type: "unknown" })).toEqual({
      value: [],
      selectedQuestionId: 0,
    });
  });

  it("should handle answer by user", () => {
    const actual = AnswerReducer(initialState, giveAnswer("test"));
    expect(actual.value).toEqual(["test"]);
  });
});
