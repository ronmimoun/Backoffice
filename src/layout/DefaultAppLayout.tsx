import Menu from "../components/feature/layout/menu/Menu";
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
