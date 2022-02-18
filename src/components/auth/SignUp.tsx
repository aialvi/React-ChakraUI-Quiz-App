import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";

export function SignUp() {
  //function for SignUp with api request
  const [username, setUsername] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      window.location.href = "/user";
    }
  }, [token]);

  const onSignUp = async () => {
    setLoading(true);

    axios
      .post("https://reqres.in/api/Signup", {
        email: username,
        password: password,
      })
      .then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          console.log("SignUp Success", response.data);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="50vh"
      backgroundColor="#fbfcff"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      border={"40%"}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.300">Welcome</Heading>
        <Box marginX={"40px"} minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack spacing={4} p="1rem">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="email"
                    placeholder="email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <p>{error}</p>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
                onClick={onSignUp}
                disabled={loading || !username || !password}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
