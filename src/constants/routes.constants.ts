export namespace ROUTES {
  export const BASE = "/";
  export const ASTERISK = "*";
  export const ASTERISK_BASE = `${BASE}${ASTERISK}`;
  export const VARIABLE = "/:_id";
  export const SEPERATOR = "/";

  export namespace HOME_PAGE {
    export const FULL_ROUTE_NAME = `${BASE}`;
    export const ASTERISK_ROUTE_NAME_PATH = `${FULL_ROUTE_NAME}/${ASTERISK}`;
  }

  export namespace USERS_PAGE {
    export const ROUTE_NAME = "users";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
    export const FULL_ROUTE_NAME_VARIABLE = `${FULL_ROUTE_NAME}${VARIABLE}`;
  }

  export namespace LOGIN_PAGE {
    export const ROUTE_NAME = "login";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace USERS_BILLING_PAGE {
    export const ROUTE_NAME = "users/billing";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CREDIT_TRANSACTION_PAGE {
    export const ROUTE_NAME = "users/credit-transactions";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace AGENT_MESSAGES_PAGE {
    export const ROUTE_NAME = "agent/agent-messages";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace PENDING_USERS_PAGE {
    export const ROUTE_NAME = "users/pending-users";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CONTACTS_PAGE {
    export const ROUTE_NAME = "contacts";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
    export const FULL_ROUTE_NAME_VARIABLE = `${FULL_ROUTE_NAME}${VARIABLE}`;
  }

  export namespace CONTACTS_FEEDBACK_PAGE {
    export const ROUTE_NAME = "contacts" + ROUTES.SEPERATOR + "feedback";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace AGENT_CONTACT_REQUEST_PAGE {
    export const ROUTE_NAME = "agent-contact-request";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }
}