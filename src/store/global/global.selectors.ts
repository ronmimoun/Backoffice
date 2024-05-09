import { RootState } from "../root-state";

const isLoading = (state: RootState): boolean => state.global.loaderCount > 0;

export const globalSelectors = {
  isLoading,
};
