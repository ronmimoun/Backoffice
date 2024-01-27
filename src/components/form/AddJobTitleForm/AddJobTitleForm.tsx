import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/Input/Input";
import { useCallback } from "react";
import { ButtonPrimary } from "../../ui/Button/ButtonPrimary";
import { useAppDispatch } from "../../../store";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryManagerActions } from "../../../store/categoryManager/categoryManager.actions";
import {
  ADD_JOB_TITLE_CONFIG,
  ADD_JOB_TITLE_SCHEMA,
  AddJobTitleFormType,
} from "../../../form/schemas/addJobTitleSchema";
import { Typography } from "@mui/material";

export const AddJobTitleForm = () => {
  const dispatch = useAppDispatch();

  const formMethods = useForm<AddJobTitleFormType>({
    defaultValues: {
      [ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.KEY]:
        ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_JOB_TITLE_SCHEMA),
  });

  const handleSubmit = useCallback(async (formData: AddJobTitleFormType) => {
    if (!window.confirm("Are you sure?")) return;
    await dispatch(categoryManagerActions.createJobTitleThunk(formData));
    formMethods.reset();
  }, []);

  const handleError = useCallback((error: any) => {
    console.log("error", error);
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit, handleError)}>
        <Typography className="mb-1" variant="h5">
          Add Job Title:
        </Typography>
        <Input
          name={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.KEY}
          label={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.LABEL}
          required={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.IS_REQUIRED}
        />
        <ButtonPrimary type="submit">Add Job Title</ButtonPrimary>
      </form>
    </FormProvider>
  );
};
