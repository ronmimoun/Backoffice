import {
  CategoryModel,
  CompanyModel,
  JobTitleModel,
} from "../../../store/categoryManager/categoryManager-state";
import { CountryModel } from "../../../types/country.type";

export type CreateManyContactsRequest = {
  company: CompanyModel;
  category: CategoryModel;
  jobTitles: JobTitleModel[];
  price: number;
  inStock: boolean;
  country: CountryModel;
  desc?: string;
};
