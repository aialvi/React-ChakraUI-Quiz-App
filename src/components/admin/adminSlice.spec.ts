import AnswerReducer, { QuestionState, addQuestion } from "./adminSlice";

describe("Answer reducer", () => {
  const initialState: QuestionState = {
    value: [],
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(AnswerReducer(undefined, { type: "unknown" })).toEqual({
      value: [],
      status: "idle",
    });
  });

  it("should handle answer by user", () => {
    const actual = AnswerReducer(initialState, addQuestion("test"));
    expect(actual.value).toEqual(["test"]);
  });
});
