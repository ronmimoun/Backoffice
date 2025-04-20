import { useEffect } from "react";
import { userSelectors } from "../../../store/user/user.selectors";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGIN_PAGE_ROUTES } from "../../login-routes";

export const RoutesWrapper = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !currentUser ||
      LOGIN_PAGE_ROUTES.FULL_ROUTE_NAME.includes(window.location.pathname)
    )
      navigate(LOGIN_PAGE_ROUTES.FULL_ROUTE_NAME);
  }, []);

  return <Outlet />;
};
