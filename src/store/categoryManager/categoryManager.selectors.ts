import { RootState } from "../root-state";

const categoryManager = () => {
  return (state: RootState) => {
    return state.categoryManager;
  };
};

export const categoryManagerSelectors = {
  categoryManager,
};
