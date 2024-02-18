import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { CreateJobTitleResponse } from "../../models/job-title/create/createJobTitle.response";
import { CreateJobTitleRequest } from "../../models/job-title/create/createJobTitle.request";
import { RemoveJobTitleRequest } from "../../models/job-title/remove/removeJobTitle.request";
import { RemoveJobTitleResponse } from "../../models/job-title/remove/removeJobTitle.response";
import { UpdateJobTitleRequest } from "../../models/job-title/update/updateJobTitle.request";
import { UpdateJobTitleResponse } from "../../models/job-title/update/updateJobTitle.response";

const getJobTitleHttpInstance = () =>
  createManagedAxiosInstance(buildGeneralApiInstanceConfig(getBaseURl()));

const create = async (
  request: CreateJobTitleRequest
): Promise<ApiResponse<CreateJobTitleResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/jobTitle/create",
    data: request,
  };

  const response =
    await getJobTitleHttpInstance().managedRequest<CreateJobTitleResponse>(
      options
    );
  return response;
};

const remove = async (
  request: RemoveJobTitleRequest
): Promise<ApiResponse<RemoveJobTitleResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/jobTitle/${request}`,
  };

  const response =
    await getJobTitleHttpInstance().managedRequest<RemoveJobTitleResponse>(
      options
    );
  return response;
};

const update = async (
  request: UpdateJobTitleRequest
): Promise<ApiResponse<UpdateJobTitleResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/jobTitle/update/${request._id}`,
    data: request,
  };

  const response =
    await getJobTitleHttpInstance().managedRequest<UpdateJobTitleResponse>(
      options
    );
  return response;
};

export const jobTitleApiService = {
  create,
  remove,
  update,
};
