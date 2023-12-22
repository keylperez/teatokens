import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  tea: {
    dark: "#151618",
    green: "#556b2f",
    matcha: "#a9a454",
    light: { 50: "#F3F3F2", 100: "#f8f4ed", 200: "#efe4d4" },
    brown: "#b07946",
  },
};

const globalStyles = {
  styles: {
    global: {
      body: {
        bg: "tea.light.100",
      },
      "html, body": {
        color: "tea.dark",
      },
    },
  },
};

const theme = extendTheme({
  colors,
  ...globalStyles,
  fonts: { heading: "Cormorant Garamond, serif", body: "Khula, sans-serif" },
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ChakraProvider>,

  document.getElementById("app")
);
