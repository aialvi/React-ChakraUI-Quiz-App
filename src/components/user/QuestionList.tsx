import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { assignQuestionId } from "./userSlice";
import { allQuestions } from "../admin/adminSlice";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";

export function QuestionList() {
  const navigate = useNavigate();
  const question = useAppSelector(allQuestions);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.answer}>
          {!!question!.length && <h6>Available Questions:</h6>}
          <ul>
            {question!.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(assignQuestionId(index));
                  navigate({ pathname: `/user/question/${index}` });
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}
