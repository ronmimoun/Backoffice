import classes from "../configurationManager.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../ui/Input/Input";
import { useCallback } from "react";
import { ButtonPrimary } from "../../../ui/Button/ButtonPrimary";
import { ADD_JOB_TITLE_CONFIG } from "../../../../form/schemas/addJobTitleSchema";
import { Box, Typography } from "@mui/material";
import { MultiSelect } from "../../../ui/MultiSelect/MultiSelect";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../../../store/categoryManager/categoryManager.selectors";

export const AddCountryForm = () => {
  const { categories: countries } = useSelector(
    categoryManagerSelectors.categoryManager()
  );

  const formMethods = useForm({
    defaultValues: {},
  });

  const handleSubmit = useCallback(async () => {}, []);

  const handleError = useCallback((error: any) => {
    console.log("error", error);
  }, []);

  return (
    <Box className={classes.form_box}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit, handleError)}>
          <Typography className="mb-1" variant="h5">
            Add Country:
          </Typography>
          <Input
            name={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.KEY}
            label={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.LABEL}
            required={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.IS_REQUIRED}
          />
          <ButtonPrimary type="submit">Add Country</ButtonPrimary>
        </form>
      </FormProvider>

      <Box>
        <Typography className="mb-1" variant="h5">
          Add Country:
        </Typography>
        <MultiSelect
          options={countries}
          accessor="name"
          label="Select to delete"
        />
      </Box>
    </Box>
  );
};
