import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import classes from "./BasicSelectController.module.scss";
import { Controller, useFormContext } from "react-hook-form";

export type BasicSelectControllerProps<T> = {
  list: T[];
  textAccessor: string;
  valueAccessor?: string;
  name: string;
  value?: string;
  handleChange?: (selectedValue?: T) => void;
} & SelectProps;

const BasicSelectController = <T,>({
  handleChange,
  value = "",
  ...props
}: BasicSelectControllerProps<T>) => {
  const { control } = useFormContext();

  const onChange = (selectedValue?: T) => {
    handleChange && handleChange(selectedValue);
  };

  return (
    <Controller
      name={props.name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <Box className={classes.select_container}>
            {props.label && (
              <InputLabel className={classes.select_label}>
                {props.required ? "*" : ""}
                {props.label}
              </InputLabel>
            )}
            <Select
              {...field}
              className={classes.select}
              required={props.required}
              onChange={(e) => {
                field.onChange(e);
              }}
              value={value || field.value || ""}
              disabled={props.disabled}
            >
              {props.list.map((item, idx) => {
                const textAccessor = (item as any)[props.textAccessor];
                const valueAccessor = (item as any)[
                  props.valueAccessor || props.textAccessor
                ];
                return (
                  <MenuItem
                    key={idx}
                    value={valueAccessor || textAccessor}
                    onClick={() => onChange(item)}
                  >
                    {textAccessor}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        );
      }}
    />
  );
};

export default BasicSelectController;
