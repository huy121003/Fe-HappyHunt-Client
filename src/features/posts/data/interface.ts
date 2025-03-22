import { ISearchParams } from "@/interfaces";
import { UploadFile } from "antd";
import { EPostStatus } from "./constant";

export interface IPost {
  _id: number;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
    _id: number;
    slug: string;
  };
  isFavorite?: boolean;
  categoryParent: {
    name: string;
    _id: number;
    slug: string;
  };
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
  attributes: {
    name: string;
    value?: string | number | boolean;
  }[];
}
export interface IPostItem {
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
  category: {
    name: string;
    _id: number;
    phoneNumber: string;
    avatar: string;
  };
  categoryParent: {
    name: string;
    _id: number;
  };
  slug: string;
  status: EPostStatus;
  isIndividual: boolean;
  createdBy: {
    _id: number;
    name: string;
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
  attributes: {
    name: string;
    value: string;
  }[];
  saveImages?: string[];
  pricePayment?: number;
}
export interface ISearchPost extends ISearchParams {
  category?: number;
  status?: string;
  categoryParent?: number;
  isIndividual?: boolean;
  province?: string;
  district?: string;
  ward?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  createdBy?: number;
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
