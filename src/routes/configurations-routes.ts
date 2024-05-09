import { BASE_ROUTES } from "./base-routes";
import { BOARD_PAGE_ROUTES } from "./board-routes";

export const CONFIGURATIONS_PAGE_ROUTES = {
  ROUTE_NAME: "configurations",

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
    COUNTRIES: {
      ROUTE_NAME: "countries",
      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },
      get FULL_ROUTE_NAME_PATH() {
        return `${CONFIGURATIONS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    JOB_TITLES: {
      ROUTE_NAME: "job-titles",
      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },
      get FULL_ROUTE_NAME_PATH() {
        return `${CONFIGURATIONS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    CATEGORIES: {
      ROUTE_NAME: "categories",
      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },
      get FULL_ROUTE_NAME_PATH() {
        return `${CONFIGURATIONS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },

    COMPANIES: {
      ROUTE_NAME: "companies",
      get FULL_ROUTE_NAME() {
        return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
      },
      get FULL_ROUTE_NAME_PATH() {
        return `${CONFIGURATIONS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH}${this.FULL_ROUTE_NAME}`;
      },
    },
  },
};
