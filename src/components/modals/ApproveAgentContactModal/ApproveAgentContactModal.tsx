import classes from "./ApproveAgentContactModal.module.scss";
import { useSelector } from "react-redux";
import { ModalBase } from "../ModalBase/ModalBase";
import { modalSelectors } from "../../../store/modal/modal.selectors";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryManagerUtilService } from "../../../utils/category-manager.utils";
import { CategoryModel } from "../../../store/categoryManager/categoryManager-state";
import { useAppDispatch } from "../../../store";
import { modalActions } from "../../../store/modal/modal.actions";
import {
  APPROVAL_AGENT_CONTACT_CONFIG,
  APPROVAL_AGENT_CONTACT_SCHEMA,
  ApprovalAgentContactForm,
} from "../../../form/schemas/approvalAgentContactSchema";
import { categoryManagerSelectors } from "../../../store/categoryManager/categoryManager.selectors";
import { Input } from "../../ui/Input/Input";
import { Box, Typography } from "@mui/material";
import { ButtonPrimary } from "../../ui/Button/ButtonPrimary";
import BasicSelectController from "../../controllers/BasicSelectController/BasicSelectController";

export const ApproveAgentContactModal = () => {
  const dispatch = useAppDispatch();
  const { categories, jobTitles, countries } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryModel | undefined
  >();
  const contactPayload = useSelector(
    modalSelectors.approveAgentContactModalPayload()
  );
  const formMethods = useForm<ApprovalAgentContactForm>({
    defaultValues: {
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.CATEGORY.KEY]:
        contactPayload.category ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.CATEGORY.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COMPANY.KEY]:
        contactPayload.company ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COMPANY.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.NAME.KEY]:
        contactPayload.name ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.NAME.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.FAMILY_NAME.KEY]:
        contactPayload.familyName ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.FAMILY_NAME.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.JOB_TITLE.KEY]:
        contactPayload.jobTitle ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.JOB_TITLE.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COUNTRY.KEY]:
        contactPayload.country ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COUNTRY.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.DESCRIPTION.KEY]:
        contactPayload.desc ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.DESCRIPTION.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.PHONE.KEY]:
        contactPayload.phone ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.PHONE.DEFAULT_VALUE,
      [APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.LINKED_IN_LINK.KEY]:
        contactPayload.linkedinLink ||
        APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.LINKED_IN_LINK.DEFAULT_VALUE,
    },
    resolver: zodResolver(APPROVAL_AGENT_CONTACT_SCHEMA),
  });

  const handleCloseModal = useCallback(() => {
    dispatch(modalActions.closeApproveAgentContactModal());
  }, []);

  const handleSubmit = useCallback((dataForm: ApprovalAgentContactForm) => {
    console.log("dataForm", dataForm);
  }, []);

  return (
    <ModalBase open={true} onClose={handleCloseModal}>
      <>
        <Box className="m_xy_1">
          <Typography variant="h4">Agent contact request approval</Typography>
        </Box>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <Box className={classes.form__wrapper}>
              <Box className={classes.form_width_100}>
                <BasicSelectController
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.CATEGORY.IS_REQUIRED
                  }
                  list={categories}
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.CATEGORY.KEY}
                  textAccessor={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.CATEGORY.ACCESSORS
                      .VALUE
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.CATEGORY.LABEL}
                  handleChange={(category) =>
                    setSelectedCategory(category as CategoryModel)
                  }
                />
                <BasicSelectController
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COMPANY.IS_REQUIRED
                  }
                  list={categoryManagerUtilService.getCompaniesByCategory(
                    selectedCategory
                  )}
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COMPANY.KEY}
                  textAccessor={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COMPANY.ACCESSORS.VALUE
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COMPANY.LABEL}
                />
                <Input
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.NAME.KEY}
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.NAME.IS_REQUIRED
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.NAME.LABEL}
                />
                <Input
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.FAMILY_NAME.KEY}
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.FAMILY_NAME.IS_REQUIRED
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.FAMILY_NAME.LABEL}
                />
                <Input
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.LINKED_IN_LINK.KEY}
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.LINKED_IN_LINK
                      .IS_REQUIRED
                  }
                  label={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.LINKED_IN_LINK.LABEL
                  }
                />
              </Box>
              <Box className={classes.form_width_100}>
                <BasicSelectController
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.JOB_TITLE.IS_REQUIRED
                  }
                  list={jobTitles}
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.JOB_TITLE.KEY}
                  textAccessor={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.JOB_TITLE.ACCESSORS
                      .VALUE
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.JOB_TITLE.LABEL}
                />
                <BasicSelectController
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COUNTRY.IS_REQUIRED
                  }
                  list={countries}
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COUNTRY.KEY}
                  textAccessor={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COUNTRY.ACCESSORS.VALUE
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.COUNTRY.LABEL}
                />
                <Input
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.DESCRIPTION.KEY}
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.DESCRIPTION.IS_REQUIRED
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.DESCRIPTION.LABEL}
                />
                <Input
                  name={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.PHONE.KEY}
                  required={
                    APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.PHONE.IS_REQUIRED
                  }
                  label={APPROVAL_AGENT_CONTACT_CONFIG.INPUTS.PHONE.LABEL}
                />
              </Box>
            </Box>
            <ButtonPrimary
              className="flex_center"
              isLoading={false}
              type="submit"
            >
              Approve
            </ButtonPrimary>
          </form>
        </FormProvider>
      </>
    </ModalBase>
  );
};
