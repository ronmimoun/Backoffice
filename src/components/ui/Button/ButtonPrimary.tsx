import classes from "./button-primary.module.scss";
import { CircularProgress } from "@mui/material";

type ButtonPrimaryProps = {
  children: React.ReactNode;
  type?: "button" | "reset" | "submit";
  className?: string;
  isLoading?: boolean;
  onClickFunction?: () => void;
};

export const ButtonPrimary = ({
  children,
  type,
  className,
  isLoading,
  onClickFunction,
}: ButtonPrimaryProps) => {
  return (
    <button
      className={`${classes.button_primary} ${className ? className : ""}`}
      onClick={onClickFunction && onClickFunction}
      type={type}
    >
      {isLoading ? (
        <CircularProgress size={20} color="info" className={classes.loader} />
      ) : (
        children
      )}
    </button>
  );
};
