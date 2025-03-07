import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import { IBannerItem } from "../data/interface";

class BannerService {
  private static baseUrl = "banner";

  static getAll = (): Promise<ICommonResponse<IBannerItem[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}?isShow=true`, false);
  };
}
export default BannerService;
