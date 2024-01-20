import { CircularProgress } from "@mui/material";
import classes from "./CircularProgressLoader.module.scss";

type CircularProgressLoaderProps = {
  isLoading: boolean;
  size?: number;
  children: React.ReactNode;
};

const CircularProgressLoader = ({
  isLoading,
  children,
  size = 20,
}: CircularProgressLoaderProps) => {
  if (isLoading)
    return (
      <CircularProgress size={size} color="info" className={classes.loader} />
    );
  else return children;
};

export default CircularProgressLoader;
