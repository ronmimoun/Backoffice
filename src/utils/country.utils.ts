import { DEFAULT_COUNTRIES } from "../constants/country.constants";
import { store } from "./non-circular-injection.utils";

export function getCountryTypes(): [string, ...string[]] {
  const countries = store?.getState()?.categoryManager?.countries;
  if (!countries) return DEFAULT_COUNTRIES as [string, ...string[]];

  const countryEnumTypes = countries.map((country) => country.name);
  return [...countryEnumTypes] as [string, ...string[]];
}

export const countryUtilService = {
  getCountryTypes,
};
