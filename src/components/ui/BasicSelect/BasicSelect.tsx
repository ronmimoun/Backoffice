import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import classes from "./BasicSelect.module.scss";
import { Controller, useFormContext } from "react-hook-form";

export type BasicSelectProps<T> = {
  list: T[];
  textAccessor: string;
  valueAccessor?: string;
  name: string;
  value?: string;
  onChange?: (selectedValue?: T) => void;
} & SelectProps;

const BasicSelect = <T,>({
  onChange,
  value = "",
  ...props
}: BasicSelectProps<T>) => {
  const { control } = useFormContext();

  const handleChange = (selectedValue?: T) => {
    onChange && onChange(selectedValue);
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
              value={value || field.value}
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
                    onClick={() => handleChange(item)}
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

export default BasicSelect;
