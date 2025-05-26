import { EGender } from "@/features/profile/data/constant";
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
  email: string;
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
  gender: EGender;
  dateOfBirth: string;
}
export interface IRegisterRequest {
  email: string;
  username: string;
  password: string;
  otp: string;
}

export interface IRegisterOtpRequest {
  email: string;
  username: string;
}

export interface IForgotPasswordRequest {
  email: string;
  otp: string;
}

export interface IForgotPasswordOtpRequest {
  email: string;
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
  gender: EGender;
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

export interface IVipStatus {
  isVip: boolean;
  dateVipExpired: Date;
}
