import { CountryModel } from "../../types/country.type";

type GlobalState = {
  loaderCount: number;
  error: string | null | undefined;
  countries: CountryModel[];
};
