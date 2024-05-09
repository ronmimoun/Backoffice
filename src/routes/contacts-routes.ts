import { BASE_ROUTES } from "./base-routes";
import { BOARD_PAGE_ROUTES } from "./board-routes";

export const CONTACTS_PAGE_ROUTES = {
  ROUTE_NAME: "contacts",

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
    FEEDBACK: {
      ROUTE_NAME: "feedback",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${CONTACTS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    ADD_COMPANY_CONTACTS: {
      ROUTE_NAME: "add-company",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${CONTACTS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    CONTACTS_AGENT_REQUESTS: {
      ROUTE_NAME: "agent-requests",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${CONTACTS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    CONTACT: {
      ROUTE_NAME: ":_id",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${CONTACTS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}`;
      },
    },
  },
};
