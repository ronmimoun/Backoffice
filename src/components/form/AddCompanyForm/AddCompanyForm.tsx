import { FormProvider, useForm } from "react-hook-form";
import BasicSelect from "../../ui/BasicSelect/BasicSelect";
import { Input } from "../../ui/Input/Input";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../../store/categoryManager/categoryManager.selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonPrimary } from "../../ui/Button/ButtonPrimary";
import { useAppDispatch } from "../../../store";
import { categoryManagerActions } from "../../../store/categoryManager/categoryManager.actions";
import {
  ADD_COMPANY_CONFIG,
  ADD_COMPANY_SCHEMA,
  AddCompanyFormType,
} from "../../../form/schemas/addCompanySchema";
import { Typography } from "@mui/material";

export const AddCompanyForm = () => {
  const dispatch = useAppDispatch();
  const { categories } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const formMethods = useForm<AddCompanyFormType>({
    defaultValues: {
      [ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.KEY]:
        ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.DEFAULT_VALUE,
      [ADD_COMPANY_CONFIG.INPUTS.CATEGORY.KEY]:
        ADD_COMPANY_CONFIG.INPUTS.CATEGORY.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_COMPANY_SCHEMA),
  });

  const handleSubmit = useCallback(async (formData: AddCompanyFormType) => {
    if (!window.confirm("Are you sure?")) return;
    await dispatch(categoryManagerActions.createCompanyThunk(formData));
    formMethods.reset();
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <Typography className="mb-1" variant="h5">
          Add Company:
        </Typography>
        <Input
          name={ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.KEY}
          label={ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.LABEL}
          required={ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.IS_REQUIRED}
        />
        <BasicSelect
          required={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.IS_REQUIRED}
          list={categories}
          name={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.KEY}
          textAccessor={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.ACCESSORS.VALUE}
          valueAccessor={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.ACCESSORS.VALUE}
          label={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.LABEL}
        />
        <ButtonPrimary type="submit">Add Company</ButtonPrimary>
      </form>
    </FormProvider>
  );
};
