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
        <Text>
          {!!question!.length && (
            <Text fontSize={"xl"}>Available Questions To Answer:</Text>
          )}
          <List spacing={3}>
            {question!.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  dispatch(assignQuestionId(index));
                  navigate({ pathname: `/user/question/${index}` });
                }}
              >
                {item}
              </ListItem>
            ))}
          </List>
        </Text>
      </div>
    </div>
  );
}
