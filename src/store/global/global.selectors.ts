import { CountryModel } from "../../types/country.type";
import { RootState } from "../root-state";

const isLoading = (state: RootState): boolean => state.global.loaderCount > 0;

const countries = (state: RootState): CountryModel[] => state.global.countries;

export const globalSelectors = {
  isLoading,
  countries,
};
