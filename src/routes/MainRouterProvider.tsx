import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Login from "../pages/auth-pages/login/Login";
import { RoutesWrapper } from "./components/RoutesWrapper/RoutesWrapper";
import { BASE_ROUTES } from "./base-routes";
import { BOARD_PAGE_ROUTES } from "./board-routes";
import { BoardRoutes } from "./components/BoardRoutes/BoardRoutes";
import { LOGIN_PAGE_ROUTES } from "./login-routes";

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path={BASE_ROUTES.BASE} element={<RoutesWrapper />}>
      <Route
        path={BOARD_PAGE_ROUTES.ASTERISK_ROUTE_NAME_PATH}
        element={<BoardRoutes />}
      />
      <Route path={LOGIN_PAGE_ROUTES.FULL_ROUTE_NAME} element={<Login />} />
    </Route>
  )
);

export const MainRouterProvider = () => {
  return <RouterProvider router={mainRouter} />;
};
