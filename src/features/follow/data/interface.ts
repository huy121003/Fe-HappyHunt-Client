import { ISearchParams } from "@/interfaces";

export interface IFollowItem {
  _id: number;
  following: {
    _id: number;
    name: string;
    slug: string;
    avatar: string;
  };
  craetedBy: {
    _id: number;
    name: string;
    slug: string;
    avatar: string;
  };
  createdAt: string;
}

export interface IFollowPayload {
  following: number;
}

export interface ISearchFollow extends ISearchParams {}

export interface IFollowCount {
  following: number;
  follower: number;
}
