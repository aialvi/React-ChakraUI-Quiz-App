import QuestionReducer, { QuestionState, addQuestion } from "./adminSlice";

describe("Answer reducer", () => {
  const initialState: QuestionState = {
    value: [],
    selectedQuestionId: 0,
  };
  it("should handle initial state", () => {
    expect(QuestionReducer(undefined, { type: "unknown" })).toEqual({
      value: [],
    });
  });

  it("should handle answer by user", () => {
    const actual = QuestionReducer(initialState, addQuestion("test"));
    expect(actual.value).toEqual(["test"]);
  });
});
