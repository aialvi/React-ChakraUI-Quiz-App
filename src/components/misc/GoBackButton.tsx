import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function GoBackButton() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={() => goBack()}
      rightIcon={<ArrowBackIcon />}
      colorScheme="teal"
      variant="outline"
    >
      Go Back
    </Button>
  );
}
