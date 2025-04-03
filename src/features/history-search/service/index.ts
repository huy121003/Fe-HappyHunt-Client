import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import {
  ISearchHistory,
  ISearchHistoryItem,
  ISearchHistoryPayload,
} from "../data/interface";

class SearchHistoryService {
  private static baseUrl = "/history-search";

  static getAll = (
    params: ISearchHistory
  ): Promise<IPagedResponse<ISearchHistoryItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/pagination?${newParams}`,
      false
    );
  };

  static create = (
    data: ISearchHistoryPayload
  ): Promise<ICommonResponse<ISearchHistoryPayload>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };
  static remove = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}
export default SearchHistoryService;
