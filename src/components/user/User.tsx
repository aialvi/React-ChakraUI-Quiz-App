import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { giveAnswer, selectAnswer, selectedQuestionId } from "./userSlice";
import { selectQuestion } from "../admin/adminSlice";
import styles from "./User.module.css";
import { Button } from "@chakra-ui/react";

export function User() {
  const answer = useAppSelector(selectAnswer);
  const question = useAppSelector(selectQuestion);
  const questionId = useAppSelector(selectedQuestionId);
  const dispatch = useAppDispatch();
  const [userAnswer, setUserAnswer] = useState("");

  return (
    <div>
      <div className={styles.row}>
        <p>
          <strong>
            {question!.length > 0
              ? question![questionId]
              : "No questions available"}
          </strong>
        </p>
      </div>

      <div className={styles.row}>
        <input
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
        >
          Submit
        </Button>
      </div>

      <div className={styles.row}>
        <span className={styles.answer}>
          {!!answer.length && <h6>Answer:</h6>}
          <ul>
            {answer.map((item, index) => (
              <li key={index}>{item.answer}</li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}
