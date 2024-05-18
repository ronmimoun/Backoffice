import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { GetContactsResponse } from "../../models/contact/get/getContacts.response";
import { GetcontactByIdRequest } from "../../models/contact/getById/getContactById.request";
import { GetcontactByIdResponse } from "../../models/contact/getById/getContactById.response";
import { UpdateContactRequest } from "../../models/contact/update/updateContact.request";
import { UpdateContactResponse } from "../../models/contact/update/updateContact.response";
import { CreateContactRequest } from "../../models/contact/create/createContact.request";
import { CreateContactResponse } from "../../models/contact/create/createContact.response";
import { CreateManyContactsResponse } from "../../models/contact/createMany/createManyContacts.response";
import { CreateManyContactsRequest } from "../../models/contact/createMany/createManyContacts.request";
import { RemoveContactByIdRequest } from "../../models/contact/remove/removeContactById.request";
import { RemoveContactByIdResponse } from "../../models/contact/remove/removeContactById.response";
import {
  UpdateSubmittedInfoSearchRequest,
  UpdateSubmittedInfoSearchResponse,
} from "../../types/contact/updateContactAiInformation.type";
import {
  UpdateLastGeneratedInfoSearchRequest,
  UpdateLastGeneratedInfoSearchResponse,
} from "../../types/contact/updateLastGeneratedInfoSearch.type";

const getContactHttpInstance = () =>
  createManagedAxiosInstance(buildGeneralApiInstanceConfig(getBaseURl()));

const getContacts = async (): Promise<ApiResponse<GetContactsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts",
  };

  const response =
    await getContactHttpInstance().managedRequest<GetContactsResponse>(options);
  return response;
};

const removeContactById = async (
  request: RemoveContactByIdRequest
): Promise<ApiResponse<RemoveContactByIdResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/contacts/${request}`,
    data: request,
  };

  const response =
    await getContactHttpInstance().managedRequest<RemoveContactByIdResponse>(
      options
    );
  return response;
};

const getContactById = async (
  request: GetcontactByIdRequest
): Promise<ApiResponse<GetcontactByIdResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: `/contacts/find/${request}`,
  };

  const response =
    await getContactHttpInstance().managedRequest<GetcontactByIdResponse>(
      options
    );
  return response;
};

const update = async (
  requestPayload: UpdateContactRequest
): Promise<ApiResponse<UpdateContactResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/contacts/update/${requestPayload._id}`,
    data: requestPayload,
  };

  const response =
    await getContactHttpInstance().managedRequest<UpdateContactResponse>(
      options
    );
  return response;
};

const create = async (
  requestPayload: CreateContactRequest
): Promise<ApiResponse<CreateContactResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/create",
    data: requestPayload,
  };

  const response =
    await getContactHttpInstance().managedRequest<CreateContactResponse>(
      options
    );
  return response;
};

const createMany = async (
  requestPayload: CreateManyContactsRequest
): Promise<ApiResponse<CreateManyContactsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/create/company",
    data: requestPayload,
  };

  const response =
    await getContactHttpInstance().managedRequest<CreateManyContactsResponse>(
      options
    );
  return response;
};

const updateSubmittedInfoSearch = async (
  requestPayload: UpdateSubmittedInfoSearchRequest
): Promise<ApiResponse<UpdateSubmittedInfoSearchResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/updateSubmittedInfoSearch",
    data: requestPayload,
  };

  const response =
    await getContactHttpInstance().managedRequest<UpdateSubmittedInfoSearchResponse>(
      options
    );
  return response;
};

const updateLastGeneratedInfoSearch = async (
  requestPayload: UpdateLastGeneratedInfoSearchRequest
): Promise<ApiResponse<UpdateLastGeneratedInfoSearchResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/updateLastGeneratedInfoSearch",
    data: requestPayload,
  };

  const response =
    await getContactHttpInstance().managedRequest<UpdateLastGeneratedInfoSearchResponse>(
      options
    );
  return response;
};

export const contactApiService = {
  getContacts,
  removeContactById,
  getContactById,
  update,
  create,
  createMany,
  updateContactAiInformation: updateSubmittedInfoSearch,
  updateLastGeneratedInfoSearch,
};
