import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Question, updateQuestion, deleteQuestion } from "../adminSlice";

const QuestionItem = ({ id, question }: Question) => {
  const [questionValue, setQuestionValue] = useState(question);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(updateQuestion({ id, question: questionValue }));
    setIsUpdate(false);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id));
  };

  return (
    <div className="d-flex justify-content-between">
      <HStack spacing="24px">
        {!isUpdate && (
          <Box w={"fit-content"} padding={2}>
            {question}
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
            <Button onClick={handleSave} color="green.600">
              Save
            </Button>
          </>
        )}
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
