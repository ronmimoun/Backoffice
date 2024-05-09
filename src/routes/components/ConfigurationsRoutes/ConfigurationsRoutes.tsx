import { Route, Routes } from "react-router-dom";
import { BASE_ROUTES } from "../../base-routes";
import { ConfigurationsRoutesWrapper } from "./ConfigurationsRoutesWrapper";
import { CONFIGURATIONS_PAGE_ROUTES } from "../../configurations-routes";
import { Countries } from "../../../pages/configurations-pages/Countries/Countries";
import Companies from "../../../pages/configurations-pages/Companies/Companies";
import JobTitles from "../../../pages/configurations-pages/JobTitles/JobTitles";
import Categories from "../../../pages/configurations-pages/Categories/Categories";

export const ConfigurationsRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.BASE} element={<ConfigurationsRoutesWrapper />}>
        <Route
          path={CONFIGURATIONS_PAGE_ROUTES.PAGES.COUNTRIES.FULL_ROUTE_NAME}
          element={<Countries />}
        />
        <Route
          path={CONFIGURATIONS_PAGE_ROUTES.PAGES.COMPANIES.FULL_ROUTE_NAME}
          element={<Companies />}
        />
        <Route
          path={CONFIGURATIONS_PAGE_ROUTES.PAGES.JOB_TITLES.FULL_ROUTE_NAME}
          element={<JobTitles />}
        />
        <Route
          path={CONFIGURATIONS_PAGE_ROUTES.PAGES.CATEGORIES.FULL_ROUTE_NAME}
          element={<Categories />}
        />
      </Route>
    </Routes>
  );
};
