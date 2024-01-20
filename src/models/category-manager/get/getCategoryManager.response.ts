import {
  CategoryModel,
  CompanyModel,
  JobTitle,
} from "../../../store/categoryManager/categoryManager-state";
import { CountryModel } from "../../../types/country.type";

export type getCategoryManagerResponse = {} & CategoryManager;

export interface CategoryManager {
  categories: Array<CategoryModel>;
  companies: Array<CompanyModel>;
  jobTitles: Array<JobTitle>;
  countries: Array<CountryModel>;
}
