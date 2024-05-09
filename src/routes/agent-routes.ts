import { BASE_ROUTES } from "./base-routes";
import { BOARD_PAGE_ROUTES } from "./board-routes";

export const AGENT_PAGE_ROUTES = {
  ROUTE_NAME: "agent",

  get FULL_ROUTE_NAME() {
    return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
  },

  get FULL_ROUTE_NAME_PATH() {
    return `${BOARD_PAGE_ROUTES.FULL_ROUTE_NAME}${this.FULL_ROUTE_NAME}`;
  },

  get ASTERISK_ROUTE_NAME_PATH() {
    return `${this.ROUTE_NAME}/${BASE_ROUTES.ASTERISK}`;
  },

  PAGES: {
    MESSAGES: {
      ROUTE_NAME: "messages",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${AGENT_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },
  },
};
