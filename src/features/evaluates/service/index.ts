import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import {
  ICount,
  ICountEvaluate,
  IEvaluateItem,
  IEvaluatePayload,
  ISearchEvaluate,
} from "../data/interface";

class EvaluateService {
  private static baseUrl = "/evaluate";
  static create = (data: IEvaluatePayload): Promise<ICommonResponse> => {
    return apiRequest(EMethod.POST, `${EvaluateService.baseUrl}`, false, data);
  };
  static count = (id: number): Promise<ICommonResponse<ICount>> => {
    return apiRequest(
      EMethod.GET,
      `${EvaluateService.baseUrl}/countEvaluate/${id}`,
      false
    );
  };
  static getByUserId = (
    target: number,

    params: ISearchEvaluate
  ): Promise<IPagedResponse<IEvaluateItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${EvaluateService.baseUrl}/${target}?${newParams}`,
      false
    );
  };
  static getOne = (
    post: number,
    target: number
  ): Promise<ICommonResponse<IEvaluateItem>> => {
    return apiRequest(
      EMethod.GET,
      `${EvaluateService.baseUrl}/detail?post=${post}&target=${target}`,
      false
    );
  };

  static countEvaluate = (
    id: number
  ): Promise<ICommonResponse<ICountEvaluate>> => {
    return apiRequest(
      EMethod.GET,
      `${EvaluateService.baseUrl}/count/${id}`,
      false
    );
  };
}
export default EvaluateService;
