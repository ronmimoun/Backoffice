import classes from "./BasicSelect.module.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { useEffect, useState } from "react";

export type BasicSelectProps<T> = {
  list: T[];
  textAccessor: string;
  valueAccessor?: string;
  name: string;
  value?: string;
  handleChange?: (selectedValue: T) => void;
} & SelectProps;

const BasicSelect = <T,>({
  handleChange,
  value = "",
  ...props
}: BasicSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const onChange = (value: T) => {
    setSelectedValue((value as any)[props.textAccessor]);
    handleChange && handleChange(value);
  };

  return (
    <Box className={classes.select_container}>
      {props.label && (
        <InputLabel className={classes.select_label}>
          {props.required ? "*" : ""}
          {props.label}
        </InputLabel>
      )}
      <Select
        className={classes.select}
        required={props.required}
        value={selectedValue}
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
};

export default BasicSelect;
