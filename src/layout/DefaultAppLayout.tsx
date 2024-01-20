import Menu from "../components/menu/Menu";
import { Outlet } from "react-router-dom";

export const DefaultAppLayout = () => {
  return (
    <div className="container">
      <Menu />
      <div className="contentContainer">
        <Outlet />
      </div>
    </div>
  );
};
