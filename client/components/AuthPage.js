import React, { useState } from "react";
import { Login, Signup } from "./AuthForm";
import { Center, Text, VStack } from "@chakra-ui/react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <Center py={8} as={VStack}>
      {isSignUp ? <Signup /> : <Login />}
      <Text
        textDecor="underline"
        color="blue.600"
        cursor="pointer"
        onClick={() => {
          setIsSignUp((prev) => !prev);
        }}
      >
        {isSignUp
          ? "Already have an account? Click here to sign in instead"
          : "Don't have an account yet? Click here to sign up!"}
      </Text>
    </Center>
  );
}
