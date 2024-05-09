import { BASE_ROUTES } from "./base-routes";

export const LOGIN_PAGE_ROUTES = {
  ROUTE_NAME: "login",

  get FULL_ROUTE_NAME() {
    return `${BASE_ROUTES.BASE}${this.ROUTE_NAME}`;
  },

  get ASTERISK_ROUTE_NAME_PATH() {
    return `${this.ROUTE_NAME}/${BASE_ROUTES.ASTERISK}`;
  },
};
