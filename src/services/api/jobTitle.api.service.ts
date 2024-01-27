import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { CreateJobTitleResponse } from "../../models/job-title/create/createJobTitle.response";
import { CreateJobTitleRequest } from "../../models/job-title/create/createJobTitle.request";

const jobTitleHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const create = async (
  request: CreateJobTitleRequest
): Promise<ApiResponse<CreateJobTitleResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/jobTitle/create",
    data: request,
  };

  const response =
    await jobTitleHttpInstance.managedRequest<CreateJobTitleResponse>(options);
  return response;
};

export const jobTitleApiService = {
  create,
};
