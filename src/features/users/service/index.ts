import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import { ISearchUser, IUser, IUserItem } from "../data/interface";

class UserService {
  private static baseUrl = "user";

  static getAll = (
    params?: ISearchUser
  ): Promise<IPagedResponse<IUserItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };

  static getById = (id: number): Promise<ICommonResponse<IUser>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };
  static getBySlug = (slug: string): Promise<ICommonResponse<IUser>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${slug}`, false);
  };
}
export default UserService;
