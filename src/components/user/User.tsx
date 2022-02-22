import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { giveAnswer, selectAnswer, selectedQuestionId } from "./userSlice";
import { allQuestions } from "../admin/adminSlice";
import styles from "./User.module.css";
import { Button, Input, Text } from "@chakra-ui/react";
import Answer from "./answer/Answer";
import { useNavigate } from "react-router-dom";

export function User() {
  const answer = useAppSelector(selectAnswer);
  const questions = useAppSelector(allQuestions);
  const questionId = useAppSelector(selectedQuestionId);
  const dispatch = useAppDispatch();
  const [userAnswer, setUserAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div className={styles.row}>
        <p>
          <strong>
            {questions!.length > 0
              ? questions.filter((item) => item.id === questionId)[0].question
              : "No questions available"}
          </strong>
        </p>
      </div>
      {questions!.length > 0 && (
        <>
          <div className={styles.row}>
            <Input
              className={styles.textbox}
              aria-label="Type answer here"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="type answer here"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  dispatch(giveAnswer(userAnswer));
                  setUserAnswer("");
                }
              }}
            />
          </div>
          <div className={styles.row}>
            <Button
              onClick={() => {
                dispatch(giveAnswer(userAnswer));
                setUserAnswer("");
              }}
              disabled={userAnswer.length === 0}
              color="green.500"
            >
              Submit
            </Button>
          </div>

          <div className={styles.row}>
            <Text fontSize={"md"}>
              {!!answer.length && <h6>My Answers:</h6>}

              {answer.map((item, index) => (
                <Answer
                  key={index}
                  answer={item.answer}
                  id={item.id}
                  userId={item.userId}
                  questionId={item.questionId}
                />
              ))}
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
