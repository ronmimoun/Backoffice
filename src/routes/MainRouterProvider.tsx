import { DefaultAppLayout } from "../layout/DefaultAppLayout";
import { ROUTES } from "../constants/routes.constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "../store/user/user.selectors";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";

// Pages
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Users from "../pages/users/Users";
import User from "../pages/user/User";
import Login from "../pages/login/Login";
import { ModalsContainer } from "../layout/ModalsContainer";
import { UsersBilling } from "../pages/UsersBilling/UsersBilling";
import CreditTransactions from "../pages/CreditTransactions/CreditTransactions";
import AgentMessages from "../pages/AgentMessages/AgentMessages";
import PendingUsers from "../pages/PendingUsers/PendingUsers";
import { useAppDispatch } from "../store";
import { userActions } from "../store/user/user.actions";
import { contactActions } from "../store/contact/contact.actions";
import Contacts from "../pages/Contacts/Contacts";
import { categoryManagerActions } from "../store/categoryManager/categoryManager.actions";
import { globalThunkActions } from "../store/global/global.thunk-builder";
import ContactsFeedback from "../pages/ContactsFeedback/ContactsFeedback";
import AgentContactRequest from "../pages/AgentContactRequest/AgentContactRequest";
import SupportChat from "../pages/SupportChat/SupportChat";
import AddCompanyContacts from "../pages/AddCompanyContacts/AddCompanyContacts";

const MainRouterProvider = () => {
  const Layout = () => {
    const currentUser = useSelector(userSelectors.currentUser());
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!currentUser) navigate(ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME);
      dispatch(userActions.getUsersThunk());
      dispatch(contactActions.getContactsThunk());
      dispatch(categoryManagerActions.initializeCategoryManagerThunk());
      dispatch(globalThunkActions.globalInitThunk());
    }, []);

    return (
      <>
        <Navbar />
        <DefaultAppLayout />
        <ModalsContainer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: ROUTES.BASE,
      element: <Layout />,
      children: [
        {
          path: ROUTES.HOME_PAGE.FULL_ROUTE_NAME,
          element: <Home />,
        },
        {
          path: ROUTES.USERS_PAGE.FULL_ROUTE_NAME,
          element: <Users />,
        },
        {
          path: ROUTES.USERS_PAGE.FULL_ROUTE_NAME_VARIABLE,
          element: <User />,
        },
        {
          path: ROUTES.USERS_BILLING_PAGE.FULL_ROUTE_NAME,
          element: <UsersBilling />,
        },
        {
          path: ROUTES.USERS_BILLING_PAGE.FULL_ROUTE_NAME,
          element: <UsersBilling />,
        },
        {
          path: ROUTES.CREDIT_TRANSACTION_PAGE.FULL_ROUTE_NAME,
          element: <CreditTransactions />,
        },
        {
          path: ROUTES.AGENT_MESSAGES_PAGE.FULL_ROUTE_NAME,
          element: <AgentMessages />,
        },
        {
          path: ROUTES.PENDING_USERS_PAGE.FULL_ROUTE_NAME,
          element: <PendingUsers />,
        },
        {
          path: ROUTES.CONTACTS_PAGE.FULL_ROUTE_NAME,
          element: <Contacts />,
        },
        {
          path: ROUTES.CONTACTS_FEEDBACK_PAGE.FULL_ROUTE_NAME,
          element: <ContactsFeedback />,
        },
        {
          path: ROUTES.AGENT_CONTACT_REQUEST_PAGE.FULL_ROUTE_NAME,
          element: <AgentContactRequest />,
        },
        {
          path: ROUTES.SUPPORT_CHAT_PAGE.FULL_ROUTE_NAME,
          element: <SupportChat />,
        },
        {
          path: ROUTES.ADD_COMPANY_CONTACTS_PAGE.FULL_ROUTE_NAME,
          element: <AddCompanyContacts />,
        },
      ],
    },
    {
      path: ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME,
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRouterProvider;
