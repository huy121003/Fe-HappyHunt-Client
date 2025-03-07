import { ISearchParams } from '@/interfaces';

export interface IDistrict {
  name: string;
  provinceId: {
    _id: number;
    name: string;
  };
  codeName: string;
  shortCodeName: string;
}
export interface IDistrictItem {
  _id: number;
  name: string;
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
export interface IDistrictPayload {
  name: string;
  provinceId: number;
  codeName: string;
  shortCodeName: string;
}
export interface ISearchDistrict extends ISearchParams {
  name?: string;
  provinceId?: number;
}
