import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import apiRequest from "@/libs/axios";
import { IDescriptionPayload, IMessageChatbotPayload } from "../data/interface";

class QAChatbotsService {
  private static baseUrl = "qa-chatbot";

  static async getAnswer(
    data: IMessageChatbotPayload
  ): Promise<ICommonResponse<string>> {
    return apiRequest(EMethod.POST, `${this.baseUrl}/answer`, false, data);
  }
  static async getDescription(
    data: IDescriptionPayload
  ): Promise<ICommonResponse<string>> {
    return apiRequest(EMethod.POST, `${this.baseUrl}/description`, false, data);
  }
}

export default QAChatbotsService;
