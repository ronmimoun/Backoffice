import { Route, Routes } from "react-router-dom";
import { BASE_ROUTES } from "../../base-routes";
import { LLMRoutesWrapper } from "./LLMRoutesWrapper";
import { LLM_PAGE_ROUTES } from "../../llm-routes";

export const LLMRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.BASE} element={<LLMRoutesWrapper />}>
        <Route
          path={LLM_PAGE_ROUTES.PAGES.CHAT_GPT.FULL_ROUTE_NAME}
          element={<div>Hello from LLMRoutes</div>}
        />
      </Route>
    </Routes>
  );
};
