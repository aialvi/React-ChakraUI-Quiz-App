import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addQuestion, selectQuestion } from "./adminSlice";
import styles from "./Admin.module.css";

export function Admin() {
  const questions = useAppSelector(selectQuestion);
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState("");

  return (
    <div>
      <div className={styles.row}>
        <p>
          <strong>Questions</strong>
        </p>
      </div>

      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="type question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="type question here"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              dispatch(addQuestion(question));
              setQuestion("");
            }
          }}
        />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(addQuestion(question));
            setQuestion("");
          }}
          disabled={!question.length}
        >
          Submit
        </button>
      </div>

      <div className={styles.row}>
        <span className={styles.question}>
          {!!questions!.length && <h6>Questions:</h6>}
          <ul>
            {questions!.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}
