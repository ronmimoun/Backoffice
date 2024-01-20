export function getBaseURl() {
  return import.meta.env.MODE === "production"
    ? import.meta.env.VITE_APP_PRODUCTION
    : import.meta.env.VITE_APP_LOCAL;
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
