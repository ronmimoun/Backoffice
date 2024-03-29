import {
  CategoryModel,
  CompanyModel,
  JobTitleModel,
} from "../store/categoryManager/categoryManager-state";
import { store } from "./non-circular-injection.utils";

function getCompaniesByCategory(selectedCategory?: CategoryModel) {
  const companies = store.getState().categoryManager.companies;

  if (!selectedCategory) return companies;
  return companies.filter(
    (company) => company.category === selectedCategory.cat
  );
}

function getCategoriesByCompany(selectedCompany?: CompanyModel) {
  const categories = store.getState().categoryManager.categories;

  if (!selectedCompany) return categories;
  return categories.filter(
    (category) => category.cat === selectedCompany?.category
  );
}

function getJobTitleByString(jobTitle: string): JobTitleModel | undefined {
  const jobTitles = store.getState().categoryManager.jobTitles;

  return jobTitles.find((currJobTitle) => currJobTitle.title === jobTitle);
}

export const categoryManagerUtilService = {
  getCompaniesByCategory,
  getCategoriesByCompany,
  getJobTitleByString,
};
