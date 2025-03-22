import { ISearchParams } from "@/interfaces";

export interface IFavoritePost {
  _id: number;
  post: {
    _id: number;
    name: string;
    slug: string;
    price: number;
    images: string[];
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
