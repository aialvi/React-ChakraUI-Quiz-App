import { useAppSelector } from "../../../app/hooks";
import { selectedQuestionId } from "../adminSlice";

import { useNavigate } from "react-router-dom";
import styles from "../Admin.module.css";
import { List, ListItem, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Answer } from "../../user/userSlice";

export function AnswerList() {
  const navigate = useNavigate();
  const questionId = useAppSelector(selectedQuestionId);
  const answers = localStorage.getItem("answers")
    ? JSON.parse(localStorage.getItem("answers")!).filter((answer: any) => {
        return answer.questionId === questionId;
      })
    : [];

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      navigate("/login");
    }
    console.log(questionId);
  }, [navigate, questionId]);

  return (
    <div>
      <div className={styles.row}>
        {!answers!.length && (
          <Text fontSize={"xl"} color="red.900">
            No answers available
          </Text>
        )}

        {!!answers!.length && <Text fontSize={"xl"}>Available Answers:</Text>}
      </div>
      <div className={styles.row}>
        <List spacing={3}>
          {answers!.map((item: Answer) => (
            <ListItem key={item.id}>
              {item.answer.length > 60
                ? item.answer.substring(0, 60) + "..."
                : item.answer}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
