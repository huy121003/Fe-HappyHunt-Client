import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import { IProfile } from "../data/interface";

class ProfileService {
  private static baseUrl = "/user";

  static getById(id: number): Promise<ICommonResponse<IProfile>> {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  }
  static getBySlug(slug: string): Promise<ICommonResponse<IProfile>> {
    return apiRequest(EMethod.GET, `${this.baseUrl}/slug/${slug}`, false);
  }
}
export default ProfileService;
