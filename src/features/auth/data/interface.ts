import { ESex } from "@/features/profile/data/constant";
import { IType } from "./constant";
import { UploadFile } from "antd";

export interface ILoginRequest {
  phoneOrUsername: string;
  password: string;
  type: IType;
}

export interface ILoginResponse {
  access_token: string;
  _id: number;
  name: string;
  phoneNumber: string;
  description: string;
  username: string;
  isBanned: boolean;
  balance: number;
  avatar: string;
  isVip: boolean;
  address: {
    province: {
      _id: number;
      name: string;
    };
    district: {
      _id: number;
      name: string;
    };
    ward: {
      _id: number;
      name: string;
    };
    specificAddress: string;
  };
  slug: string;
  background: string;
  sex: ESex;
  dateOfBirth: string;
}
export interface IRegisterRequest {
  phoneNumber: string;
  username: string;
  password: string;
  otp: string;
}

export interface IRegisterOtpRequest {
  phoneNumber: string;
  username: string;
}

export interface IForgotPasswordRequest {
  phoneNumber: string;
  otp: string;
}

export interface IForgotPasswordOtpRequest {
  phoneNumber: string;
}
export interface IGetAccountInfoResponse extends ILoginResponse {}
export interface IRefreshTokenResponse {
  access_token: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
export interface IUpdateProfile {
  name: string;
  description: string;
  sex: ESex;
  dateOfBirth: string;
  address: {
    province: number;
    district: number;
    ward: number;
    specificAddress: string;
  };
  background: string | UploadFile;
  avatar: string | UploadFile;
}
