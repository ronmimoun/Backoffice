import AgentMessages from "../../../pages/agent-pages/AgentMessages/AgentMessages";
import { Route, Routes } from "react-router-dom";
import { AGENT_PAGE_ROUTES } from "../../agent-routes";

export const AgentRoutes = () => {
  return (
    <Routes>
      <Route
        path={AGENT_PAGE_ROUTES.PAGES.MESSAGES.FULL_ROUTE_NAME}
        element={<AgentMessages />}
      />
    </Routes>
  );
};
