import { ISearchParams } from "@/interfaces";

export interface IWard {
  name: string;

  district: {
    _id: number;
    name: string;
  };
  province: {
    _id: number;
    name: string;
  };
  codeName: string;
  shortCodeName: string;
}
export interface IWardItem {
  _id: number;
  name: string;
  district: {
    _id: number;
    name: string;
  };
  province: {
    _id: number;
    name: string;
  };
  codeName: string;
  shortCodeName: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    _id: number;
    name: string;
  };
}

export interface IWardPayload {
  name: string;
  district: number;
  province: number;
  codeName: string;
  shortCodeName: string;
}
export interface ISearchWard extends ISearchParams {
  name?: string;
  district?: number;
  province?: number;
}
