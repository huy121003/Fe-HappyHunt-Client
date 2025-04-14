import { EPostStatus } from "@/features/posts/data/constant";
import { ISearchParams } from "@/interfaces";

export interface IEvaluateItem {
  _id: number;
  target: {
    _id: number;
    name: string;
    slug: string;
  };
  post: {
    _id: number;
    name: string;
    images: {
      url: string;
      index: number;
    }[];
    slug: string;
    price: number;
    status: EPostStatus;
  };
  isSeller: boolean;
  createdAt: string;
  description: string;
  createdBy: {
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
  content?: string[];
  description?: string;
  star: number;
}
export interface ISearchEvaluate extends ISearchParams {
  isSeller?: string;
  target?: number;
  post?: number;
}
export interface ICountEvaluate {
  averageStar: number;
  count: number;
}
export interface ICount {
  evaluateBySeller: number;
  evaluateByBuyer: number;
  totalEvaluate: number;
}
