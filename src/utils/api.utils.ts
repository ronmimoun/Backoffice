export function getBaseURl() {
  return import.meta.env.NODE_ENV === "production"
    ? "https://qleads.mobi/api/" || ""
    : "http://localhost:3030/api/";
}

export const buildResponse = <T>(
  isSucceeded: boolean,
  data: T
): GenericResponse<T> => {
  return { isSucceeded, data };
};

export type GenericResponse<T> = {
  isSucceeded: boolean;
  data: T;
};
