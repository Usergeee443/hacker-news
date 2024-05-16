import { Box } from "@mui/material";
import React from "react";
import SearchAppBar from "./Header";

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <SearchAppBar />
      <Box sx={{ marginTop: "2%" }}>{children}</Box>
    </div>
  );
};

export default Layout;
