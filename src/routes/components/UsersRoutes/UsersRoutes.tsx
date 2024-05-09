import { Route, Routes } from "react-router-dom";
import { BASE_ROUTES } from "../../base-routes";
import { UsersBilling } from "../../../pages/users-page/UsersBilling/UsersBilling";
import { USERS_PAGE_ROUTES } from "../../users-routes";
import CreditTransactions from "../../../pages/users-page/CreditTransactions/CreditTransactions";
import PendingUsers from "../../../pages/users-page/PendingUsers/PendingUsers";
import SupportChat from "../../../pages/users-page/SupportChat/SupportChat";
import User from "../../../pages/users-page/User/User";
import Users from "../../../pages/users-page/Users/Users";

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.BASE} element={<Users />} />
      <Route
        path={USERS_PAGE_ROUTES.PAGES.BILLING.FULL_ROUTE_NAME}
        element={<UsersBilling />}
      />
      <Route
        path={USERS_PAGE_ROUTES.PAGES.CREDIT_TRANSACTIONS.FULL_ROUTE_NAME}
        element={<CreditTransactions />}
      />
      <Route
        path={USERS_PAGE_ROUTES.PAGES.PENDING_USERS.FULL_ROUTE_NAME}
        element={<PendingUsers />}
      />
      <Route
        path={USERS_PAGE_ROUTES.PAGES.SUPPORT_CHAT.FULL_ROUTE_NAME}
        element={<SupportChat />}
      />
      <Route
        path={USERS_PAGE_ROUTES.PAGES.USER.FULL_ROUTE_NAME}
        element={<User />}
      />
    </Routes>
  );
};
