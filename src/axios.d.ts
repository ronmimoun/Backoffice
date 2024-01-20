import "axios";
import { CustomRequestConfig } from "./types/request/RequestOptions.type";

declare module "axios" {
  export interface AxiosRequestConfig extends CustomRequestConfig {}
}
