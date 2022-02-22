import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addQuestion, allQuestions, Question } from "./adminSlice";
import styles from "./Admin.module.css";
import QuestionItem from "./question/Question";
import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Admin() {
  const questions = useAppSelector(allQuestions);
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div className={styles.row}>
        <p>
          <strong>Add Question</strong>
        </p>
      </div>

      <div className={styles.row}>
        <Input
          className={styles.textbox}
          aria-label="type question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="type question here"
          size="md"
          width={400}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              dispatch(addQuestion(question));
              setQuestion("");
            }
          }}
        />
        <Button
          color={"green.500"}
          onClick={() => {
            dispatch(addQuestion(question));
            setQuestion("");
          }}
          disabled={!question.length}
        >
          Add
        </Button>
      </div>
      <div className={styles.row}></div>

      <div className={styles.row}>
        {!!questions!.length && <h6>List of Questions:</h6>}
      </div>

      <div className={styles.row}>
        <span className={styles.question}>
          {questions!.map((item: Question) => (
            <QuestionItem key={item.id} id={item.id} question={item.question} />
          ))}
        </span>
      </div>
    </div>
  );
}
