import UserReducer, { UserStates, giveAnswer } from "./userSlice";

describe("Answer reducer", () => {
  const initialState: UserStates = {
    answers: [],
    selectedQuestionId: 0,
    currentUserId: 1,
  };
  it("should handle initial state", () => {
    expect(UserReducer(undefined, { type: "unknown" })).toEqual({
      answers: [],
      selectedQuestionId: 0,
      currentUserId: 1,
    });
  });

  it("should handle answer by user", () => {
    const actual = UserReducer(initialState, giveAnswer("test"));
    expect(actual.answers).toEqual(["test"]);
  });
});
