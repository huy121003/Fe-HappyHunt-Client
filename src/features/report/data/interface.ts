import { UploadFile } from "antd";
import { ETargetType } from "./constant";

export interface IReportPayload {
  target: number;
  targetType: ETargetType;
  title: string;
  reason: string;
  images: string[] | UploadFile[];
}
