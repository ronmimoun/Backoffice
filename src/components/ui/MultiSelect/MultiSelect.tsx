import classes from "./MultiSelect.module.scss";
import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //   width: 250,
    },
  },
};

export type MultiSelectProps<T> = {
  options: T[];
  accessor: string;
  required?: boolean;
  value?: string;
  onChange?: (entity: string[]) => void;
  label?: string;
};

export const MultiSelect = <T,>({
  options,
  accessor,
  required,
  value,
  onChange,
  label,
  ...props
}: MultiSelectProps<T>) => {
  const [personName, setPersonName] = useState<string[]>([]);

  useEffect(() => {
    onChange && onChange(personName);
  }, [personName]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box className={classes.multi_select_container}>
      <Typography variant="body1">
        {required ? "*" : ""}
        {label || ""}
      </Typography>
      <Select
        className={classes.select}
        {...props}
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        required={required}
      >
        {options.map((option, idx) => {
          const value: string = (option as any)[accessor];
          return (
            <MenuItem key={idx} value={value}>
              <Checkbox checked={personName.indexOf(value) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
