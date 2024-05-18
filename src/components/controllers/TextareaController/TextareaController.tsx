import { Controller, useFormContext } from "react-hook-form";
import {
  TextareaBase,
  TextareaBaseProps,
} from "../../ui/Input/TextareaBase/TextareaBase";

type TextareaControllerProps = {} & TextareaBaseProps;

export const TextareaController = ({
  name,
  required,
  ...props
}: TextareaControllerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => {
        return <TextareaBase {...props} {...field} name={name} />;
      }}
    />
  );
};
