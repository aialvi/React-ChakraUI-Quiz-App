import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { giveAnswer, selectAnswer } from "./userSlice";
import styles from "./User.module.css";

export function User() {
  const answer = useAppSelector(selectAnswer);
  const dispatch = useAppDispatch();
  const [userAnswer, setUserAnswer] = useState("");

  return (
    <div>
      <div className={styles.row}>
        <p>
          <strong>Question</strong>
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
        <button
          className={styles.button}
          onClick={() => {
            dispatch(giveAnswer(userAnswer));
            setUserAnswer("");
          }}
        >
          Submit
        </button>
      </div>

      <div className={styles.row}>
        <span className={styles.answer}>
          {!!answer.length && <h6>Answer:</h6>}
          <ul>
            {answer.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}
