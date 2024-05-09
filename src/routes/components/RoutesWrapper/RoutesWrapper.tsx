import { useEffect } from "react";
import { userSelectors } from "../../../store/user/user.selectors";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.constants";

export const RoutesWrapper = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate(ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME);
  }, []);

  return <Outlet />;
};
