import { SelectProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import {
  MultiSelect,
  MultiSelectProps,
} from "../../ui/MultiSelect/MultiSelect";

type MultiSelectControllerProps<T> = {
  name: string;
  label: string;
} & Omit<SelectProps, "name"> &
  Omit<MultiSelectProps<T>, "onChange">;

export const MultiSelectController = <T,>({
  options,
  accessor,
  required,
  label,
  ...props
}: MultiSelectControllerProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...props}
      name={props.name}
      control={control}
      rules={{ required }}
      render={({ field }) => {
        return (
          <MultiSelect
            {...props}
            label={label}
            value={field.value}
            onChange={(value: string[]) => field.onChange(value)}
            options={options}
            accessor={accessor}
            required={required}
          />
        );
      }}
    />
  );
};
