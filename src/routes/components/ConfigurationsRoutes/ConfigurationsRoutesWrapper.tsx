import classes from "./ConfigurationsRoutesWrapper.module.scss";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export const ConfigurationsRoutesWrapper = () => {
  return (
    <Box className={classes.container}>
      <Outlet />
    </Box>
  );
};
