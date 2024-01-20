import { ContactModel } from "./contact.type";

export type UserReviewModel = {
  username: string;
  feedbacks: FeedbackModel[];
};

export type FeedbackModel = {
  comment: string;
  contact: FeedbackContact;
  createdAt: Date;
  rating: number;
  userId: string;
  _id: string;
};

type FeedbackContact = Pick<
  ContactModel,
  "_id" | "category" | "img" | "jobTitle" | "company"
>;
