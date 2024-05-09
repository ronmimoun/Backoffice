import { Route, Routes } from "react-router-dom";
import { BASE_ROUTES } from "../../base-routes";
import Contacts from "../../../pages/contacts-pages/Contacts/Contacts";
import ContactsFeedback from "../../../pages/contacts-pages/ContactsFeedback/ContactsFeedback";
import { CONTACTS_PAGE_ROUTES } from "../../contacts-routes";
import AddCompanyContacts from "../../../pages/contacts-pages/AddCompanyContacts/AddCompanyContacts";
import AgentContactRequest from "../../../pages/contacts-pages/AgentContactRequest/AgentContactRequest";
import Contact from "../../../pages/contacts-pages/Contact/Contact";

export const ContactsRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.BASE} element={<Contacts />} />
      <Route
        path={CONTACTS_PAGE_ROUTES.PAGES.FEEDBACK.FULL_ROUTE_NAME}
        element={<ContactsFeedback />}
      />
      <Route
        path={CONTACTS_PAGE_ROUTES.PAGES.ADD_COMPANY_CONTACTS.FULL_ROUTE_NAME}
        element={<AddCompanyContacts />}
      />
      <Route
        path={
          CONTACTS_PAGE_ROUTES.PAGES.CONTACTS_AGENT_REQUESTS.FULL_ROUTE_NAME
        }
        element={<AgentContactRequest />}
      />
      <Route
        path={CONTACTS_PAGE_ROUTES.PAGES.CONTACT.FULL_ROUTE_NAME}
        element={<Contact />}
      />
    </Routes>
  );
};
