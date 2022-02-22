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
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { assignCurrentUserId } from "../user/userSlice";
import { useAppDispatch } from "../../app/hooks";

export function SignUp() {
  //function for SignUp with api request
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/user");
    }
  }, [navigate]);

  const validEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSignUp = async () => {
    setLoading(true);
    if (!!localStorage.getItem("users")) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find((user: any) => user.email === email)) {
        setError("Email already exists");
        setLoading(false);
      } else {
        users.push({ id: users.length + 1, name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("token", Math.random().toString(36));
        localStorage.setItem("currentUserId", users.length.toString());
        dispatch(assignCurrentUserId(users.length));
        setLoading(false);
        navigate("/user");
      }
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            id: 1,
            name,
            email,
            password,
            isAdmin: true,
          },
        ])
      );
      localStorage.setItem("isAdmin", "1");
      localStorage.setItem("token", Math.random().toString(36));
      localStorage.setItem("currentUserId", "1");
      dispatch(assignCurrentUserId(1));

      setLoading(false);
      navigate("/user");
    }
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
        <Avatar bg="green.400" />
        <Heading color="green.400">Welcome</Heading>
        <Box marginX={"40px"} minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack spacing={4} p="1rem">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

              <Text fontSize={"md"} color={"red.400"}>
                {error}
              </Text>

              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="green"
                width="full"
                onClick={onSignUp}
                disabled={loading || !validEmail(email) || !password || !name}
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
