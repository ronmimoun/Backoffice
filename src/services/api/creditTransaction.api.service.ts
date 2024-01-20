import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { GetCreditTransactionResponse } from "../../models/credit-transaction/get/getCreditTransaction.response";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";

const creditTransactionHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const get = async (): Promise<ApiResponse<GetCreditTransactionResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/credit/transaction",
  };

  const response =
    await creditTransactionHttpInstace.managedRequest<GetCreditTransactionResponse>(
      options
    );
  return response;
};

export const creditTransactionApiService = {
  get,
};
