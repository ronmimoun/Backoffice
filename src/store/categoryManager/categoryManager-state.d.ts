import { CountryModel } from "../../types/country.type";

type CategoryManagerState = {
  categories: Array<CategoryModel>;
  companies: Array<CompanyModel>;
  jobTitles: Array<JobTitle>;
  countries: Array<CountryModel>;
};

export type CategoryModel = {
  _id: string;
  img: string;
  title: string;
  cat: string;
};

export type CompanyModel = {
  _id: string;
  img: null;
  category: string;
  company: string;
};

export type JobTitle = {
  _id: string;
  img: null;
  title: string;
  value: string;
};
