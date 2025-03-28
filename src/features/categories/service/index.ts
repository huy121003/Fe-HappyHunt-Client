import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import { ICategory, ICategoryItem, ISearchCategory } from "../data/interface";

class CategoryService {
  private static baseUrl = "category";

  static getParent = (
    params?: ISearchCategory
  ): Promise<IPagedResponse<ICategoryItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/parent?${newParams}`,
      false
    );
  };
  static getChildren = (
    parentId: number
  ): Promise<ICommonResponse<ICategoryItem[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/child/${parentId}`, false);
  };

  static getAll = (): Promise<ICommonResponse<ICategoryItem[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}`, false);
  };

  static getbyId = (id: number): Promise<ICommonResponse<ICategory>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };
  static getBySlug = (slug: string): Promise<ICommonResponse<ICategory>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/slug/${slug}`, false);
  };
}

export default CategoryService;
