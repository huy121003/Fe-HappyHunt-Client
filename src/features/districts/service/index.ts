import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import {
  IDistrict,
  IDistrictItem,
  IDistrictPayload,
  ISearchDistrict,
} from '../data/interface';

class DistrictsService {
  private static baseUrl = 'district';

  static getAll = (
    params?: ISearchDistrict
  ): Promise<IPagedResponse<IDistrictItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };

  static getbyId = (id: number): Promise<ICommonResponse<IDistrict>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (
    data: IDistrictPayload
  ): Promise<ICommonResponse<IDistrict>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };

  static update = (
    id: number,
    data: IDistrictPayload
  ): Promise<ICommonResponse<IDistrict>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, false, data);
  };

  static delete = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}
export default DistrictsService;
