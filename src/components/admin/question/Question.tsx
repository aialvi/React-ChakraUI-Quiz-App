import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  Question,
  updateQuestion,
  deleteQuestion,
  assignQuestionId,
} from "../adminSlice";
import { useNavigate } from "react-router-dom";

const QuestionItem = ({ id, question }: Question) => {
  const [questionValue, setQuestionValue] = useState(question);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = () => {
    dispatch(updateQuestion({ id, question: questionValue }));
    setIsUpdate(false);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id));
  };

  const showAnswers = () => {
    navigate(`/admin/questions/${id}/answers`);
    dispatch(assignQuestionId(id));
  };

  return (
    <div className="d-flex justify-content-between">
      <HStack spacing="24px">
        {!isUpdate && (
          <Box w={"fit-content"} padding={2}>
            <Text fontSize={"xl"}>{question}</Text>
          </Box>
        )}
        {isUpdate && (
          <>
            <Input
              value={questionValue}
              onChange={(e) => setQuestionValue(e.target.value)}
              placeholder="Question"
              size="md"
            />
            <Button onClick={() => handleSave()} color="green.600">
              Save
            </Button>
          </>
        )}
        <Box w="90px">
          <Button
            backgroundColor="white"
            color="green.600"
            onClick={() => showAnswers()}
            variant="ghost"
          >
            Answers
          </Button>
        </Box>
        <Box w="40px">
          <Button
            onClick={() => setIsUpdate(true)}
            color="blue.600"
            backgroundColor="white"
            className="btn btn-danger rounded-btn"
          >
            <AiOutlineEdit />
          </Button>
        </Box>
        <Box w="40px">
          <Button
            backgroundColor="white"
            color="red.600"
            onClick={handleDelete}
          >
            <AiOutlineDelete />
          </Button>
        </Box>
      </HStack>
    </div>
  );
};

export default QuestionItem;
