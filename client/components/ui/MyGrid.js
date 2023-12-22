import React from "react";
import { Grid } from "@chakra-ui/react";
export default function MyGrid({ children, ...props }) {
  return (
    <Grid
      templateColumns="repeat(auto-fill,minmax(20rem,1fr))"
      gap="2.5rem"
      {...props}
    >
      {children}
    </Grid>
  );
}
