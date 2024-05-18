import {
  InputBaseComponentProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { forwardRef } from "react";

export type TextareaBaseProps = {
  name: string;
  inputProps?: InputBaseComponentProps;
} & TextFieldProps;

export const TextareaBase = forwardRef<HTMLInputElement, TextareaBaseProps>(
  ({ name, className, inputProps, ...props }, ref) => {
    const { register } = useFormContext();

    return (
      <TextField
        {...props}
        {...register(name)}
        multiline
        className={className}
        inputProps={{
          ...inputProps,
          ref,
        }}
      />
    );
  }
);
