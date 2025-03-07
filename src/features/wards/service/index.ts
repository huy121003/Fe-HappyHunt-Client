import { ICommonResponse, IPagedResponse } from '@/interfaces';
import { ISearchWard, IWard, IWardItem, IWardPayload } from '../data/interface';
import { EMethod } from '@/constants';
import apiRequest from '@/libs/axios';

class WardService {
  private static baseUrl = 'ward';
  static getAll = (
    params?: ISearchWard
  ): Promise<IPagedResponse<IWardItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };
  static getById = (id: number): Promise<ICommonResponse<IWard>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };
  static create = (data: IWardPayload): Promise<ICommonResponse<IWard>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };
  static update = (
    id: number,
    data: IWardPayload
  ): Promise<ICommonResponse<IWard>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, false, data);
  };
  static delete = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}
export default WardService;
