import { BASE_ROUTES } from "./base-routes";
import { BOARD_PAGE_ROUTES } from "./board-routes";

export const USERS_PAGE_ROUTES = {
  ROUTE_NAME: "users",

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
    BILLING: {
      ROUTE_NAME: "billing",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${USERS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    CREDIT_TRANSACTIONS: {
      ROUTE_NAME: "credit-transactions",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${USERS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    PENDING_USERS: {
      ROUTE_NAME: "pending",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${USERS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    SUPPORT_CHAT: {
      ROUTE_NAME: "support-chat",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${USERS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    USER: {
      ROUTE_NAME: ":_id",

      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },

      get FULL_ROUTE_NAME_PATH() {
        return `${USERS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}`;
      },
    },
  },
};
