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

export const AddContactModal = () => {
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    dispatch(modalActions.closeAddContactModal());
  }, []);

  const handleSubmit = useCallback(
    async (formData: ContactDetailsForm, selectedAgent?: UserModel) => {
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
        agent: contactUtilService.assembleAgent(selectedAgent),
        price: +formData.price,
        inStock: formData.inStock === "Yes" ? true : false,
        emails: [
          contactUtilService.createNewEmail(formData.email, formData.emailType),
        ],
        _id: "",
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
