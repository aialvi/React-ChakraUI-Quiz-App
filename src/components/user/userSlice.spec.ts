import AnswerReducer, { AnswerState, giveAnswer } from "./userSlice";

describe("Answer reducer", () => {
  const initialState: AnswerState = {
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
    const actual = AnswerReducer(initialState, giveAnswer("test"));
    expect(actual.value).toEqual(["test"]);
  });
});
