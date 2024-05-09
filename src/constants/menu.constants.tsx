import { Home } from "@mui/icons-material";
import { Group } from "@mui/icons-material";
import { AccountBalance } from "@mui/icons-material";
import { MonetizationOn } from "@mui/icons-material";
import { Pending } from "@mui/icons-material";
import { PermContactCalendar } from "@mui/icons-material";
import { ThumbUpAlt } from "@mui/icons-material";
import { SupportAgent } from "@mui/icons-material";
import { Email } from "@mui/icons-material";
import { QuestionAnswer } from "@mui/icons-material";
import { RecentActors } from "@mui/icons-material";
import { Work } from "@mui/icons-material";
import { Business } from "@mui/icons-material";
import { Category } from "@mui/icons-material";
import { Flag } from "@mui/icons-material";
import { ROUTES } from "./routes.constants";
import { LLM_PAGE_ROUTES } from "../routes/llm-routes";
import { BOARD_PAGE_ROUTES } from "../routes/board-routes";
import { USERS_PAGE_ROUTES } from "../routes/users-routes";
import { CONTACTS_PAGE_ROUTES } from "../routes/contacts-routes";
import { CONFIGURATIONS_PAGE_ROUTES } from "../routes/configurations-routes";
import { AGENT_PAGE_ROUTES } from "../routes/agent-routes";

export const MENU = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: BOARD_PAGE_ROUTES.PAGES.HOME.FULL_ROUTE_NAME,
        icon: <Home />,
      },
    ],
  },
  {
    id: 2,
    title: "users",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: BOARD_PAGE_ROUTES.PAGES.USERS.FULL_ROUTE_NAME,
        icon: <Group />,
      },
      {
        id: 2,
        title: "Billing",
        url: USERS_PAGE_ROUTES.PAGES.BILLING.FULL_ROUTE_NAME_PATH,
        icon: <AccountBalance />,
      },
      {
        id: 3,
        title: "Top-ups",
        url: USERS_PAGE_ROUTES.PAGES.CREDIT_TRANSACTIONS.FULL_ROUTE_NAME_PATH,
        icon: <MonetizationOn />,
      },
      {
        id: 4,
        title: "Pending Users",
        url: USERS_PAGE_ROUTES.PAGES.PENDING_USERS.FULL_ROUTE_NAME_PATH,
        icon: <Pending />,
      },
      {
        id: 5,
        title: "Support Chat",
        url: USERS_PAGE_ROUTES.PAGES.SUPPORT_CHAT.FULL_ROUTE_NAME_PATH,
        icon: <QuestionAnswer />,
      },
    ],
  },
  {
    id: 3,
    title: "contacts",
    listItems: [
      {
        id: 1,
        title: "Contacts",
        url: CONTACTS_PAGE_ROUTES.FULL_ROUTE_NAME_PATH,
        icon: <PermContactCalendar />,
      },
      {
        id: 2,
        title: "Contacts Feedbacks",
        url: CONTACTS_PAGE_ROUTES.PAGES.FEEDBACK.FULL_ROUTE_NAME_PATH,
        icon: <ThumbUpAlt />,
      },
      {
        id: 3,
        title: "Agent's Contacts",
        url: CONTACTS_PAGE_ROUTES.PAGES.CONTACTS_AGENT_REQUESTS
          .FULL_ROUTE_NAME_PATH,
        icon: <SupportAgent />,
      },
      {
        id: 4,
        title: "Add Company Contacts",
        url: CONTACTS_PAGE_ROUTES.PAGES.ADD_COMPANY_CONTACTS
          .FULL_ROUTE_NAME_PATH,
        icon: <RecentActors />,
      },
    ],
  },
  {
    id: 4,
    title: "agent",
    listItems: [
      {
        id: 1,
        title: "Agent's Messages",
        url: AGENT_PAGE_ROUTES.PAGES.MESSAGES.FULL_ROUTE_NAME_PATH,
        icon: <Email />,
      },
    ],
  },
  {
    id: 5,
    title: "configurations",
    listItems: [
      {
        id: 1,
        title: "Countries",
        url: CONFIGURATIONS_PAGE_ROUTES.PAGES.COUNTRIES.FULL_ROUTE_NAME_PATH,
        icon: <Flag />,
      },
      {
        id: 2,
        title: "Categories",
        url: CONFIGURATIONS_PAGE_ROUTES.PAGES.CATEGORIES.FULL_ROUTE_NAME_PATH,
        icon: <Category />,
      },
      {
        id: 3,
        title: "Companies",
        url: CONFIGURATIONS_PAGE_ROUTES.PAGES.COMPANIES.FULL_ROUTE_NAME_PATH,
        icon: <Business />,
      },
      {
        id: 4,
        title: "Job Titles",
        url: CONFIGURATIONS_PAGE_ROUTES.PAGES.JOB_TITLES.FULL_ROUTE_NAME_PATH,
        icon: <Work />,
      },
    ],
  },
  {
    id: 6,
    title: "LLM",
    listItems: [
      {
        id: 1,
        title: "Chat GPT",
        url: LLM_PAGE_ROUTES.PAGES.CHAT_GPT.FULL_ROUTE_NAME_PATH,
        icon: <Email />,
      },
    ],
  },
];
