import classes from "./ContactForm.module.scss";
import {
  CONTACT_DETAILS_FORM_CONFIG,
  CONTACT_DETAILS_SCHEMA,
  ContactDetailsForm,
} from "../../../form/schemas/contactDetailsSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactEmailsEnum } from "../../../enums/contact.enum";
import { ContactModel } from "../../../types/contact.type";
import { contactUtilService } from "../../../utils/contact.utils";
import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Input } from "../../ui/Input/Input";
import { ButtonPrimary } from "../../ui/Button/ButtonPrimary";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../../store/categoryManager/categoryManager.selectors";
import { globalSelectors } from "../../../store/global/global.selectors";
import { UserModel } from "../../../types/user.type";
import { contactSelectors } from "../../../store/contact/contact.selectors";
import { userSelectors } from "../../../store/user/user.selectors";
import {
  CategoryModel,
  CompanyModel,
} from "../../../store/categoryManager/categoryManager-state";
import BasicSelectController from "../../controllers/BasicSelectController/BasicSelectController";

const IS_IN_STOCK = [{ name: "Yes" }, { name: "No" }];

const EMAIL_TYPES = [
  { type: ContactEmailsEnum.Personal },
  { type: ContactEmailsEnum.Work },
];

type ContactFormProps = {
  contact?: ContactModel;
  handleSubmit?: (
    formData: ContactDetailsForm,
    selectedAgent?: UserModel
  ) => void;
};

export const ContactForm = ({ contact, handleSubmit }: ContactFormProps) => {
  const contacts = useSelector(contactSelectors.getContacts());
  const users = useSelector(userSelectors.getUsers());
  const countries = useSelector(globalSelectors.countries);
  const { companies, jobTitles, categories } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const [selectedAgent, setSelectedAgent] = useState<UserModel | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryModel | undefined
  >();
  const [selectedCompany, setSelectedCompany] = useState<
    CompanyModel | undefined
  >();
  const formMethods = useForm<ContactDetailsForm>({
    defaultValues: {
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.COMPANY.KEY]:
        contact?.company ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.COMPANY.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.NAME.KEY]:
        contact?.name || CONTACT_DETAILS_FORM_CONFIG.INPUTS.NAME.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.FAMILY_NAME.KEY]:
        contact?.familyName ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.FAMILY_NAME.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL.KEY]:
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.DESCRIPTION.KEY]:
        contact?.desc ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.DESCRIPTION.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.PHONE.KEY]:
        contact?.phone ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.PHONE.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.PRICE.KEY]:
        contact?.price.toString() ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.PRICE.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.COUNTRY.KEY]:
        contact?.country ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.COUNTRY.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.LINKED_IN_LINK.KEY]:
        contact?.linkedinLink ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.LINKED_IN_LINK.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.IN_STOCK.KEY]: contact?.inStock
        ? "Yes"
        : "No" || CONTACT_DETAILS_FORM_CONFIG.INPUTS.IN_STOCK.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.AGENT.KEY]:
        contact?.agent?.fullname ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.AGENT.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.JOB_TITLE.KEY]:
        contact?.jobTitle ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.JOB_TITLE.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.CATEGORY.KEY]:
        contact?.category ||
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.CATEGORY.DEFAULT_VALUE,
      [CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.KEY]:
        CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.DEFAULT_VALUE,
    },
    resolver: zodResolver(CONTACT_DETAILS_SCHEMA),
  });

  useEffect(() => {
    if (!contact) return;
    const contactEmail = contactUtilService.getContactEmailByType(
      contact._id,
      CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.DEFAULT_VALUE
    );

    if (!contactEmail) return;
    formMethods.setValue("email", contactEmail);
  }, [contacts, contact]);

  const onSubmit = useCallback(
    (formData: ContactDetailsForm) => {
      handleSubmit && handleSubmit(formData, selectedAgent);
    },
    [handleSubmit, selectedAgent]
  );

  const onError = (x: any) => {
    console.log("error", x);
  };

  const getCompaniesByCategory = useCallback(() => {
    if (!selectedCategory) return companies;
    return companies.filter(
      (company) => company.category === selectedCategory.cat
    );
  }, [companies, selectedCategory]);

  const getCategoriesByCompany = useCallback(() => {
    if (!selectedCompany) return categories;
    return categories.filter(
      (category) => category.cat === selectedCompany?.category
    );
  }, [categories, selectedCompany]);

  const getAgentUsers = useCallback((): UserModel[] | [] => {
    if (!users.length) return [];
    return users.filter((user) => user.permissions.includes("agent"));
  }, [users]);

  return (
    <FormProvider {...formMethods}>
      <form
        className={classes.form}
        onSubmit={formMethods.handleSubmit(onSubmit, onError)}
      >
        <Box className={"flex_column"}>
          <Box className={"flex gap_1"}>
            <Box className={classes.form__input_section}>
              <BasicSelectController
                value={selectedCategory?.title}
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.CATEGORY.IS_REQUIRED
                }
                list={getCategoriesByCompany()}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.CATEGORY.KEY}
                textAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.CATEGORY.ACCESSORS.VALUE
                }
                valueAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.CATEGORY.ACCESSORS.VALUE
                }
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.CATEGORY.LABEL}
                handleChange={(category) =>
                  setSelectedCategory(category as CategoryModel)
                }
              />
              <Input
                required={CONTACT_DETAILS_FORM_CONFIG.INPUTS.NAME.IS_REQUIRED}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.NAME.KEY}
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.NAME.LABEL}
              />
              <Input
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.FAMILY_NAME.IS_REQUIRED
                }
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.FAMILY_NAME.KEY}
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.FAMILY_NAME.LABEL}
              />
              <Input
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.DESCRIPTION.IS_REQUIRED
                }
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.DESCRIPTION.KEY}
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.DESCRIPTION.LABEL}
              />
              <BasicSelectController
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.JOB_TITLE.IS_REQUIRED
                }
                list={jobTitles}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.JOB_TITLE.KEY}
                textAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.JOB_TITLE.ACCESSORS.VALUE
                }
                valueAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.JOB_TITLE.ACCESSORS.VALUE
                }
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.JOB_TITLE.LABEL}
              />
              <BasicSelectController
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.IS_REQUIRED
                }
                list={EMAIL_TYPES}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.KEY}
                textAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.ACCESSORS.VALUE
                }
                valueAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.ACCESSORS.VALUE
                }
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL_TYPE.LABEL}
              />
              <Input
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL.KEY}
                required={CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL.IS_REQUIRED}
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.EMAIL.LABEL}
              />
            </Box>

            <Box>
              <BasicSelectController
                value={selectedCompany?.company}
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.COMPANY.IS_REQUIRED
                }
                list={getCompaniesByCategory()}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.COMPANY.KEY}
                textAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.COMPANY.ACCESSORS.VALUE
                }
                valueAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.COMPANY.ACCESSORS.VALUE
                }
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.COMPANY.LABEL}
                handleChange={(company) =>
                  setSelectedCompany(company as CompanyModel)
                }
              />
              <Input
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.PHONE.KEY}
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.PHONE.LABEL}
              />
              <Input
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.PRICE.KEY}
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.PRICE.LABEL}
              />
              <Input
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.LINKED_IN_LINK.KEY}
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.LINKED_IN_LINK.LABEL}
              />
              <BasicSelectController
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.COUNTRY.IS_REQUIRED
                }
                list={countries}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.COUNTRY.KEY}
                textAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.COUNTRY.ACCESSORS.VALUE
                }
                valueAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.COUNTRY.ACCESSORS.VALUE
                }
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.COUNTRY.LABEL}
              />
              <BasicSelectController
                required={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.IN_STOCK.IS_REQUIRED
                }
                list={IS_IN_STOCK}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.IN_STOCK.KEY}
                textAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.IN_STOCK.ACCESSORS.VALUE
                }
                valueAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.IN_STOCK.ACCESSORS.VALUE
                }
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.IN_STOCK.LABEL}
              />
              <BasicSelectController
                handleChange={(user: any) => setSelectedAgent(user)}
                required={CONTACT_DETAILS_FORM_CONFIG.INPUTS.AGENT.IS_REQUIRED}
                list={getAgentUsers()}
                name={CONTACT_DETAILS_FORM_CONFIG.INPUTS.AGENT.KEY}
                textAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.AGENT.ACCESSORS.VALUE
                }
                valueAccessor={
                  CONTACT_DETAILS_FORM_CONFIG.INPUTS.AGENT.ACCESSORS.VALUE
                }
                label={CONTACT_DETAILS_FORM_CONFIG.INPUTS.AGENT.LABEL}
              />
            </Box>
          </Box>
          <ButtonPrimary
            className="flex_center"
            isLoading={false}
            type="submit"
          >
            Submit
          </ButtonPrimary>
        </Box>
      </form>
    </FormProvider>
  );
};
