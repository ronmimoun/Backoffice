import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { GetUserReviewsResponse } from "../../models/feedbacks/get/getUserReviews.response";

const feedbacksHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const get = async (): Promise<ApiResponse<GetUserReviewsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/feedback/getUserFeedback",
  };

  const response =
    await feedbacksHttpInstace.managedRequest<GetUserReviewsResponse>(options);
  return response;
};

export const feedbacksApiService = {
  get,
};
