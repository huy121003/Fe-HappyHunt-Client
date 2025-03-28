import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import {
  ICountEvaluate,
  IEvaluateItem,
  IEvaluatePayload,
  ISearchEvaluate,
} from "../data/interface";

class EvaluateService {
  private static baseUrl = "/evaluate";
  static create = (data: IEvaluatePayload): Promise<ICommonResponse> => {
    return apiRequest(EMethod.POST, `${EvaluateService.baseUrl}`, true, data);
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
