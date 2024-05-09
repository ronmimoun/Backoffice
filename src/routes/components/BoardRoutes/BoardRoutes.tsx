import { Route, Routes } from "react-router-dom";
import { BASE_ROUTES } from "../../base-routes";
import { BoardRoutesWrapper } from "./BoardRoutesWrapper";
import { USERS_PAGE_ROUTES } from "../../users-routes";
import { CONTACTS_PAGE_ROUTES } from "../../contacts-routes";
import { CONFIGURATIONS_PAGE_ROUTES } from "../../configurations-routes";
import { AGENT_PAGE_ROUTES } from "../../agent-routes";
import { LLM_PAGE_ROUTES } from "../../llm-routes";

// Routes
import { Home } from "../../../pages/home-pages/Home";
import { UsersRoutes } from "../UsersRoutes/UsersRoutes";
import { ContactsRoutes } from "../ContactsRoutes/ContactsRoutes";
import { AgentRoutes } from "../AgentRoutes/AgentRoutes";
import { ConfigurationsRoutes } from "../ConfigurationsRoutes/ConfigurationsRoutes";
import { LLMRoutes } from "../LLMRoutes/LLMRoutes";

export const BoardRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.BASE} element={<BoardRoutesWrapper />}>
        <Route path={BASE_ROUTES.BASE} element={<Home />} />
        <Route
          path={USERS_PAGE_ROUTES.ASTERISK_ROUTE_NAME_PATH}
          element={<UsersRoutes />}
        />
        <Route
          path={CONTACTS_PAGE_ROUTES.ASTERISK_ROUTE_NAME_PATH}
          element={<ContactsRoutes />}
        />
        <Route
          path={AGENT_PAGE_ROUTES.ASTERISK_ROUTE_NAME_PATH}
          element={<AgentRoutes />}
        />
        <Route
          path={CONFIGURATIONS_PAGE_ROUTES.ASTERISK_ROUTE_NAME_PATH}
          element={<ConfigurationsRoutes />}
        />
        <Route
          path={LLM_PAGE_ROUTES.ASTERISK_ROUTE_NAME_PATH}
          element={<LLMRoutes />}
        />
      </Route>
    </Routes>
  );
};
