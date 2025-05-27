import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";

import { IReportPayload } from "../data/interface";

const convertObjectToFormData = (data: IReportPayload) => {
  const formData = new FormData();
  formData.append("target", data.target.toString());
  formData.append("targetType", data.targetType);
  formData.append("title", data.title);
  formData.append("reason", data.reason);
  if (Array.isArray(data.images) && data.images.length > 0) {
    data.images.forEach((image) => {
      formData.append("images", image as Blob);
    });
  }

  return formData;
};
class ReportService {
  private static baseUrl = "/report";

  static create = (data: IReportPayload): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${ReportService.baseUrl}`,
      true,
      convertObjectToFormData(data)
    );
  };
}
export default ReportService;
