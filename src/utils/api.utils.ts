export function getBaseURl() {
  let baseUrl =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_APP_BACKOFFICE_PROD
      : import.meta.env.VITE_APP_LOCAL;

  // Validate the URL
  try {
    // Check if baseUrl is defined
    if (!baseUrl) {
      console.error("Base URL is undefined. Falling back to default URL.");
      baseUrl = "http://localhost:8080/api/";
    }

    // Test if the URL is valid by creating a URL object
    new URL(baseUrl);

    // Ensure the URL ends with a slash
    if (!baseUrl.endsWith("/")) {
      baseUrl += "/";
    }

    return baseUrl;
  } catch (error) {
    console.error("Invalid base URL:", baseUrl, error);
    // Return a fallback URL
    return "http://localhost:8080/api/";
  }
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
