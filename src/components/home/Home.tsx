import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Home() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Explore and Learn <br />
            <Text as={"span"} color={"green.400"}>
              @ Quizzard
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            <br /> Quizzard brings the magic of learning at ease for everyone.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link to={token ? (isAdmin ? "/admin" : "/user") : "/signup"}>
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                {token ? "Dashboard" : "Get Started"}
              </Button>
            </Link>
            {!token && (
              <Text fontSize={"md"} color={"gray.500"}>
                Already have an account?{" "}
                <Link to={"/login"}>
                  {" "}
                  <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
                    Sign in
                  </Button>
                </Link>
              </Text>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
