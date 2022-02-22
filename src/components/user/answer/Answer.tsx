import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateAnswer, deleteAnswer, Answer } from "../userSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Answers = ({ userId, questionId, id, answer }: Answer) => {
  const [answerValue, setAnswerValue] = useState(answer);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAnswerInput = () => {
    dispatch(updateAnswer({ id, answer: answerValue, userId, questionId }));
    setIsUpdate(false);
  };

  const handleDeleteClick = () => {
    dispatch(deleteAnswer(id));
  };

  return (
    <div className="d-flex justify-content-between">
      <HStack spacing="24px">
        {!isUpdate && (
          <Box w={"fit-content"} p={2}>
            {answer.length > 50 ? answer.substring(0, 60) + "..." : answer}
          </Box>
        )}
        {isUpdate && (
          <>
            <Input
              value={answerValue}
              onChange={(e) => setAnswerValue(e.target.value)}
              placeholder="Answer"
              size="md"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleAnswerInput();
                }
              }}
            />
            <Button onClick={handleAnswerInput} color="green.600">
              Save
            </Button>
          </>
        )}
        <Box w="40px">
          <Button
            onClick={() => setIsUpdate(true)}
            color="blue.600"
            backgroundColor={"white"}
          >
            <AiOutlineEdit />
          </Button>
        </Box>
        <Box w="40px">
          <Button
            color="red.600"
            onClick={handleDeleteClick}
            backgroundColor={"white"}
          >
            <AiOutlineDelete />
          </Button>
        </Box>
      </HStack>
    </div>
  );
};

export default Answers;
