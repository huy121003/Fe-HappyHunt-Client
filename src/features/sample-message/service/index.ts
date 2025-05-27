import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import {
  ISampleMessage,
  ISampleMessageDetail,
  ISampleMessagePayload,
} from "../data/interface";

class SampleMessageService {
  private static baseUrl = "sample-message";

  static getAll = (): Promise<ICommonResponse<ISampleMessage[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}`, false);
  };

  static getById = (
    id: number
  ): Promise<ICommonResponse<ISampleMessageDetail>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (
    data: ISampleMessagePayload
  ): Promise<ICommonResponse<ISampleMessage>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };
  static update = (
    id: number,
    data: ISampleMessagePayload
  ): Promise<ICommonResponse<ISampleMessage>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, false, data);
  };
  static delete = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}

export default SampleMessageService;
