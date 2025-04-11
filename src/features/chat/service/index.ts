import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import { IChat } from "../data/interface";

class ChatService {
  private static baseUrl = "/chat";

  static getBySlug = (slug: string): Promise<ICommonResponse<IChat>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${slug}`, false);
  };
}

export default ChatService;
