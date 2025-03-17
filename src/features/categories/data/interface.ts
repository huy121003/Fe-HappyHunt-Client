import { ISearchParams } from "@/interfaces";

export interface IAttribute {
  name: string;
  values: string[];
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
}
export interface ICategoryItem {
  _id: number;
  name: string;
  image?: string;
  url?: string;
  parent?: {
    _id: number;
    name: string;
  };
}

export interface ISearchCategory extends ISearchParams {
  name?: string;
  parent?: number | null;
}
