import React from "react";
import { inputStyle, buttonStyle } from "../styles";
import { connect } from "react-redux";
import { authenticate } from "../store";

import {
  VStack,
  Input,
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      name={name}
      w="40%"
      spacing="6"
      marginBottom={4}
    >
      <Input
        name="username"
        type="text"
        placeholder="Username"
        {...inputStyle}
      />

      {name === "signup" && (
        <Input name="email" type="email" placeholder="Email" {...inputStyle} />
      )}

      <Input
        name="password"
        type="password"
        placeholder="Password"
        {...inputStyle}
      />

      {name === "signup" && (
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          {...inputStyle}
        />
      )}

      <Box
        as="button"
        type="submit"
        {...buttonStyle()}
        transform="translateY(3.5px)"
      >
        {displayName}
      </Box>

      {error && error.response && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error.response.data}</AlertDescription>
        </Alert>
      )}
    </VStack>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();

      const userInfo = {
        formName: evt.target.name,
        username: evt.target.username.value,
        password: evt.target.password.value,
      };
      if (userInfo.formName === "signup") {
        userInfo.passwordConfirm = evt.target.confirmPassword.value;
        userInfo.email = evt.target.email.value;
      }
      dispatch(authenticate(userInfo));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
