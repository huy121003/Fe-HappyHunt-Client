import { ISearchParams } from "@/interfaces";
import { ENotificationType } from "./constant";

export interface IPost {
  _id: number;
  name: number;
  images: {
    url: string;
    index: number;
  }[];
  slug: string;
}
export interface IUser {
  _id: number;
  name: string;
  avatar: string;
  slug: string;
}
export interface INotificationItem {
  _id: string;
  target: IPost;
  post?: IPost;

  type: ENotificationType;
  createdAt: string;
  createdBy: IUser;
  updatedAt: string;
  read: boolean;
}

export interface ISearchNotification extends ISearchParams {
  target?: number;
}
