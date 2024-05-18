import TableBase from "../../../components/ui/table/TableBase/TableBase";
import { useCallback, useMemo, useState } from "react";
import { contactGptColumn } from "../../../columns/contact-gpt.column";
import { useSelector } from "react-redux";
import { contactSelectors } from "../../../store/contact/contact.selectors";
import { EditIcon } from "../../../components/ui/Icons";
import { ContactModel } from "../../../types/contact.type";
import { ActionColumn } from "../../../components/ui/table/ActionColumnBase/ActionColumnBase";
import { RenderByBoolean } from "../../../components/shared/RenderByBoolean/RenderByBoolean";
import { llmApiService } from "../../../services/api/llm.api.service";
import { GetContactDetailsRequest } from "../../../types/llm/get-contact-details";
import { ReviewContactInformation } from "./ReviewContactInformation/ReviewContactInformation";
import { contactApiService } from "../../../services/api/contact.api.service";
import { useAppDispatch } from "../../../store";
import { contactActions } from "../../../store/contact/contact.actions";

enum PageStepsEnum {
  ContactPicker,
  ContactDetails,
}

type PageStepper = {
  contact: ContactModel | null;
  currentStep: PageStepsEnum;
  generatedContactInfo?: string;
};

export const ReviewContactWithChatGpt = () => {
  const contacts = useSelector(contactSelectors.getContacts());
  const [stepInfo, setStepInfo] = useState<PageStepper>({
    contact: null,
    currentStep: PageStepsEnum.ContactPicker,
  });
  const dispatch = useAppDispatch();

  const handleLastGeneratedInfoSearch = useCallback(
    async (contact: ContactModel, lastGeneratedInfoSearch: string) => {
      const lastGeneratedInfoSearchResponse =
        await contactApiService.updateLastGeneratedInfoSearch({
          contactId: contact._id,
          lastGeneratedInfoSearch,
        });

      if (
        !lastGeneratedInfoSearchResponse.isSucceeded ||
        !lastGeneratedInfoSearchResponse.data?.content
      )
        return;

      dispatch(
        contactActions.updateContact(
          lastGeneratedInfoSearchResponse.data.content
        )
      );
    },
    []
  );

  const handleGetContactInformation = useCallback(
    async (contact: ContactModel): Promise<string | undefined> => {
      const payload: GetContactDetailsRequest = {
        name: contact.name,
        lastName: contact.familyName,
        company: contact.company,
        jobTitle: contact.jobTitle,
      };

      const response = await llmApiService.getContactDetails(payload);

      if (!response.isSucceeded || !response.data || !response.data.content)
        return response.data?.content;

      await handleLastGeneratedInfoSearch(contact, response.data.content);

      return response.data.content;
    },
    [handleLastGeneratedInfoSearch]
  );

  const handleGeneratedContactInfo = useCallback(
    async (contact: ContactModel) => {
      if (contact.llmInformation?.lastGeneratedInfoSearch) {
        return contact.llmInformation.lastGeneratedInfoSearch;
      } else {
        const response = await handleGetContactInformation(contact);
        if (!response) return;
        return response;
      }
    },
    [handleGetContactInformation]
  );

  const onNavigateToNextStep = useCallback(
    async (contact: ContactModel) => {
      const result = await handleGeneratedContactInfo(contact);

      if (!result) return;

      setStepInfo({
        contact,
        currentStep: PageStepsEnum.ContactDetails,
        generatedContactInfo: result,
      });
    },
    [stepInfo.contact, handleGeneratedContactInfo]
  );

  const onClearStepInfo = useCallback(() => {
    setStepInfo({
      contact: null,
      currentStep: PageStepsEnum.ContactPicker,
    });
  }, []);

  const onRegenerateResult = useCallback(async () => {
    if (!stepInfo.contact) return;

    const result = await handleGetContactInformation(stepInfo.contact);

    setStepInfo({
      contact: stepInfo.contact,
      currentStep: PageStepsEnum.ContactDetails,
      generatedContactInfo: result,
    });
  }, [stepInfo.contact]);

  const onUpdateStepInfoContact = useCallback((contact: ContactModel) => {
    setStepInfo((prevState) => ({ ...prevState, contact }));
  }, []);

  const actions: ActionColumn<ContactModel>[] = useMemo(() => {
    return [
      {
        actionFunction: (entity: ContactModel) => onNavigateToNextStep(entity),
        icon: <EditIcon />,
      },
    ];
  }, []);

  return (
    <>
      <RenderByBoolean
        shouldRender={
          stepInfo.currentStep === PageStepsEnum.ContactPicker &&
          !stepInfo.contact
        }
      >
        <TableBase
          columns={contactGptColumn}
          rows={contacts}
          actions={actions}
          slug="Contact"
        />
      </RenderByBoolean>

      <RenderByBoolean
        shouldRender={
          !!stepInfo.contact &&
          !!stepInfo.generatedContactInfo &&
          stepInfo.currentStep === PageStepsEnum.ContactDetails
        }
      >
        <ReviewContactInformation
          contact={stepInfo.contact!}
          onClearStepInfo={onClearStepInfo}
          generatedContactInfo={stepInfo.generatedContactInfo!}
          onRegenerateResult={onRegenerateResult}
          onUpdateStepInfoContact={onUpdateStepInfoContact}
        />
      </RenderByBoolean>
    </>
  );
};
