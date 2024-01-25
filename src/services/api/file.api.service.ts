import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { UploadResponse } from "../../models/file/upload/upload.response";
import { UploadRequest } from "../../models/file/upload/upload.request";

const fileHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const upload = async (
  request: UploadRequest
): Promise<ApiResponse<UploadResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/file/upload",
    data: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await fileHttpInstance.managedRequest<UploadResponse>(
    options
  );
  return response;
};

export const fileApiService = {
  upload,
};
