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
  createCategoryThunkBuilder,
  createCategoryThunk,
} from "./categoryManager-thunks/createCategoryThunkBuilder";
import {
  createJobTitleThunkBuilder,
  createJobTitleThunk,
} from "./categoryManager-thunks/createJobTitleThunkBuilder";

export const categoryManagerThunkActionsBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  initializeCategoryManagerThunkBuilder(builder);
  createCompanyThunkBuilder(builder);
  createCategoryThunkBuilder(builder);
  createJobTitleThunkBuilder(builder);
};

export const categoryManagerThunkActions = {
  initializeCategoryManagerThunk,
  createCompanyThunk,
  createCategoryThunk,
  createJobTitleThunk,
};
