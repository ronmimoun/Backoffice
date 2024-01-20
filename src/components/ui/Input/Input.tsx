import { useFormContext } from "react-hook-form";
import classes from "./Input.module.scss";
import ErrorIcon from "@mui/icons-material/Error";

export type InputProps = {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  className?: string;
  required?: boolean;
};

export const Input = ({
  label,
  placeholder,
  type,
  name,
  className,
  required,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${classes.container} ${className} mb-1`}>
      {label && (
        <label htmlFor="">
          {required ? "*" : ""}
          {label}
        </label>
      )}
      <input
        required={required}
        className={classes.container__input}
        placeholder={placeholder}
        type={type || "text"}
        {...register(name)}
      />
      {errors[name] && (
        <p className={classes.container__error}>
          <ErrorIcon />
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
