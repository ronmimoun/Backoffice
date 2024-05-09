export const BASE_ROUTES = {
  BASE: "/",
  ASTERISK: "*",
  get ASTERISK_BASE() {
    return `${this.BASE}${this.ASTERISK}`;
  },
};
