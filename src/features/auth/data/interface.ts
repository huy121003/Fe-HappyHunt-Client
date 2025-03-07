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
  avatar: string;
  isVip: boolean;
  address: {
    provinceId: {
      _id: number;
      name: string;
    };
    districtId: {
      _id: number;
      name: string;
    };
    wardId: {
      _id: number;
      name: string;
    };
    specificAddress: string;
  };
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
  address: {
    provinceId: number;
    districtId: number;
    wardId: number;
    specificAddress: string;
  };
  avatar: string | UploadFile;
}
