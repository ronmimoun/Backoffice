import { TranslationText } from "../translation/translation.type";
import { ApiErrorSourceEnum } from "../../models/base/api-base";

export type AlertMessage = {
  title?: TranslationText;
  content?: TranslationText;
  code?: string;
  alertCodeType?: AlertCodeTypeEnum;
  priority: number;
  alertSource?: AlertSourceEnum;
  isLockout?: boolean;
  buttons?: AlertButtonInfo[];
};

export type AlertButtonInfo = {
  isConfirmation?: boolean;
  text: TranslationText;
  callbackKey?: string;
  closeOnClick: boolean;
};

const AlertSourceEnum = {
  ...ApiErrorSourceEnum,
  Manual: "Manual",
  Unknown: "Unknown",
} as const;

export type AlertSourceEnum =
  (typeof AlertSourceEnum)[keyof typeof AlertSourceEnum];

export const enum AlertCodeTypeEnum {
  Client = "QLC",
  Network = "QLN",
  Server = "QLS",
}

export type AlertMessageBuilderArg = Omit<AlertMessage, "priority">;
