import classes from "./Input.module.scss";
import { useFormContext } from "react-hook-form";
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
    <div className={`mb-1 ${classes.container} ${className}`}>
      {label ||
        (errors[name] && (
          <div className={classes.container__label}>
            {label && (
              <label htmlFor="">
                {required ? "*" : ""}
                {label}
              </label>
            )}
            {errors[name] && (
              <p className={classes.container__error}>
                <ErrorIcon />
                {errors[name]?.message as string}
              </p>
            )}
          </div>
        ))}
      <input
        required={required}
        className={classes.container__input}
        placeholder={placeholder}
        type={type || "text"}
        {...register(name)}
      />
    </div>
  );
};
