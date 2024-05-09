import { Route, Routes } from "react-router-dom";
import { BASE_ROUTES } from "../../base-routes";
import { BoardRoutesWrapper } from "./BoardRoutesWrapper";
import { BOARD_PAGE_ROUTES } from "../../board-routes";
import Home from "../../../pages/home-pages/Home";
import Users from "../../../pages/users/Users";

export const BoardRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.BASE} element={<BoardRoutesWrapper />}>
        <Route
          path={BOARD_PAGE_ROUTES.PAGES.HOME.ROUTE_NAME}
          element={<Home />}
        />
        <Route
          path={BOARD_PAGE_ROUTES.PAGES.USERS.ROUTE_NAME}
          element={<Users />}
        />
        <Route
          path={BOARD_PAGE_ROUTES.PAGES.USERS.ROUTE_NAME}
          element={<Users />}
          //           path: ROUTES.USERS_BILLING_PAGE.FULL_ROUTE_NAME,
          //           element: <UsersBilling />,
        />
      </Route>
    </Routes>
  );
};
