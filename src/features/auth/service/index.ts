import apiRequest from "@/libs/axios";
import { EMethod } from "@/constants";
import { ICommonResponse } from "@/interfaces";
import {
  IForgotPasswordOtpRequest,
  IForgotPasswordRequest,
  IGetAccountInfoResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterOtpRequest,
  IRegisterRequest,
  IUpdateProfile,
} from "../data/interface";
const convertObjectToFormData = (data: IUpdateProfile) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  if (data.avatar) {
    formData.append("avatar", data.avatar as unknown as Blob);
  }
  formData.append("address", JSON.stringify(data.address));
  return formData;
};

class AuthService {
  private static baseUrl = "auth";

  static login = (
    data: ILoginRequest
  ): Promise<ICommonResponse<ILoginResponse>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}/login`, false, data);
  };

  static register = (data: IRegisterRequest): Promise<ICommonResponse> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}/register`, false, data);
  };

  static registerOtp = (
    data: IRegisterOtpRequest
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}/register-otp`,
      false,
      data
    );
  };

  static forgotpassword = (
    data: IForgotPasswordRequest
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}/forgot-password`,
      false,
      data
    );
  };

  static forgotpasswordOtp = (
    data: IForgotPasswordOtpRequest
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}/forgot-password-otp`,
      false,
      data
    );
  };

  static getAccountInfo = (): Promise<
    ICommonResponse<IGetAccountInfoResponse>
  > => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/get-account-info`, true);
  };

  static getNewAccessToken = (): Promise<
    ICommonResponse<IGetAccountInfoResponse>
  > => {
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/get-new-access-token`,
      true
    );
  };
  static logout = (): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}/logout`, false);
  };
  static changePassword = (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ICommonResponse<null>> => {
    return apiRequest(
      EMethod.PATCH,
      `${this.baseUrl}/change-password`,
      true,
      data
    );
  };
  static updateProfile = (
    data: IUpdateProfile
  ): Promise<ICommonResponse<IGetAccountInfoResponse>> => {
    return apiRequest(
      EMethod.PATCH,
      `${this.baseUrl}/update-profile`,
      true,
      convertObjectToFormData(data)
    );
  };
}
export default AuthService;
