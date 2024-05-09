import { BASE_ROUTES } from "./base-routes";

export const BOARD_PAGE_ROUTES = {
  ROUTE_NAME: "board",

  get FULL_ROUTE_NAME() {
    return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
  },

  get ASTERISK_ROUTE_NAME_PATH() {
    return `${this.FULL_ROUTE_NAME}/${BASE_ROUTES.ASTERISK}`;
  },

  PAGES: {
    HOME: {
      ROUTE_NAME: `${BASE_ROUTES.BASE}`,

      get FULL_ROUTE_NAME() {
        return `${BOARD_PAGE_ROUTES.FULL_ROUTE_NAME}${this.ROUTE_NAME}`;
      },
    },

    USERS: {
      ROUTE_NAME: "users",

      get FULL_ROUTE_NAME() {
        return `${BOARD_PAGE_ROUTES.FULL_ROUTE_NAME}/${this.ROUTE_NAME}`;
      },
    },
  },
};
