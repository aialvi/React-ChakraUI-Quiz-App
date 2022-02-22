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
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    if (email === "admin@test.com" && password === "admin") {
      localStorage.setItem("adminToken", Math.random().toString(36));
      navigate("/admin");
    } else if (
      JSON.parse(localStorage.getItem("users") || "[]").find(
        (user: any) => user.email === email && user.password === password
      )
    ) {
      localStorage.setItem("userToken", Math.random().toString(36));
      setToken(localStorage.getItem("userToken"));
      setError("");
      setLoading(false);
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const validEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    if (token) {
      window.location.href = "/user";
    }
  }, [token]);

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
                    type="email"
                    placeholder="email address"
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
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => handleShowClick()}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {error && <p>{error}</p>}
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="green"
                width="full"
                onClick={() => handleSubmit()}
                disabled={loading || !validEmail(email) || !password}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
