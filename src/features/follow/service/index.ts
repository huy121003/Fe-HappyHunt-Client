import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import {
  IFollowItem,
  IFollowPayload,
  ISearchFollow,
  IFollowCount,
} from "../data/interface";
class FollowService {
  private static baseUrl = "/follow";

  static getAllFollow(
    id: number,
    params: ISearchFollow
  ): Promise<IPagedResponse<IFollowItem[]>> {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/pagination/${id}?${newParams}`,
      false
    );
  }

  static create(
    payload: IFollowPayload
  ): Promise<ICommonResponse<IFollowItem>> {
    return apiRequest(EMethod.POST, this.baseUrl, false, payload);
  }

  static remove(id: number): Promise<ICommonResponse<IFollowItem>> {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  }
  static count(id: number): Promise<ICommonResponse<IFollowCount>> {
    return apiRequest(EMethod.GET, `${this.baseUrl}/count/${id}`, false);
  }
  static getById(following: number): Promise<ICommonResponse<any>> {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${following}`, false);
  }
}
export default FollowService;
