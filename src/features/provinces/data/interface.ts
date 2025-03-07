import { ISearchParams } from '@/interfaces';

export interface IProvince {
  name: string;
  codeName: string;
  phoneCode: string;
}
export interface IProvinceItem {
  _id: number;
  name: string;
  codeName: string;
  phoneCode: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    _id: number;
    name: string;
  };
}
export interface IProvincePayload {
  name: string;
  codeName: string;
  phoneCode: string;
}
export interface ISearchProvince extends ISearchParams {
  name?: string;
  codeName?: string;
}
