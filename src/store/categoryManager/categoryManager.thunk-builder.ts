import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { CategoryManagerState } from "./categoryManager-state";
import {
  initializeCategoryManagerThunkBuilder,
  initializeCategoryManagerThunk,
} from "./categoryManager-thunks/categoryManagerThunkBuilder";
import {
  createCompanyThunkBuilder,
  createCompanyThunk,
} from "./categoryManager-thunks/createCompanyThunkBuilder";
import {
  removeCountryThunkBuilder,
  removeCountryThunk,
} from "./categoryManager-thunks/country-thunks/removeCountryThunkBuilder";
import {
  createCountryThunkBuilder,
  createCountryThunk,
} from "./categoryManager-thunks/country-thunks/createCountryThunkBuilder";
import {
  updateCountryThunkBuilder,
  updateCountryThunk,
} from "./categoryManager-thunks/country-thunks/updateCountryThunkBuilder";
import {
  createCategoryThunkBuilder,
  createCategoryThunk,
} from "./categoryManager-thunks/category-thunks/createCategoryThunkBuilder";
import {
  removeCategoryThunkBuilder,
  removeCategoryThunk,
} from "./categoryManager-thunks/category-thunks/removeCategoryThunkBuilder";
import {
  updateCategoryThunkBuilder,
  updateCategoryThunk,
} from "./categoryManager-thunks/category-thunks/updateCategoryThunkBuilder";
import {
  createJobTitleThunkBuilder,
  createJobTitleThunk,
} from "./categoryManager-thunks/jobTitle-thunks/createJobTitleThunkBuilder";
import {
  removeJobTitleThunkBuilder,
  removeJobTitleThunk,
} from "./categoryManager-thunks/jobTitle-thunks/removeJobTitleThunkBuilder";
import {
  updateJobTitleThunkBuilder,
  updateJobTitleThunk,
} from "./categoryManager-thunks/jobTitle-thunks/updateJobTitleThunkBuilder";

export const categoryManagerThunkActionsBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  initializeCategoryManagerThunkBuilder(builder);

  //Job Title
  createJobTitleThunkBuilder(builder);
  removeJobTitleThunkBuilder(builder);
  updateJobTitleThunkBuilder(builder);

  // Companies
  createCompanyThunkBuilder(builder);

  // Countries
  removeCountryThunkBuilder(builder);
  createCountryThunkBuilder(builder);
  updateCountryThunkBuilder(builder);

  // Categories
  createCategoryThunkBuilder(builder);
  removeCategoryThunkBuilder(builder);
  updateCategoryThunkBuilder(builder);
};

export const categoryManagerThunkActions = {
  initializeCategoryManagerThunk,
  createCompanyThunk,
  createCategoryThunk,
  createJobTitleThunk,
  removeCountryThunk,
  createCountryThunk,
  updateCountryThunk,
  removeCategoryThunk,
  updateCategoryThunk,
  removeJobTitleThunk,
  updateJobTitleThunk,
};
