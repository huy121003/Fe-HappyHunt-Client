import { ISearchParams } from '@/interfaces';

export interface IWard {
  name: string;

  districtId: {
    _id: number;
    name: string;
  };
  provinceId: {
    _id: number;
    name: string;
  };
  codeName: string;
  shortCodeName: string;
}
export interface IWardItem {
  _id: number;
  name: string;
  districtId: {
    _id: number;
    name: string;
  };
  provinceId: {
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
  districtId: number;
  provinceId: number;
  codeName: string;
  shortCodeName: string;
}
export interface ISearchWard extends ISearchParams {
  name?: string;
  districtId?: number;
  provinceId?: number;
}
