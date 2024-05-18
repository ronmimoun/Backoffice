import classes from "./ReviewContactInformation.module.scss";
import { Typography } from "@mui/material";
import { ButtonPrimary } from "../../../../components/ui/Button/ButtonPrimary";
import { ContactModel } from "../../../../types/contact.type";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  REVIEW_CONTACT_INFORMATION_FORM_CONFIG,
  REVIEW_CONTACT_INFORMATION_SCHEMA,
  ReviewContactInformationForm,
} from "../../../../form/schemas/reviewContactInformationWithAiSchema";
import { useCallback, useEffect } from "react";
import { TextareaController } from "../../../../components/controllers/TextareaController/TextareaController";
import { contactApiService } from "../../../../services/api/contact.api.service";
import { toast } from "react-toastify";
import { MESSAGES } from "../../../../constants/messages.constants";
import { RenderByBoolean } from "../../../../components/shared/RenderByBoolean/RenderByBoolean";
import { useAppDispatch } from "../../../../store";
import { contactActions } from "../../../../store/contact/contact.actions";

type ReviewContactInformationProps = {
  onClearStepInfo: () => void;
  contact: ContactModel;
  generatedContactInfo: string;
  onRegenerateResult: () => void;
  onUpdateStepInfoContact: (contact: ContactModel) => void;
};

export const ReviewContactInformation = ({
  contact,
  onClearStepInfo,
  generatedContactInfo,
  onRegenerateResult,
  onUpdateStepInfoContact,
}: ReviewContactInformationProps) => {
  const formMethods = useForm<ReviewContactInformationForm>({
    defaultValues: {
      [REVIEW_CONTACT_INFORMATION_FORM_CONFIG.INPUTS.CONTACT_LLM_INFORMATION
        .KEY]:
        REVIEW_CONTACT_INFORMATION_FORM_CONFIG.INPUTS.CONTACT_LLM_INFORMATION
          .DEFAULT_VALUE,
    },
    resolver: zodResolver(REVIEW_CONTACT_INFORMATION_SCHEMA),
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    formMethods.setValue("contactLLMInformation", generatedContactInfo);
  }, [generatedContactInfo]);

  const handleRegenerateResult = useCallback(() => {
    onRegenerateResult();
  }, []);

  const onSubmit = useCallback(
    async ({ contactLLMInformation }: ReviewContactInformationForm) => {
      const response = await contactApiService.updateContactAiInformation({
        submittedInfoSearch: contactLLMInformation,
        contactId: contact._id,
      });

      if (!response.isSucceeded || !response.data) {
        toast.error(MESSAGES.PAGES.LLM.REVIEW_CONTACT_INFORMATION.SAVED_FAILED);
        return;
      }
      const updatedContact = response.data.content;

      onUpdateStepInfoContact(updatedContact);

      dispatch(contactActions.updateContact(updatedContact));

      toast.success(
        MESSAGES.PAGES.LLM.REVIEW_CONTACT_INFORMATION.SAVED_SUCCESSFULLY
      );
    },
    [contact._id]
  );

  return (
    <>
      <ButtonPrimary onClickFunction={onClearStepInfo}>Return</ButtonPrimary>

      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className={classes.form}
        >
          <Typography variant="h5" className={classes.title}>
            Contact: {`${contact.name} ${contact.familyName}`}
          </Typography>
          <TextareaController
            className={classes.textarea}
            inputProps={{ className: classes.textarea_input }}
            name={
              REVIEW_CONTACT_INFORMATION_FORM_CONFIG.INPUTS
                .CONTACT_LLM_INFORMATION.KEY
            }
          />

          <RenderByBoolean
            shouldRender={!!contact.llmInformation?.submittedInfoSearch}
          >
            <div className={classes.divider}></div>
            <div className={classes.info_search}>
              <Typography
                variant="body1"
                fontWeight={700}
                className={classes.info_search__text}
              >
                Current saved information about contact:
              </Typography>
              <Typography variant="body1" className={classes.info_search__text}>
                {contact.llmInformation!.submittedInfoSearch}
              </Typography>
            </div>
          </RenderByBoolean>

          <ButtonPrimary>Save Result</ButtonPrimary>
        </form>
        <ButtonPrimary onClickFunction={handleRegenerateResult}>
          Regenerate Result
        </ButtonPrimary>
      </FormProvider>
    </>
  );
};
