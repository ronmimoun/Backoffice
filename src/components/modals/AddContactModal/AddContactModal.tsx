import { useCallback } from "react";
import { ModalBase } from "../ModalBase/ModalBase";
import { useAppDispatch } from "../../../store";
import { modalActions } from "../../../store/modal/modal.actions";
import { ContactForm } from "../../form/ContactForm/ContactForm";
import { ContactDetailsForm } from "../../../form/schemas/contactDetailsSchema";
import { UserModel } from "../../../types/user.type";
import { UpdateContactRequest } from "../../../models/contact/update/updateContact.request";
import { contactUtilService } from "../../../utils/contact.utils";
import { contactActions } from "../../../store/contact/contact.actions";
import { fileApiService } from "../../../services/api/file.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import { ImageModel } from "../../../types/image.type";
import { toast } from "react-toastify";
import { MESSAGES } from "../../../constants/messages.constants";

export const AddContactModal = () => {
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    dispatch(modalActions.closeAddContactModal());
  }, []);

  const handleSubmit = useCallback(
    async (formData: ContactDetailsForm, selectedAgent?: UserModel) => {
      const response = (await fileApiService.controlledUpload(
        formData.img
      )) as ApiResponse<ImageModel>;

      if (!response.isSucceeded || !response.data?.content) {
        toast.error(MESSAGES.HTTP_ERROR.UPLOAD_IMAGE.MESSAGE);
      } else {
        formData = { ...formData, img: response.data?.content };
      }

      const parsedContact = parseContact(formData, selectedAgent);
      await dispatch(contactActions.createContactThunk(parsedContact));
      closeModal();
    },
    []
  );

  const parseContact = useCallback(
    (
      formData: ContactDetailsForm,
      selectedAgent?: UserModel
    ): UpdateContactRequest => {
      return {
        ...formData,
        img: formData.img,
        agent: contactUtilService.assembleAgent(selectedAgent),
        price: +formData.price,
        inStock: formData.inStock === "Yes" ? true : false,
        emails: [
          contactUtilService.createNewEmail(formData.email, formData.emailType),
        ],
      };
    },
    []
  );

  return (
    <ModalBase open={true} title={"Add Contact"} onClose={closeModal}>
      <ContactForm handleSubmit={handleSubmit} />
    </ModalBase>
  );
};
