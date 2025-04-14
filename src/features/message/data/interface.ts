import { ISearchParams } from "@/interfaces";
import { EStatusMessage } from "./constant";
import { UploadFile } from "antd";

export interface IMessage {
  message: string;
  image: string;
  timeSend: string;
  chat: number;
  sender: number;
  status: EStatusMessage;
}

export interface IMessageItem {
  _id: number;
  message: string;
  chat: number;
  image: string;
  timeSend: string;
  timeRead: string;
  sender: {
    _id: number;
    name: string;
    avatar: string;
  };
  status: EStatusMessage;
}

export interface ISearchMessage extends ISearchParams {}
export interface IMessagePayload {
  sender: number;
  image?: string | UploadFile;
  message?: string;

  chat: number;
}
