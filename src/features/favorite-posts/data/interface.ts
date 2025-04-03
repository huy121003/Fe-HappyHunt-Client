import { EPostStatus } from "@/features/posts/data/constant";
import { ISearchParams } from "@/interfaces";

export interface IFavoritePost {
  _id: number;
  post: {
    _id: number;
    name: string;
    slug: string;
    price: number;
    status: EPostStatus;
    images: {
      index: number;
      url: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}
export interface IFavoritePostPayload {
  post: number;
}
export interface ISearchFavoritePost extends ISearchParams {
  post?: number;
}
