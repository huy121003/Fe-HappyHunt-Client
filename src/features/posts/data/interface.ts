import { ISearchParams } from "@/interfaces";
import { UploadFile } from "antd";
import { EPostStatus } from "./constant";
export interface IAttribute {
  name: string;
  value: string | number | boolean;
  isShow?: boolean;
}
export interface IMessage {
  messageSeller: string;
  messageBuyer: string;
}
export interface ICategory {
  _id: number;
  name: string;
  slug: string;
  pricePush: number;
  messages: IMessage[];
}
export interface IPost {
  pushedAt: Date;
  _id: number;
  name: string;
  description: string;
  price: number;
  category: ICategory;
  isFavorite?: boolean;
  categoryParent: ICategory;
  images: {
    url: string;
    index: number;
  }[];

  status: string;
  createdAt: string;
  slug: string;
  isIndividual: boolean;
  createdBy: {
    _id: number;
    name: string;
    phoneNumber: string;
    avatar: string;
    slug: string;
  };
  address: {
    province: {
      name: string;
      _id: number;
    };
    district: {
      name: string;
      _id: number;
    };
    ward: {
      name: string;
      _id: number;
    };
    specificAddress: string;
  };
  attributes: IAttribute[];
}
export interface IPostItem {
  pushedAt: Date;
  _id: number;
  name: string;
  price: number;
  images: {
    url: string;
    index: number;
    reasonReject?: string[];
  }[];
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  categoryParent: ICategory;
  slug: string;
  status: EPostStatus;
  isIndividual: boolean;
  createdBy: {
    _id: number;
    name: string;
    avatar: string;
    slug: string;
  };
  address: {
    province: {
      name: string;
      _id: number;
    };
    district: {
      name: string;
      _id: number;
    };
    ward: {
      name: string;
      _id: number;
    };
    specificAddress: string;
  };
  clickCount: number;
}

export interface IPostPayload {
  _id?: number;
  name: string;
  description: string;
  price: number;
  category: number;
  categoryParent: number;
  images: string[] | UploadFile[];

  isIndividual: boolean;
  address: {
    province: string;
    district: string;
    ward: string;
    specificAddress: string;
  };
  attributes: IAttribute[];
  saveImages?: string[];
  pricePayment?: number;
}
export interface ISearchPost extends ISearchParams {
  category?: number;
  status?: string;
  categoryParent?: number;
  attribute?: IAttribute[];
  isIndividual?: boolean;
  province?: number;
  district?: number;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  createdBy?: number;
  q?: string;
  filterType?: string;
}
export interface ICountStatus {
  SELLING: number;
  SOLD: number;
  REJECTED: number;
  WAITING: number;
  HIDDEN: number;
}
export interface ICountSold {
  selling: number;
  sold: number;
}
