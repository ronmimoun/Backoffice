import { RootState } from "../root-state";

const currentUser = () => {
  return (state: RootState) => {
    return state.user.currentUser;
  };
};

const getUsers = () => {
  return (state: RootState) => {
    return state.user.users;
  };
};

const getUserFromStateById = (userId?: string) => {
  return (state: RootState) => {
    if (!userId) return null;
    const user = state.user.users.find((user) => user._id === userId);
    if (!user) return null;
    return user;
  };
};

export const userSelectors = {
  currentUser,
  getUsers,
  getUserFromStateById,
};
