import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { GetContactTransactionsRequest } from "../../models/contact-transaction/get/getContactTransactions.request";
import { GetContactTransactionsResponse } from "../../models/contact-transaction/get/getContactTransactions.response";

const contactTransactionsHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const getUsersTransactionsByContactId = async (
  request: GetContactTransactionsRequest
): Promise<ApiResponse<GetContactTransactionsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contact/transaction/users",
    data: request,
  };

  const response =
    await contactTransactionsHttpInstace.managedRequest<GetContactTransactionsResponse>(
      options
    );
  return response;
};

export const contactTransactionApiService = {
  getUsersTransactionsByContactId,
};
