import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import apiRequest from "@/libs/axios";

class QAChatbotsService {
  private static baseUrl = "qa-chatbot";

  static async getAnswer(question: string): Promise<ICommonResponse<string>> {
    return apiRequest(EMethod.POST, `${this.baseUrl}/answer`, false, {
      question,
    });
  }
}

export default QAChatbotsService;
