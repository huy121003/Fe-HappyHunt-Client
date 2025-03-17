import { ISearchParams } from "@/interfaces";

export interface IEvaluateItem {
  _id: number;
  target: {
    _id: number;
    name: string;
  };
  post: {
    _id: number;
    name: string;
    imgaes: string[];
    slug: string;
    price: number;
  };
  isSeller: boolean;
  createdAt: string;
  createBy: {
    _id: number;
    name: string;
    avatar: string;
    slug: string;
  };
  content: string[];
  star: number;
}
export interface IEvaluatePayload {
  target: number;
  post: number;
  isSeller: boolean;
  content: string[];
  star: number;
}
export interface ISearchEvaluate extends ISearchParams {
  isSeller?: boolean;
}
export interface ICountEvaluate {
  averageStar: number;
  count: number;
}
