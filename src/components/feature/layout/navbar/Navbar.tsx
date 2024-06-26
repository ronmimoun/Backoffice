import classes from "./navbar.module.scss";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../../store/user/user.selectors";
import { NO_IMAGE_FALLBACK } from "../../../../constants/image.constants";
import { LogoIcon } from "../../../ui/Icons";
import { ButtonPrimary } from "../../../ui/Button/ButtonPrimary";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../store";
import { userActions } from "../../../../store/user/user.actions";
import { ApiResponse } from "../../../../models/base/api-base";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE_ROUTES } from "../../../../routes/login-routes";

const Navbar = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleLogout = useCallback(async () => {
    const response = (await dispatch(userActions.logoutThunk()))
      .payload as ApiResponse<void>;
    if (!response.isSucceeded) return;
    nav(LOGIN_PAGE_ROUTES.FULL_ROUTE_NAME);
  }, []);

  if (!currentUser) return <></>;
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <LogoIcon />
        <span>Qleads</span>
      </div>
      <div className={classes.icons}>
        <ButtonPrimary onClickFunction={handleLogout}>Logout</ButtonPrimary>
        <div className={classes.user}>
          <img src={currentUser.imgUrl?.url || NO_IMAGE_FALLBACK} alt="" />
          <span>{currentUser.fullname}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
