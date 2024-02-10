import classes from "./Contact.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { contactApiService } from "../../services/api/contact.api.service";
import { useSelector } from "react-redux";
import { contactSelectors } from "../../store/contact/contact.selectors";
import { ContactModel } from "../../types/contact.type";
import ParsedObjectDetails from "../../components/shared/ParsedObjectDetails/ParsedObjectDetails";
import { NO_IMAGE_FALLBACK } from "../../constants/image.constants";
import { contactUtilService } from "../../utils/contact.utils";
import { ContactEmailsEnum } from "../../enums/contact.enum";
import { Box } from "@mui/material";
import { ContactForm } from "../../components/form/ContactForm/ContactForm";
import { useAppDispatch } from "../../store";
import { contactActions } from "../../store/contact/contact.actions";
import { UpdateContactRequest } from "../../models/contact/update/updateContact.request";
import { UserModel } from "../../types/user.type";
import { ContactDetailsForm } from "../../form/schemas/contactDetailsSchema";
import { fileApiService } from "../../services/api/file.api.service";
import { ImageModel } from "../../types/image.type";
import { ApiResponse } from "../../models/base/api-base";
import { MESSAGES } from "../../constants/messages.constants";
import { toast } from "react-toastify";
import { UpdateContactResponse } from "../../models/contact/update/updateContact.response";

const Contact = () => {
  const { _id } = useParams();
  const dispatch = useAppDispatch();

  const contacts = useSelector(contactSelectors.getContacts());
  const getContactFromStateById = useSelector(
    contactSelectors.getContactFromStateById(_id)
  );
  const [contact, setContact] = useState<ContactModel | undefined>(
    getContactFromStateById
  );

  useEffect(() => {
    const loadContactById = async (_id: string) => {
      const response = await contactApiService.getContactById(_id);
      if (!response.isSucceeded || !response.data?.content) return;
      setContact(response.data.content);
    };

    if (_id && !getContactFromStateById) loadContactById(_id);
  }, []);

  const parsedUserDetails = useMemo(() => {
    if (!contact) return {};

    return {
      Id: contact._id,
      Name: contact.name,
      "Family Name": contact.familyName,
      Company: contact?.company,
      "Job Title": contact.jobTitle,
      Category: contact.category,
      "Personal Email": contactUtilService.getContactEmailByType(
        contact._id,
        ContactEmailsEnum.Personal
      ),
      "Work Email": contactUtilService.getContactEmailByType(
        contact._id,
        ContactEmailsEnum.Work
      ),
      Description: contact.desc,
      Phone: contact.phone,
      Price: contact.price,
      Country: contact.country,
      LinkedIn: contact.linkedinLink,
      "Is in Stock": contact.inStock ? "Yes" : "No",
      "Is Agent": contact?.agent?.fullname ? "Yes" : "No",
    };
  }, [contacts, contact]);

  const handleSubmit = useCallback(
    async (formData: ContactDetailsForm, selectedAgent?: UserModel) => {
      if (!contact?._id) return;

      const response = (await fileApiService.controlledUpload(
        formData.img
      )) as ApiResponse<ImageModel>;

      if (!response.isSucceeded || !response.data?.content) {
        toast.error(MESSAGES.HTTP_ERROR.UPLOAD_IMAGE.MESSAGE);
      } else {
        formData = { ...formData, img: response.data?.content };
      }

      const parsedContact = parseContactToMatchType(formData, selectedAgent);
      if (!parsedContact) return;

      const updatedContactResponse = (
        await dispatch(contactActions.updateContactThunk(parsedContact))
      ).payload as ApiResponse<UpdateContactResponse>;
      if (
        !updatedContactResponse.isSucceeded ||
        !updatedContactResponse.data?.content
      )
        return;

      setContact(updatedContactResponse.data.content);
    },
    [contact]
  );

  const parseContactToMatchType = (
    formData: ContactDetailsForm,
    selectedAgent?: UserModel
  ): UpdateContactRequest | undefined => {
    if (!contact) return;
    return {
      ...formData,
      _id: contact._id,
      img: formData.img || contact.img,
      agent: contactUtilService.assembleAgent(selectedAgent) || contact.agent,
      inStock: formData.inStock === "Yes" ? true : false,
      price: +formData.price,
      emails:
        contactUtilService.updateContactEmail(
          contact._id,
          formData.emailType,
          formData.email
        ) || contact.emails,
    };
  };

  if (!contact) return <></>;
  return (
    <Box className={classes.container}>
      <ParsedObjectDetails
        className={"flex_1"}
        entityId={contact._id}
        details={parsedUserDetails}
        imgUrl={contact?.img?.url || NO_IMAGE_FALLBACK}
        title={`${contact.name} ${contact.familyName}`}
      />
      <hr className={classes.container__horizontal} />
      <ContactForm contact={contact} handleSubmit={handleSubmit} />
    </Box>
  );
};

export default Contact;
