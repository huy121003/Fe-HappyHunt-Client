import { ISearchParams } from "@/interfaces";

export interface IFollowItem {
  _id: number;
  following: {
    _id: number;
    name: string;
    slug: string;
    avatar: string;
  };
  createdBy: {
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

export interface ISearchFollow extends ISearchParams {
  type?: "followers" | "following";
}

export interface IFollowCount {
  following: number;
  follower: number;
}
