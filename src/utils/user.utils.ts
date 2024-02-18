import { CREDIT_VALUE } from "../constants/credit.constants";
import {
  STORAGE_KEY_JWT_TOKEN,
  STORAGE_KEY_LOGGEDIN_USER,
} from "../constants/storage.constatns";
import { TransactionHistoryModel } from "../types/contact.type";
import { UserModel } from "../types/user.type";
import { store } from "./non-circular-injection.utils";

function sumExpenses(user: UserModel): number {
  if (!user.contactTransactions) return 0;
  return user.contactTransactions.reduce((_, transaction) => {
    return transaction.priceInCredit * CREDIT_VALUE;
  }, 0);
}

function getUserContactTransactionById(
  user: UserModel
): TransactionHistoryModel | null {
  if (!user) return null;
  const transaction = user.contactTransactions.find(
    (trans) => trans.userId === user._id
  );
  if (transaction) return transaction;
  else return null;
}

function getAgentUsers() {
  const users = store
    .getState()
    .user.users.filter((user) => user.permissions.includes("agent"));

  return users;
}

function saveLocalUser(user: UserModel) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getUserJwtToken() {
  const token = sessionStorage.getItem(STORAGE_KEY_JWT_TOKEN);
  if (!token) return null;
  return token;
}

function saveUserJwtToken(token: string) {
  sessionStorage.setItem(STORAGE_KEY_JWT_TOKEN, token);
  return token;
}

function getLoggedinUser(): UserModel | null {
  const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
  if (!user) return null;
  return JSON.parse(user);
}

function clearLocalUser() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function isAdmin(user: UserModel): boolean {
  return user.isAdmin;
}

export const userUtilService = {
  saveLocalUser,
  getLoggedinUser,
  clearLocalUser,
  isAdmin,
  sumExpenses,
  getUserContactTransactionById,
  getAgentUsers,
  saveUserJwtToken,
  getUserJwtToken,
};
