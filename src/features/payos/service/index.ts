import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import { IPaymentLinkPayload } from "../data/interface";
import { IPaymentItem } from "@/features/payment/data/interface";

class PayOsService {
  private static baseUrl = "payos";

  static createPaymentLink = (
    data: IPaymentLinkPayload
  ): Promise<ICommonResponse<IPaymentItem>> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}/create-payment-link`,
      false,
      data
    );
  };
  static cancelPaymentLink = (id: string): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/cancel/${id}`);
  };
}

export default PayOsService;
