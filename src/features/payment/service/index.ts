import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse, IPagedResponse } from "@/interfaces";
import {
  IPayment,
  IPaymentItem,
  ISearchPayment,
} from "@/features/payment/data/interface";
import { EStatus } from "../data/constant";

class PaymentService {
  private static baseUrl = "payment";

  static getAllByUser = (
    params: ISearchPayment
  ): Promise<IPagedResponse<IPaymentItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/by-user?${newParams}`,
      false
    );
  };

  static getById = (id: number): Promise<ICommonResponse<IPayment>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };
  static checkStatus = (id: number): Promise<ICommonResponse<IPayment>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}/${id}/status`, false);
  };
  static updateStatus = (
    id: number,
    status: EStatus
  ): Promise<ICommonResponse<IPayment>> => {
    return apiRequest(
      EMethod.PATCH,
      `${this.baseUrl}/${id}/update-status`,
      false,
      {
        status,
      }
    );
  };
}
export default PaymentService;
