import { DEFAULT_COUNTRIES } from "../constants/country.constants";
import { CountryModel } from "../types/country.type";
import { store } from "./non-circular-injection.utils";

export function getCountryTypes(): [string, ...string[]] {
  const countries = store?.getState()?.categoryManager?.countries;
  if (!countries) return DEFAULT_COUNTRIES as [string, ...string[]];

  const countryEnumTypes = countries.map((country) => country.name);
  return [...countryEnumTypes] as [string, ...string[]];
}

export function getCountyByName(countryName: string): CountryModel {
  const countries = store?.getState()?.categoryManager?.countries;

  const country = countries.find((country) => country.name === countryName);
  if (!country) return getDefaultCountry();
  return country;
}

function getDefaultCountry(): CountryModel {
  const countries = store?.getState()?.categoryManager?.countries;
  return countries[1];
}

export const countryUtilService = {
  getCountryTypes,
  getCountyByName,
};
