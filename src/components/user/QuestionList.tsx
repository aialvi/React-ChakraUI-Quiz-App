import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { assignQuestionId } from "./userSlice";
import { allQuestions } from "../admin/adminSlice";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { List, ListItem, Text } from "@chakra-ui/react";

export function QuestionList() {
  const navigate = useNavigate();
  const question = useAppSelector(allQuestions);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row}>
        {!question!.length && (
          <Text fontSize={"xl"} color="red.900">
            No question available
          </Text>
        )}

        {!!question!.length && (
          <Text fontSize={"xl"}>Available Questions To Answer:</Text>
        )}
        <List spacing={3}>
          {question!.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => {
                dispatch(assignQuestionId(item.id));
                navigate({ pathname: `/user/question/${item.id}` });
              }}
            >
              {item.question}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
