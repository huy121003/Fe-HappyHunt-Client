import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import { IHistoryClick, IHistoryClickCount } from "../data/interface";
class HistoryClickService {
  private static baseUrl = "/history-click";

  static getAllHistoryClick(
    postId: number
  ): Promise<ICommonResponse<IHistoryClick[]>> {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${postId}`, false);
  }
  static getHistoryClickCount(
    postId: number
  ): Promise<ICommonResponse<IHistoryClickCount[]>> {
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/${postId}/count-every-day`,
      false
    );
  }
}

export default HistoryClickService;
