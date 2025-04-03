import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import {
  IFavoritePost,
  IFavoritePostPayload,
  ISearchFavoritePost,
} from "../data/interface";

class FavoritePostService {
  private static baseUrl = "/favorite-post";

  static getAll = (
    params: ISearchFavoritePost
  ): Promise<IPagedResponse<IFavoritePost[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };

  static create = (
    data: IFavoritePostPayload
  ): Promise<ICommonResponse<IFavoritePostPayload>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };
  static remove = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
  static removeById=(id:number):Promise<ICommonResponse<null>>=>{
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/post/${id}`, false);
  }
}

export default FavoritePostService;
