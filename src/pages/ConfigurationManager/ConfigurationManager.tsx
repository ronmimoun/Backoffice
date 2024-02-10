import classes from "./ConfigurationManager.module.scss";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ConfigurationManager = () => {
  return (
    <Box className={classes.container}>
      <Outlet />
    </Box>
  );
};

export default ConfigurationManager;
