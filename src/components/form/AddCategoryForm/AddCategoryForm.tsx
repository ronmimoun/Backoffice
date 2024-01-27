import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/Input/Input";
import { useCallback } from "react";
import { ButtonPrimary } from "../../ui/Button/ButtonPrimary";
import { useAppDispatch } from "../../../store";
import {
  ADD_CATEGORY_CONFIG,
  ADD_CATEGORY_SCHEMA,
  AddCategoryFormType,
} from "../../../form/schemas/addCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryManagerActions } from "../../../store/categoryManager/categoryManager.actions";
import { Typography } from "@mui/material";

export const AddCategoryForm = () => {
  const dispatch = useAppDispatch();

  const formMethods = useForm<AddCategoryFormType>({
    defaultValues: {
      [ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.KEY]:
        ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_CATEGORY_SCHEMA),
  });

  const handleSubmit = useCallback(async (formData: AddCategoryFormType) => {
    if (!window.confirm("Are you sure?")) return;
    await dispatch(categoryManagerActions.createCategoryThunk(formData));
    formMethods.reset();
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <Typography className="mb-1" variant="h5">
          Add Category:
        </Typography>
        <Input
          name={ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.KEY}
          label={ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.LABEL}
          required={ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.IS_REQUIRED}
        />
        <ButtonPrimary type="submit">Add Category</ButtonPrimary>
      </form>
    </FormProvider>
  );
};
