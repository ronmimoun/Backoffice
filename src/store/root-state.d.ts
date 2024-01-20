import { CategoryManagerState } from "./categoryManager/categoryManager-state";
import { ContactState } from "./contact/contact-state";
import { GlobalState } from "./global/global-state";
import { ModalState } from "./modal/modal-state";
import { UserState } from "./user/user-state";
type RootState = {
  user: UserState;
  global: GlobalState;
  modal: ModalState;
  contact: ContactState;
  categoryManager: CategoryManagerState;
};
