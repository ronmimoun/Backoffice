import classes from "./AddCompanyContacts.module.scss";
import BasicSelect from "../../components/ui/BasicSelect/BasicSelect";
import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  ADD_COMPANY_CONTACTS_CONFIG,
  ADD_COMPANY_CONTACTS_SCHEMA,
  AddCompanyContactsForm,
} from "../../form/schemas/addCompanyContactsSchema";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { Input } from "../../components/ui/Input/Input";
import { Breadcrumb } from "../../components/shared/Breadcrumb/Breadcrumb";
import { ButtonPrimary } from "../../components/ui/Button/ButtonPrimary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { MultiSelectController } from "../../components/controllers/MultiSelectController/MultiSelectController";
import { categoryManagerUtilService } from "../../utils/category-manager.utils";
import {
  CategoryModel,
  CompanyModel,
  JobTitleModel,
} from "../../store/categoryManager/categoryManager-state";
import { CreateManyContactsRequest } from "../../models/contact/createMany/createManyContacts.request";
import { countryUtilService } from "../../utils/country.utils";
import { useAppDispatch } from "../../store";
import { contactActions } from "../../store/contact/contact.actions";

const IS_IN_STOCK = [{ name: "Yes" }, { name: "No" }];

const AddCompanyContacts = () => {
  const dispatch = useAppDispatch();
  const { categories, jobTitles, countries, companies } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const formMethods = useForm<AddCompanyContactsForm>({
    defaultValues: {
      [ADD_COMPANY_CONTACTS_CONFIG.INPUTS.CATEGORY.KEY]:
        ADD_COMPANY_CONTACTS_CONFIG.INPUTS.CATEGORY.DEFAULT_VALUE,
      [ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COMPANY.KEY]:
        ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COMPANY.DEFAULT_VALUE,
      [ADD_COMPANY_CONTACTS_CONFIG.INPUTS.JOB_TITLES.KEY]:
        ADD_COMPANY_CONTACTS_CONFIG.INPUTS.JOB_TITLES.DEFAULT_VALUE,
      [ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COUNTRY.KEY]:
        ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COUNTRY.DEFAULT_VALUE,
      [ADD_COMPANY_CONTACTS_CONFIG.INPUTS.DESCRIPTION.KEY]:
        ADD_COMPANY_CONTACTS_CONFIG.INPUTS.DESCRIPTION.DEFAULT_VALUE,
      [ADD_COMPANY_CONTACTS_CONFIG.INPUTS.IN_STOCK.KEY]:
        ADD_COMPANY_CONTACTS_CONFIG.INPUTS.IN_STOCK.DEFAULT_VALUE,
      [ADD_COMPANY_CONTACTS_CONFIG.INPUTS.PRICE.KEY]:
        ADD_COMPANY_CONTACTS_CONFIG.INPUTS.PRICE.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_COMPANY_CONTACTS_SCHEMA),
  });
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryModel | undefined
  >();
  const [selectedCompany, setSelectedCompany] = useState<
    CompanyModel | undefined
  >();

  const handleJobTitlesSelection = useCallback(
    (jobTitlesSelection: string[]) => {
      let jobTitlesSelected: JobTitleModel[] = [];
      jobTitlesSelection.forEach((selectedJobTitle) => {
        const jobTitle = jobTitles.find((jobTitle) => {
          return jobTitle.title === selectedJobTitle;
        });
        if (jobTitle) jobTitlesSelected.push(jobTitle);
      });
      return jobTitlesSelected;
    },
    [companies]
  );

  const praseFormDataToRequest = useCallback(
    (
      formData: AddCompanyContactsForm
    ): CreateManyContactsRequest | undefined => {
      if (!selectedCompany || !selectedCategory) return;

      const selectedJobTitles = handleJobTitlesSelection(formData.jobTitles);
      const selectedCountry = countryUtilService.getCountyByName(
        formData.country
      );
      return {
        ...formData,
        country: selectedCountry,
        company: selectedCompany,
        category: selectedCategory,
        jobTitles: selectedJobTitles,
        price: Number(formData.price),
        inStock: formData.inStock === "Yes",
      };
    },
    [selectedCategory, selectedCompany]
  );

  const handleSubmit = useCallback(
    async (formData: AddCompanyContactsForm) => {
      if (!window.confirm("Are you sure?")) return;

      const parsedData = praseFormDataToRequest(formData);
      if (!parsedData) return;

      await dispatch(contactActions.createManyContactsThunk(parsedData));
      formMethods.reset();
    },
    [praseFormDataToRequest]
  );

  const onError = useCallback((error: any) => {
    console.log("error", error);
  }, []);

  return (
    <Box>
      <Breadcrumb
        text={ADD_COMPANY_CONTACTS_CONFIG.FORM_NAME}
        className="mb-2"
      />

      <FormProvider {...formMethods}>
        <form
          className={classes.form}
          onSubmit={formMethods.handleSubmit(handleSubmit, onError)}
          onError={(e) => console.log(e)}
        >
          <BasicSelect
            required={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.CATEGORY.IS_REQUIRED}
            list={categories}
            name={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.CATEGORY.KEY}
            textAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.CATEGORY.ACCESSORS.VALUE
            }
            valueAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.CATEGORY.ACCESSORS.VALUE
            }
            label={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.CATEGORY.LABEL}
            handleChange={(value?: CategoryModel) => setSelectedCategory(value)}
          />
          <BasicSelect
            disabled={!selectedCategory}
            required={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COMPANY.IS_REQUIRED}
            list={categoryManagerUtilService.getCompaniesByCategory(
              selectedCategory
            )}
            name={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COMPANY.KEY}
            textAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COMPANY.ACCESSORS.VALUE
            }
            valueAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COMPANY.ACCESSORS.VALUE
            }
            label={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COMPANY.LABEL}
            handleChange={(value?: CompanyModel) => setSelectedCompany(value)}
          />
          <MultiSelectController
            label={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.JOB_TITLES.LABEL}
            options={jobTitles}
            accessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.JOB_TITLES.ACCESSORS.VALUE
            }
            name={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.JOB_TITLES.KEY}
            required={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.JOB_TITLES.IS_REQUIRED}
          />
          <BasicSelect
            required={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COUNTRY.IS_REQUIRED}
            list={countries}
            name={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COUNTRY.KEY}
            textAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COUNTRY.ACCESSORS.VALUE
            }
            valueAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COUNTRY.ACCESSORS.VALUE
            }
            label={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.COUNTRY.LABEL}
          />
          <BasicSelect
            required={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.IN_STOCK.IS_REQUIRED}
            list={IS_IN_STOCK}
            name={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.IN_STOCK.KEY}
            textAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.IN_STOCK.ACCESSORS.VALUE
            }
            valueAccessor={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.IN_STOCK.ACCESSORS.VALUE
            }
            label={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.IN_STOCK.LABEL}
          />
          <Input
            type="number"
            name={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.PRICE.KEY}
            label={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.PRICE.LABEL}
          />
          <Input
            required={
              ADD_COMPANY_CONTACTS_CONFIG.INPUTS.DESCRIPTION.IS_REQUIRED
            }
            name={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.DESCRIPTION.KEY}
            label={ADD_COMPANY_CONTACTS_CONFIG.INPUTS.DESCRIPTION.LABEL}
          />
          <ButtonPrimary>Submit</ButtonPrimary>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddCompanyContacts;
