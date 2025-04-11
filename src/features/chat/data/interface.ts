import { EStatusMessage } from "@/features/message/data/constant";
import { IPost } from "@/features/posts/data/interface";
import { ISearchParams } from "@/interfaces";

export interface IMessage {
  _id: number;
  message: string;
  image: string;
  timeSend: string;
  sender: number;
  status: EStatusMessage;
}
export interface IAccount {
  _id: number;
  name: string;
  avatar: string;
  slug: string;
}

export interface IChatItem {
  _id: number;
  slug: string;
  seller: IAccount;
  buyer: IAccount;
  post: IPost;
  lastMessage: IMessage;
  createdAt: string;
}

export interface IChat {
  _id: number;
  slug: string;
  lastMessage: IMessage;
  seller: IAccount;
  buyer: IAccount;
  post: IPost;
}
export interface IChatPayload {
  post: number;
  seller: number;
  buyer: number;
}
export interface ISearchChat extends ISearchParams {
  isSeller?: boolean;
  seller?: number;
  buyer?: number;
  currentUser?: number;
  read?: boolean;
}
