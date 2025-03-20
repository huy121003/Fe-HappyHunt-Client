import { ISearchParams } from "@/interfaces";
import { Type } from "./constants";

export interface IAttribute {
  name: string;
  type: Type;
  values?: string[];
}
export interface ICategory {
  _id: number;
  name: string;
  parent: {
    _id: number;
    name: string;
  };
  url: string;
  description: string;
  image: string;
  attributes: IAttribute[];
  keywords: string[];
  isPayment: boolean;
  pricePayment: number;
}
export interface ICategoryItem {
  _id: number;
  name: string;
  image?: string;
  isPayment?: boolean;
  pricePayment?: number;
  slug?: string;
  parent?: {
    _id: number;
    name: string;
  };
}

export interface ISearchCategory extends ISearchParams {
  name?: string;
  parent?: number | null;
}
