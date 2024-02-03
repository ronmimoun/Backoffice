import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { GetUserContactTransactionsRequest } from "../../models/contact-transaction/getUser/getUserContactTransactions.request";
import { GetUserContactTransactionsResponse } from "../../models/contact-transaction/getUser/getUserContactTransactions.response";
import { GetContactTransactionsResponse } from "../../models/contact-transaction/get/getContactTransactions.response";

const contactTransactionsHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const get = async (): Promise<ApiResponse<GetContactTransactionsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/contact/transaction",
  };

  const response =
    await contactTransactionsHttpInstance.managedRequest<GetContactTransactionsResponse>(
      options
    );
  return response;
};

const getUsersTransactionsByContactId = async (
  request: GetUserContactTransactionsRequest
): Promise<ApiResponse<GetUserContactTransactionsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contact/transaction/users",
    data: request,
  };

  const response =
    await contactTransactionsHttpInstance.managedRequest<GetUserContactTransactionsResponse>(
      options
    );
  return response;
};

export const contactTransactionApiService = {
  getUsersTransactionsByContactId,
  get,
};
