import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import {
  IProvince,
  IProvinceItem,
  IProvincePayload,
  ISearchProvince,
} from '../data/interface';

class ProvincesService {
  private static baseUrl = 'province';

  static getAll = (
    params?: ISearchProvince
  ): Promise<IPagedResponse<IProvinceItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };

  static getbyId = (id: number): Promise<ICommonResponse<IProvince>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (
    data: IProvincePayload
  ): Promise<ICommonResponse<IProvince>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };

  static update = (
    id: number,
    data: IProvincePayload
  ): Promise<ICommonResponse<IProvince>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, false, data);
  };

  static delete = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}
export default ProvincesService;